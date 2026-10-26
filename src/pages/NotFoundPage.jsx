import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 rounded-full border-2 border-[#0A0A0A] bg-[#F5F5F5] flex items-center justify-center mb-6">
        <Compass className="w-8 h-8 text-[#0A0A0A]" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-[#737373] mb-2">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">
        Coordinate Not Found
      </h1>
      <p className="text-xs sm:text-sm text-[#525252] max-w-md mb-8 leading-relaxed">
        The requested address does not correspond to any catalog item or management module in this architecture.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" icon={ArrowLeft}>
          Return to Storefront
        </Button>
      </Link>
    </div>
  );
}
