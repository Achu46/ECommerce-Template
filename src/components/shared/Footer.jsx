import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Instagram, Twitter, Github, Linkedin, Shield } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#E5E5E5] text-[#0A0A0A] mt-auto">
      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#E5E5E5]">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter select-none">
              <span className="w-8 h-8 rounded-btn bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-base font-black">
                M
              </span>
              <span>MONO<sup className="text-[10px] tracking-normal font-sans font-bold ml-0.5">™</sup></span>
            </Link>
            <p className="text-xs text-[#525252] max-w-sm leading-relaxed">
              An architectural discipline in strict monochrome design. Engineered without seasonal obsolescence using high-density organic textiles, surgical 316L steel, and acoustic planar magnetic drivers.
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-4">
              Shop Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#525252]">
              <li>
                <Link to="/products?category=Apparel" className="hover:text-[#0A0A0A] transition-colors">
                  Apparel & Tailoring
                </Link>
              </li>
              <li>
                <Link to="/products?category=Footwear" className="hover:text-[#0A0A0A] transition-colors">
                  Footwear & Boots
                </Link>
              </li>
              <li>
                <Link to="/products?category=Audio+%26+Tech" className="hover:text-[#0A0A0A] transition-colors">
                  Audio & Acoustics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Timepieces" className="hover:text-[#0A0A0A] transition-colors">
                  Horology & Straps
                </Link>
              </li>
              <li>
                <Link to="/products?category=Bags+%26+Luggage" className="hover:text-[#0A0A0A] transition-colors">
                  Bags & Luggage
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#0A0A0A] font-medium transition-colors">
                  Solstice Archive Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-4">
              Client Support
            </h5>
            <ul className="space-y-2.5 text-xs text-[#525252]">
              <li>
                <Link to="/order-tracking" className="hover:text-[#0A0A0A] transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#0A0A0A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0A0A0A] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#0A0A0A] transition-colors">
                  Patron Registry
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#0A0A0A] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-4">
              Organization
            </h5>
            <ul className="space-y-2.5 text-xs text-[#525252]">
              <li>
                <Link to="/about" className="hover:text-[#0A0A0A] transition-colors">
                  The Manifesto
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#0A0A0A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#0A0A0A] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#0A0A0A] font-mono font-bold transition-colors">
                  Admin Command →
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Icons & Back-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#737373] font-mono">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3] mr-1">
              Secured Settlements:
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[10px] font-bold text-[#0A0A0A]">
              UPI
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[10px] font-bold text-[#0A0A0A]">
              VISA
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[10px] font-bold text-[#0A0A0A]">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[10px] font-bold text-[#0A0A0A]">
              AMEX
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[10px] font-bold text-[#0A0A0A]">
              APPLE PAY
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[10px] font-bold text-[#0A0A0A]">
              NET BANKING
            </span>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F5F5] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border border-[#E5E5E5] rounded-btn transition-colors text-xs font-mono shrink-0"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 mt-6 border-t border-[#F5F5F5] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#A3A3A3]">
          <p>© {new Date().getFullYear()} MONO™ Design Atelier. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>STRICT MONOCHROME SPECIFICATION</span>
            <span>·</span>
            <span>PRICING IN INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
