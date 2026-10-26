import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Shield, User, ArrowRight, Info, Check } from 'lucide-react';
import { useAuth, DEMO_ADMIN, DEMO_CUSTOMER } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isValidEmail } from '../../utils/validators';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('admin@mono.com');
  const [password, setPassword] = useState('admin123');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isValidEmail(email)) errs.email = 'Please enter a valid email address';
    if (!password || password.length < 4) errs.password = 'Password must be at least 4 characters';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from === '/login' ? '/account' : from);
        }
      }
    }, 400);
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

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 w-full flex-1 flex flex-col justify-center">
      <div className="bg-white border border-[#E5E5E5] rounded-card p-6 sm:p-8 shadow-subtle space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 bg-[#0A0A0A] text-white rounded-btn mx-auto mb-3 flex items-center justify-center font-mono font-black text-lg">
            M
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A0A0A]">
            Patron Authentication
          </h1>
          <p className="text-xs text-[#525252] mt-1 font-mono">
            Access your order history or manage store administration.
          </p>
        </div>

        {/* Demo-Only Notice Box */}
        <div className="p-3.5 bg-[#F5F5F5] border-l-4 border-[#0A0A0A] rounded-btn text-xs font-mono">
          <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A] mb-1">
            <Info className="w-4 h-4 text-[#0A0A0A]" />
            <span>PORTFOLIO DEMO CREDENTIALS</span>
          </div>
          <p className="text-[#525252] text-[11px] leading-relaxed mb-3">
            Authentication is simulated in LocalStorage. Use the pre-configured profiles below for instantaneous access:
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleQuickLoginAdmin}
              className="flex-1 py-1.5 px-2 bg-white border border-[#0A0A0A] text-[#0A0A0A] font-bold text-[10px] uppercase rounded hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              Fill Admin (Curator)
            </button>
            <button
              type="button"
              onClick={handleQuickLoginCustomer}
              className="flex-1 py-1.5 px-2 bg-white border border-[#0A0A0A] text-[#0A0A0A] font-bold text-[10px] uppercase rounded hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              Fill Patron (Alexander)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            placeholder="patron@mono-atelier.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
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
            Authenticate Session
          </Button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E5E5E5] text-center text-xs font-mono text-[#525252]">
          <span>Don't have an active registration? </span>
          <Link to="/register" className="font-bold text-[#0A0A0A] underline">
            Register Patron Account
          </Link>
        </div>
      </div>
    </div>
  );
}
