import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Instagram, Twitter, Github, Linkedin, Shield } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#000000] border-t border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] mt-auto">
      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#DDDDDD] dark:border-[#333333]">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter select-none">
              <span className="w-8 h-8 rounded-btn bg-[#000000] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#000000] flex items-center justify-center font-mono text-base font-black">
                M
              </span>
              <span>MONO<sup className="text-[10px] tracking-normal font-sans font-bold ml-0.5">™</sup></span>
            </Link>
            <p className="text-xs text-[#444444] dark:text-[#CCCCCC] max-w-sm leading-relaxed">
              An architectural discipline in strict monochrome design. Engineered without seasonal obsolescence using high-density organic textiles, surgical 316L steel, and acoustic planar magnetic drivers.
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-4">
              Shop Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#444444] dark:text-[#CCCCCC]">
              <li>
                <Link to="/products?category=Apparel" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Apparel & Tailoring
                </Link>
              </li>
              <li>
                <Link to="/products?category=Footwear" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Footwear & Boots
                </Link>
              </li>
              <li>
                <Link to="/products?category=Audio+%26+Tech" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Audio & Acoustics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Timepieces" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Horology & Straps
                </Link>
              </li>
              <li>
                <Link to="/products?category=Bags+%26+Luggage" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Bags & Luggage
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] font-medium transition-colors">
                  Solstice Archive Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-4">
              Client Support
            </h5>
            <ul className="space-y-2.5 text-xs text-[#444444] dark:text-[#CCCCCC]">
              <li>
                <Link to="/order-tracking" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Patron Registry
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-4">
              Organization
            </h5>
            <ul className="space-y-2.5 text-xs text-[#444444] dark:text-[#CCCCCC]">
              <li>
                <Link to="/about" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  The Manifesto
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] font-mono font-bold transition-colors">
                  Admin Command →
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Icons & Back-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#444444] dark:text-[#CCCCCC] font-mono">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC] mr-1">
              Secured Settlements:
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded text-[10px] font-bold text-[#000000] dark:text-[#FFFFFF]">
              UPI
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded text-[10px] font-bold text-[#000000] dark:text-[#FFFFFF]">
              VISA
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded text-[10px] font-bold text-[#000000] dark:text-[#FFFFFF]">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded text-[10px] font-bold text-[#000000] dark:text-[#FFFFFF]">
              AMEX
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded text-[10px] font-bold text-[#000000] dark:text-[#FFFFFF]">
              APPLE PAY
            </span>
            <span className="px-2 py-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded text-[10px] font-bold text-[#000000] dark:text-[#FFFFFF]">
              NET BANKING
            </span>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F5F5] dark:bg-[#111111] hover:bg-[#000000] hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#000000] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333] rounded-btn transition-colors text-xs font-mono shrink-0"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 mt-6 border-t border-[#DDDDDD] dark:border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#444444] dark:text-[#CCCCCC]">
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
