import React from 'react';

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1">
      <div className="mb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
          Regulatory Protocol
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#737373] mt-1">Last revised: October 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#525252] leading-relaxed divide-y divide-[#E5E5E5]">
        <div className="space-y-2">
          <h2 className="font-mono text-sm font-bold uppercase text-[#0A0A0A]">
            01 / Local Storage Persistence
          </h2>
          <p>
            MONO™ operates as a client-side architecture demo. All cart sessions, wishlist selections, order histories, and newly added products or coupons reside locally within your browser's LocalStorage sandbox. No remote database stores or sells your personal credentials.
          </p>
        </div>

        <div className="pt-6 space-y-2">
          <h2 className="font-mono text-sm font-bold uppercase text-[#0A0A0A]">
            02 / Zero Third-Party Trackers
          </h2>
          <p>
            This website does not load behavioral advertising scripts, commercial tracking pixels, or cross-site profiling beacons. All interactions are contained within this frontend application.
          </p>
        </div>

        <div className="pt-6 space-y-2">
          <h2 className="font-mono text-sm font-bold uppercase text-[#0A0A0A]">
            03 / Data Reset Rights
          </h2>
          <p>
            You retain absolute sovereignty over your local demo data. Tapping "Reset Seed Data" in the top demo banner or inside the Admin Settings module completely wipes all locally modified states and restores default seed data.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1">
      <div className="mb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
          Statutory Terms
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-[#737373] mt-1">Last revised: October 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#525252] leading-relaxed divide-y divide-[#E5E5E5]">
        <div className="space-y-2">
          <h2 className="font-mono text-sm font-bold uppercase text-[#0A0A0A]">
            01 / Portfolio Demonstration Context
          </h2>
          <p>
            This platform is an architectural frontend demonstration showcasing modern React 18, Tailwind monochrome token design, and state management. Products displayed are curated inspirations; no actual physical shipments will be delivered.
          </p>
        </div>

        <div className="pt-6 space-y-2">
          <h2 className="font-mono text-sm font-bold uppercase text-[#0A0A0A]">
            02 / Simulated Transactions
          </h2>
          <p>
            Credit card numbers, bank wires, and mock credentials submitted through this site are processed purely in simulated local state. No real monetary transactions are charged.
          </p>
        </div>

        <div className="pt-6 space-y-2">
          <h2 className="font-mono text-sm font-bold uppercase text-[#0A0A0A]">
            03 / Intellectual Property
          </h2>
          <p>
            Design tokens, component hierarchies, and architectural patterns are released under open portfolio demonstration guidelines. Photography assets belong to their respective Unsplash contributors.
          </p>
        </div>
      </div>
    </div>
  );
}
