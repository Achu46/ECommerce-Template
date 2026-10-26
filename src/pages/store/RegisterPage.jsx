import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isValidEmail } from '../../utils/validators';

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
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 w-full flex-1 flex flex-col justify-center">
      <div className="bg-white border border-[#E5E5E5] rounded-card p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A0A0A]">
            Create Patron Profile
          </h1>
          <p className="text-xs text-[#525252] mt-1 font-mono">
            Register to track orders, curate wishlists, and receive dispatches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="e.g. Maya Lin"
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="patron@domain.com"
          />

          <Input
            label="Create Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            placeholder="••••••••"
          />

          <Input
            label="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            placeholder="••••••••"
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
            Create Account
          </Button>
        </form>

        <div className="pt-4 border-t border-[#E5E5E5] text-center text-xs font-mono text-[#525252]">
          <span>Already registered? </span>
          <Link to="/login" className="font-bold text-[#0A0A0A] underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
