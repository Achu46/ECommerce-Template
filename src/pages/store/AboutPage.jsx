import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Award, Terminal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ProductImage } from '../../components/ui/ProductImage';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1">
      {/* Manifesto Header */}
      <div className="mb-12 sm:mb-16">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-2">
          Organizational Manifesto
        </span>
        <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#0A0A0A] leading-tight mb-6">
          THE MONOCHROME DOCTRINE.
        </h1>
        <p className="text-sm sm:text-base text-[#525252] leading-relaxed font-sans max-w-2xl">
          MONO™ exists to eliminate chromatic noise from daily artifacts. We believe functional objects should communicate through architectural silhouette, tactile texture, and enduring proportion rather than superficial trend pigments.
        </p>
      </div>

      {/* Editorial Image */}
      <div className="w-full aspect-[16/9] border border-[#E5E5E5] rounded-card overflow-hidden mb-12 bg-[#F5F5F5]">
        <ProductImage
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80"
          alt="MONO Architectural Studio"
          aspectRatio="aspect-[16/9]"
          className="grayscale"
        />
      </div>

      {/* Principles Section */}
      <div className="space-y-10 text-xs sm:text-sm text-[#525252] leading-relaxed divide-y divide-[#E5E5E5]">
        <div className="pt-8 first:pt-0">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 font-mono">
            01 / Grayscale Neutrality
          </h2>
          <p>
            By restricting our visual language strictly to white, black, and calibrated grayscale tones (#0A0A0A through #FFFFFF), our garments, audio gear, and timepieces integrate seamlessly into any urban or residential setting. Form is perceived in its purest geometric state.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 font-mono">
            02 / Architectural Fabrication
          </h2>
          <p>
            We curate exclusively from tier-one mills and precision CNC machining laboratories across Italy, Japan, and Germany. Materials are chosen for tensile resilience and natural aging patinas: extra-long staple combed organic cottons, ballistics nylon, and 316L stainless steel.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 font-mono">
            03 / Solitude Trial Guarantee
          </h2>
          <p>
            Every client is granted an unconditional 30-day trial period with each artifact. If the physical balance, acoustic curve, or structural drape fails to meet rigorous standards, returns are frictionless.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#E5E5E5] flex items-center justify-between">
        <Link to="/products">
          <Button variant="primary" size="md" icon={ArrowRight}>
            Explore the Collection
          </Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline" size="md">
            Contact Concierge
          </Button>
        </Link>
      </div>
    </div>
  );
}
