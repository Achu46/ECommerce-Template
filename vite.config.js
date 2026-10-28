import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import crypto from 'node:crypto';

// In-memory token store for dev server: SHA-256 hash -> { email, expiresAt, used }
const tokenStore = new Map();
const rateLimitMap = new Map();

function authDevApiPlugin() {
  return {
    name: 'auth-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (req.method === 'POST' && url === '/auth/forgot-password') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { email } = JSON.parse(body || '{}');
              const cleanEmail = (email || '').trim().toLowerCase();

              // Rate limit: 5 requests per 15 minutes
              const clientIp = req.socket.remoteAddress || 'localhost';
              const now = Date.now();
              const history = (rateLimitMap.get(clientIp) || []).filter((t) => now - t < 15 * 60 * 1000);
              if (history.length >= 5) {
                res.statusCode = 429;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Too many requests. Please wait 15 minutes.' }));
                return;
              }
              history.push(now);
              rateLimitMap.set(clientIp, history);

              // Generate secure 32-byte token and store SHA-256 hash
              const rawToken = crypto.randomBytes(32).toString('hex');
              const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
              const expiresAt = now + 15 * 60 * 1000; // 15 mins

              tokenStore.set(hash, {
                email: cleanEmail,
                expiresAt,
                used: false
              });

              const resetLink = `http://${req.headers.host || 'localhost:5173'}/reset-password/${rawToken}`;

              console.log('\n======================================================');
              console.log(' [AUTH SERVICE] PASSWORD RESET DISPATCH');
              console.log(` Target Email : ${cleanEmail}`);
              console.log(` Token Hash   : ${hash.slice(0, 16)}...`);
              console.log(` Expiry       : 15 minutes`);
              console.log(` Reset URL    : ${resetLink}`);
              console.log('======================================================\n');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                message: 'If an account exists for this email, a reset link has been sent.',
                resetLink
              }));
            } catch (e) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
          return;
        }

        if (req.method === 'POST' && url === '/auth/verify-token') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { token } = JSON.parse(body || '{}');
              if (!token) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ valid: false, reason: 'Missing token' }));
                return;
              }

              const hash = crypto.createHash('sha256').update(token).digest('hex');
              const record = tokenStore.get(hash);

              if (!record || record.used || Date.now() > record.expiresAt) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  valid: false,
                  reason: record?.used ? 'Token already used' : 'Token expired or not found'
                }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ valid: true, email: record.email }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ valid: false }));
            }
          });
          return;
        }

        if (req.method === 'POST' && url === '/auth/reset-password') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { token, password } = JSON.parse(body || '{}');
              if (!token || !password) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing token or password' }));
                return;
              }

              const hash = crypto.createHash('sha256').update(token).digest('hex');
              const record = tokenStore.get(hash);

              if (!record || record.used || Date.now() > record.expiresAt) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Reset link has expired or has already been used.' }));
                return;
              }

              // Invalidate single-use token
              record.used = true;
              tokenStore.set(hash, record);

              console.log(`\n[AUTH SERVICE] Password successfully reset for account: ${record.email}\n`);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Password successfully updated.' }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Failed to process password reset' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), authDevApiPlugin()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});
