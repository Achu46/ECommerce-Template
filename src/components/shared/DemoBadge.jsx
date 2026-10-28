import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ShieldAlert, ArrowRight, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function DemoBadge() {
  const { currentUser, isAdmin } = useAuth();
  const { resetDemoData } = useData();

  return (
    <aside
      aria-label="Demo environment notification"
      className="bg-black text-white text-[11px] font-mono tracking-wider px-3 sm:px-6 py-2 border-b border-[#333333] flex flex-wrap items-center justify-between gap-2 z-40 relative select-none"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white text-black font-bold text-[10px] rounded uppercase">
          <Terminal className="w-3 h-3" />
          DEMO ARCHITECTURE
        </span>
        <span className="hidden md:inline text-white/80">
          Simulated Payments · Mock Authentication · LocalStorage Persisted
        </span>
      </div>

      <div className="flex items-center gap-3">
        {isAdmin ? (
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 underline underline-offset-4 text-white hover:text-[#CCCCCC] transition-colors"
          >
            Admin Dashboard <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-1 underline underline-offset-4 text-white hover:text-[#CCCCCC] transition-colors"
          >
            Sign in as Admin <ArrowRight className="w-3 h-3" />
          </Link>
        )}

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all demo data back to initial seed values?')) {
              resetDemoData();
              window.location.reload();
            }
          }}
          className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-[#222222] text-white hover:bg-white hover:text-black rounded transition-colors text-[10px]"
          title="Restore factory demo data"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          Reset Seed Data
        </button>
      </div>
    </aside>
  );
}
