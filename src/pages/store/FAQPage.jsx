import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Why are all items presented strictly in monochrome tones?',
      a: 'Chromatic trends date rapidly. By adhering to a rigorous black, white, and calibrated grayscale palette, each artifact communicates purely through geometry, shadow, tactile texture, and enduring structural proportion.'
    },
    {
      q: 'How does the 30-Day Solitude Guarantee function?',
      a: 'We offer an unconditional 30-day evaluation period for every product in its pristine condition with tags attached. If you decide the fit, acoustic response, or material density does not align with your daily rituals, you may generate a return label at no cost.'
    },
    {
      q: 'What are your delivery standards and timelines?',
      a: 'All consignments are packed with recyclable corrugated protective inserts and shipped via carbon-neutral expedited courier. Typical domestic delivery requires 2 to 4 business days. Orders over $150 receive complimentary expedited transit.'
    },
    {
      q: 'Are the products covered by warranty?',
      a: 'Yes. Our horological instruments and audio gear carry a 2-year manufacturer warranty covering internal mechanical and electronic components. Our apparel and luggage carry a lifetime guarantee against manufacturing defects.'
    },
    {
      q: 'How do I care for heavy 320 GSM organic cotton garments?',
      a: 'Machine wash cold inside out with mild neutral detergent. Line dry in shaded ambient air to preserve the structured boxy geometry and avoid unnecessary heat stress on natural cotton fibers.'
    },
    {
      q: 'Is this website an active commercial storefront or a demonstration?',
      a: 'This website is a client-ready front-end portfolio demonstration designed by an architect and React developer. All payments are simulated, authentication is mocked in LocalStorage, and no financial charges are executed.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1 text-[#000000] dark:text-[#FFFFFF]">
      <div className="mb-10 sm:mb-14 text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-2">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] mt-2 max-w-md mx-auto">
          Essential clarifications regarding materials, fulfillment protocols, and portfolio demo operations.
        </p>
      </div>

      <div className="space-y-3 divide-y divide-[#DDDDDD] dark:divide-[#333333] border-y border-[#DDDDDD] dark:border-[#333333]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="pt-4 first:pt-0 pb-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full text-left py-2 flex items-center justify-between gap-4 group"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-[#000000] dark:text-[#FFFFFF] group-hover:underline">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#444444] dark:text-[#CCCCCC] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#000000] dark:text-[#FFFFFF]' : ''
                    }`}
                />
              </button>

              {isOpen && (
                <div className="pt-2 text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] leading-relaxed font-sans animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
