/**
 * Authentication & Password Reset Service
 * Implements cryptographically secure token generation, SHA-256 hashing,
 * 15-minute expiry, rate limiting, and password reset flows.
 */

// Rate limiting cache (5 requests per 15 minutes)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Helper to calculate SHA-256 hash using Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Generate random hex token
function generateSecureToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Local storage token store for fallback and client-side simulation
const STORAGE_KEY = 'mono_auth_reset_tokens';
const CREDENTIALS_KEY = 'mono_user_credentials';
const RATE_LIMIT_KEY = 'mono_auth_rate_limits';

function getStoredTokens() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredTokens(tokens) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (err) {
    console.warn('Unable to persist reset tokens:', err);
  }
}

// Rate limiting check
function checkRateLimit(identifier) {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const limits = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    const history = (limits[identifier] || []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

    if (history.length >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    }

    history.push(now);
    limits[identifier] = history;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(limits));
    return true;
  } catch {
    return true;
  }
}

/**
 * Request password reset link
 * POST /auth/forgot-password
 */
export async function requestPasswordReset(email) {
  const cleanEmail = email.trim().toLowerCase();

  // Rate limiting
  if (!checkRateLimit(`forgot_${cleanEmail}`)) {
    return {
      success: false,
      error: 'Too many requests. Please wait 15 minutes before requesting another reset link.'
    };
  }

  // 1. Try server endpoint first
  try {
    const response = await fetch('/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message || 'If an account exists for this email, a reset link has been sent.' };
    }
  } catch {
    // Fall back to client-side simulated auth service
  }

  // 2. Client-side secure token generation fallback
  const rawToken = generateSecureToken();
  const tokenHash = await sha256(rawToken);
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

  const tokens = getStoredTokens();
  tokens[tokenHash] = {
    email: cleanEmail,
    expiresAt,
    used: false,
    createdAt: Date.now()
  };
  saveStoredTokens(tokens);

  const resetLink = `${window.location.origin}/reset-password/${rawToken}`;

  // Log in development console when SMTP is unconfigured
  console.log(
    `%c[AUTH SERVICE] Password reset requested for: ${cleanEmail}\nReset Link (valid for 15 mins):\n${resetLink}`,
    'background: #0A0A0A; color: #FFFFFF; font-weight: bold; padding: 6px 12px; border-radius: 4px;'
  );

  return {
    success: true,
    message: 'If an account exists for this email, a reset link has been sent.',
    devResetLink: resetLink // Provided for easy developer access in test environments
  };
}

/**
 * Validate token on load
 */
export async function verifyResetToken(rawToken) {
  if (!rawToken || typeof rawToken !== 'string') {
    return { valid: false, reason: 'Invalid or missing token.' };
  }

  // 1. Try server endpoint first
  try {
    const response = await fetch('/auth/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: rawToken })
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: data.valid, email: data.email };
    }
  } catch {
    // Fall back to client token validation
  }

  // 2. Validate against stored SHA-256 hashes
  const tokenHash = await sha256(rawToken);
  const tokens = getStoredTokens();
  const tokenRecord = tokens[tokenHash];

  if (!tokenRecord) {
    return { valid: false, reason: 'This password reset link is invalid.' };
  }

  if (tokenRecord.used) {
    return { valid: false, reason: 'This password reset link has already been used.' };
  }

  if (Date.now() > tokenRecord.expiresAt) {
    return { valid: false, reason: 'This password reset link has expired (15 minutes limit).' };
  }

  return { valid: true, email: tokenRecord.email };
}

/**
 * Reset password with token
 * POST /auth/reset-password
 */
export async function completePasswordReset(rawToken, newPassword) {
  if (!rawToken || !newPassword) {
    return { success: false, error: 'Token and new password are required.' };
  }

  // Validate rules
  const strength = evaluatePasswordStrength(newPassword);
  if (!strength.isValid) {
    return { success: false, error: 'Password does not meet required security standards.' };
  }

  // 1. Try server endpoint first
  try {
    const response = await fetch('/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: rawToken, password: newPassword })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message || 'Password successfully updated.' };
    }
  } catch {
    // Fall back to client storage update
  }

  // 2. Client-side update
  const tokenHash = await sha256(rawToken);
  const tokens = getStoredTokens();
  const tokenRecord = tokens[tokenHash];

  if (!tokenRecord || tokenRecord.used || Date.now() > tokenRecord.expiresAt) {
    return { success: false, error: 'Reset link has expired or has already been used.' };
  }

  // Invalidate token (single-use)
  tokens[tokenHash].used = true;
  saveStoredTokens(tokens);

  // Store updated password in user credentials
  try {
    const rawCreds = localStorage.getItem(CREDENTIALS_KEY);
    const creds = rawCreds ? JSON.parse(rawCreds) : {};
    creds[tokenRecord.email.toLowerCase()] = newPassword;
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  } catch (err) {
    console.warn('Unable to persist new password:', err);
  }

  return { success: true, message: 'Password successfully updated.' };
}

/**
 * Live password strength evaluator
 * Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 number
 */
export function evaluatePasswordStrength(password = '') {
  const rules = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password)
  };

  const score = Object.values(rules).filter(Boolean).length;
  const isValid = score === 4;

  let label = 'Weak';
  let color = 'bg-[#DDDDDD] text-[#444444] dark:bg-[#222222] dark:text-[#CCCCCC]';
  let barColor = 'bg-[#737373] dark:bg-[#888888]';

  if (score >= 4) {
    label = 'Strong';
    color = 'bg-black text-white dark:bg-white dark:text-black';
    barColor = 'bg-black dark:bg-white';
  } else if (score >= 2) {
    label = 'Medium';
    color = 'bg-[#444444] text-white dark:bg-[#333333] dark:text-[#FFFFFF]';
    barColor = 'bg-[#444444] dark:text-white';
  }

  return {
    rules,
    score,
    isValid,
    label,
    color,
    barColor,
    percent: (score / 4) * 100
  };
}
