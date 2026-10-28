import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Info } from 'lucide-react';
import { useAuth, DEMO_ADMIN, DEMO_CUSTOMER } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isValidEmail } from '../../utils/validators';
import { AuthVisualLayout } from '../../components/store/AuthVisualLayout';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const prefillEmail = location.state?.email || 'admin@mono.com';

  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShake, setIsShake] = useState(false);

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isValidEmail(email)) errs.email = 'Please enter a valid email address';
    if (!password) errs.password = 'Password is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      triggerShake();
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);

      if (res.success) {
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from === '/login' ? '/account' : from);
        }
      } else {
        triggerShake();
        setErrors({ general: res.error || 'Invalid email or password. Please try again.' });
      }
    }, 450);
  };

  const handleQuickLoginAdmin = () => {
    setEmail(DEMO_ADMIN.email);
    setPassword('admin123');
    setErrors({});
  };

  const handleQuickLoginCustomer = () => {
    setEmail(DEMO_CUSTOMER.email);
    setPassword('customer123');
    setErrors({});
  };

  // Staggered entrance animation variants (Task 1: fade up 70ms apart)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <AuthVisualLayout
      title="Patron Sign In"
      subtitle="Access your curated order archives or store management terminal."
      isShake={isShake}
    >
      {/* Demo Credentials Box */}
      <div className="mb-5 p-3.5 bg-[#F5F5F5] dark:bg-[#111111] border-l-4 border-black dark:border-white rounded-lg text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#000000] dark:text-[#FFFFFF] mb-1">
          <Info className="w-4 h-4" />
          <span>PORTFOLIO DEMO ACCESS</span>
        </div>
        <p className="text-[#444444] dark:text-[#CCCCCC] text-[11px] leading-relaxed mb-2.5">
          Select a role below to automatically fill credentials and explore:
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleQuickLoginAdmin}
            className="flex-1 py-1 px-2 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] font-bold text-[10px] uppercase rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Admin (Curator)
          </button>
          <button
            type="button"
            onClick={handleQuickLoginCustomer}
            className="flex-1 py-1 px-2 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] font-bold text-[10px] uppercase rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Patron (Customer)
          </button>
        </div>
      </div>

      {/* General Error Banner */}
      {errors.general && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border-l-4 border-red-600 text-red-900 dark:text-red-200 text-xs font-medium rounded"
        >
          {errors.general}
        </motion.div>
      )}

      {/* Staggered Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Email Field with Leading Icon */}
        <motion.div variants={itemVariants}>
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
            }}
            error={errors.email}
            placeholder="patron@domain.com"
          />
        </motion.div>

        {/* Password Field with Leading Icon & Built-in Eye Toggle */}
        <motion.div variants={itemVariants} className="space-y-1.5">
          <Input
            label="Password"
            type="password"
            icon={Lock}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
            }}
            error={errors.password}
            placeholder="••••••••"
          />

          {/* Forgot Password Link - Right Aligned Under Password */}
          <div className="flex justify-end pt-0.5">
            <Link
              to="/forgot-password"
              className="text-xs text-[#000000] dark:text-[#FFFFFF] hover:underline font-medium transition-colors opacity-90 hover:opacity-100"
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>

        {/* Remember Me Checkbox */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded text-black dark:text-white border-[#DDDDDD] dark:border-[#333333] focus:ring-black dark:focus:ring-white accent-black dark:accent-white cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-xs text-[#000000] dark:text-[#FFFFFF] cursor-pointer select-none">
            Remember this session
          </label>
        </motion.div>

        {/* Primary Submit Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            icon={ArrowRight}
            className="mt-2 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow"
          >
            Authenticate Session
          </Button>
        </motion.div>

        {/* Footer Link to Register */}
        <motion.div variants={itemVariants} className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] text-center text-xs text-[#000000] dark:text-[#FFFFFF]">
          <span>Don't have an account? </span>
          <Link to="/register" className="font-bold underline hover:opacity-80 transition-opacity">
            Sign up
          </Link>
        </motion.div>
      </motion.form>
    </AuthVisualLayout>
  );
}
