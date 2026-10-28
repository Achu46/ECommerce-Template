import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2, AlertTriangle, ArrowLeft, Check, X } from 'lucide-react';
import { AuthVisualLayout } from '../../components/store/AuthVisualLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { verifyResetToken, completePasswordReset, evaluatePasswordStrength } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { updateUserPassword } = useAuth();

  const [isValidating, setIsValidating] = useState(true);
  const [tokenStatus, setTokenStatus] = useState({ valid: false, reason: '', email: '' });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate token on component mount
  useEffect(() => {
    let isMounted = true;
    async function checkToken() {
      setIsValidating(true);
      const res = await verifyResetToken(token);
      if (isMounted) {
        setTokenStatus(res);
        setIsValidating(false);
      }
    }
    checkToken();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const strength = evaluatePasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!strength.isValid) {
      errs.password = 'Please ensure all password criteria are satisfied.';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await completePasswordReset(token, password);
      setIsLoading(false);

      if (res.success) {
        if (tokenStatus.email && updateUserPassword) {
          updateUserPassword(tokenStatus.email, password);
        }
        setIsSuccess(true);
        // Automatically redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login', { state: { resetSuccess: true, email: tokenStatus.email } });
        }, 2000);
      } else {
        setErrors({ general: res.error || 'Failed to update password.' });
      }
    } catch {
      setIsLoading(false);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    }
  };

  // State 1: Validating token on load
  if (isValidating) {
    return (
      <AuthVisualLayout title="Verifying Link" subtitle="Validating the security of your recovery token...">
        <div className="py-12 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#000000] dark:border-[#FFFFFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#444444] dark:text-[#CCCCCC] font-mono">Authenticating cryptographic hash...</p>
        </div>
      </AuthVisualLayout>
    );
  }

  // State 2: Invalid or expired token
  if (!tokenStatus.valid) {
    return (
      <AuthVisualLayout
        title="Link Expired or Invalid"
        subtitle="This password recovery dispatch is no longer active."
        showBackToLogin={true}
      >
        <div className="text-center py-4 space-y-5">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <p className="text-xs text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
            {tokenStatus.reason || 'This password reset link is invalid or has exceeded its 15-minute window.'}
          </p>

          <div className="pt-2">
            <Link to="/forgot-password">
              <Button variant="primary" fullWidth size="lg">
                Request a New Link
              </Button>
            </Link>
          </div>
        </div>
      </AuthVisualLayout>
    );
  }

  // State 3: Success state with 2-second auto-redirect
  if (isSuccess) {
    return (
      <AuthVisualLayout title="Password Reset" subtitle="Your security credentials have been updated.">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-6 space-y-4"
        >
          <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8 text-white dark:text-black" />
          </div>

          <h3 className="text-base font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF]">
            Password Updated
          </h3>

          <p className="text-xs text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
            Your new credentials have been committed. Redirecting to authentication session in 2 seconds...
          </p>

          <div className="pt-2">
            <Link to="/login">
              <Button variant="outline" size="sm" fullWidth>
                Continue to Login Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </AuthVisualLayout>
    );
  }

  // State 4: Active Reset Form with strength meter & rules checklist
  return (
    <AuthVisualLayout
      title="Create New Password"
      subtitle={`Choose a secure password for account ${tokenStatus.email || ''}.`}
      showBackToLogin={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 border-l-4 border-red-600 text-red-900 text-xs font-medium rounded">
            {errors.general}
          </div>
        )}

        {/* New Password */}
        <div>
          <Input
            label="New Password"
            type="password"
            icon={Lock}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            placeholder="••••••••••••"
          />

          {/* Live Password-Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2.5 p-3 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-lg space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-[#000000] dark:text-[#FFFFFF] uppercase opacity-75">Strength:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${strength.color}`}>
                  {strength.label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#DDDDDD] dark:bg-[#222222] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.barColor}`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>

              {/* Rules Checklist */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <div className={`flex items-center gap-1.5 ${strength.rules.minLength ? 'text-[#000000] dark:text-[#FFFFFF] font-bold' : 'text-[#000000] dark:text-[#FFFFFF] opacity-50'}`}>
                  {strength.rules.minLength ? <Check className="w-3.5 h-3.5 text-black dark:text-white" /> : <X className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />}
                  <span>Min 8 characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${strength.rules.hasUpper ? 'text-[#000000] dark:text-[#FFFFFF] font-bold' : 'text-[#000000] dark:text-[#FFFFFF] opacity-50'}`}>
                  {strength.rules.hasUpper ? <Check className="w-3.5 h-3.5 text-black dark:text-white" /> : <X className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />}
                  <span>1 Uppercase letter</span>
                </div>
                <div className={`flex items-center gap-1.5 ${strength.rules.hasLower ? 'text-[#000000] dark:text-[#FFFFFF] font-bold' : 'text-[#000000] dark:text-[#FFFFFF] opacity-50'}`}>
                  {strength.rules.hasLower ? <Check className="w-3.5 h-3.5 text-black dark:text-white" /> : <X className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />}
                  <span>1 Lowercase letter</span>
                </div>
                <div className={`flex items-center gap-1.5 ${strength.rules.hasNumber ? 'text-[#000000] dark:text-[#FFFFFF] font-bold' : 'text-[#000000] dark:text-[#FFFFFF] opacity-50'}`}>
                  {strength.rules.hasNumber ? <Check className="w-3.5 h-3.5 text-black dark:text-white" /> : <X className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />}
                  <span>1 Number</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm New Password"
          type="password"
          icon={Lock}
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          error={errors.confirmPassword}
          placeholder="••••••••••••"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={!strength.isValid || password !== confirmPassword}
          icon={ArrowRight}
          className="mt-2"
        >
          Confirm & Update Password
        </Button>
      </form>
    </AuthVisualLayout>
  );
}
