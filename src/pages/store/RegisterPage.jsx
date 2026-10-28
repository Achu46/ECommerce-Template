import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isValidEmail } from '../../utils/validators';
import { AuthVisualLayout } from '../../components/store/AuthVisualLayout';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!isValidEmail(formData.email)) errs.email = 'Please provide a valid email';
    if (!formData.password || formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      register({
        name: formData.name,
        email: formData.email
      });
      setIsLoading(false);
      navigate('/account');
    }, 450);
  };

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
      title="Create Account"
      subtitle="Join the MONO™ patronage network to track consignments and curate private wishlists."
    >
      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <Input
            label="Full Name"
            icon={User}
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
            placeholder="e.g. Maya Lin"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            placeholder="patron@domain.com"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Create Password"
            type="password"
            icon={Lock}
            required
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            placeholder="••••••••"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            required
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            icon={ArrowRight}
            className="mt-2 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Account
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] text-center text-xs text-[#000000] dark:text-[#FFFFFF]">
          <span>Already registered? </span>
          <Link to="/login" className="font-bold underline hover:opacity-80 transition-opacity">
            Sign In Here
          </Link>
        </motion.div>
      </motion.form>
    </AuthVisualLayout>
  );
}
