import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';
import { AuthVisualLayout } from '../../components/store/AuthVisualLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isValidEmail } from '../../utils/validators';
import { requestPasswordReset } from '../../services/authService';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !isValidEmail(email)) {
      setError('Please provide a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await requestPasswordReset(email);
      setIsLoading(false);
      setIsSubmitted(true);
      if (res.devResetLink) {
        setDevResetUrl(res.devResetLink);
      }
    } catch {
      setIsLoading(false);
      // Always show generic message to avoid enumeration
      setIsSubmitted(true);
    }
  };

  return (
    <AuthVisualLayout
      title="Reset Password"
      subtitle="Enter the email associated with your account to receive a secure recovery dispatch."
      showBackToLogin={!isSubmitted}
    >
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-4 space-y-4"
        >
          <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-6 h-6 text-white dark:text-black" />
          </div>

          <h3 className="text-base font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF]">
            Recovery Link Dispatched
          </h3>

          <p className="text-xs text-[#000000] dark:text-[#FFFFFF] leading-relaxed opacity-85">
            If an account exists for <strong className="text-[#000000] dark:text-[#FFFFFF]">{email}</strong>, a reset link with 15-minute validity has been generated and dispatched.
          </p>

          {/* Development Quick-Access Box (visible in local testing) */}
          {devResetUrl && (
            <div className="mt-4 p-3.5 bg-[#F5F5F5] dark:bg-[#111111] border-l-4 border-black dark:border-white rounded-lg text-left text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#000000] dark:text-[#FFFFFF]">
                <KeyRound className="w-4 h-4" />
                <span>DEV ENVIRONMENT RESET LINK</span>
              </div>
              <p className="text-[11px] text-[#444444] dark:text-[#CCCCCC] leading-normal">
                Because SMTP is unconfigured in development, your single-use reset link was generated locally and logged to the server terminal:
              </p>
              <a
                href={devResetUrl}
                className="inline-block py-1.5 px-3 bg-black dark:bg-white text-white dark:text-black font-bold text-[11px] rounded hover:opacity-85 transition-opacity"
              >
                Proceed to Reset Password →
              </a>
            </div>
          )}

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
                setDevResetUrl('');
              }}
            >
              Try Another Email
            </Button>

            <Link to="/login" className="block text-center pt-2">
              <span className="text-xs font-bold text-[#000000] dark:text-[#FFFFFF] underline hover:opacity-80 transition-opacity">
                Return to Login
              </span>
            </Link>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            error={error}
            placeholder="patron@domain.com"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            icon={ArrowRight}
            className="mt-2"
          >
            Send Recovery Link
          </Button>
        </form>
      )}
    </AuthVisualLayout>
  );
}
