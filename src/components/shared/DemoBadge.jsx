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
      className="bg-[#0A0A0A] text-white text-[11px] font-mono tracking-wider px-3 sm:px-6 py-2 border-b border-[#262626] flex flex-wrap items-center justify-between gap-2 z-40 relative select-none"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white text-[#0A0A0A] font-bold text-[10px] rounded uppercase">
          <Terminal className="w-3 h-3" />
          DEMO ARCHITECTURE
        </span>
        <span className="hidden md:inline text-[#D4D4D4]">
          Simulated Payments · Mock Authentication · LocalStorage Persisted
        </span>
      </div>

      <div className="flex items-center gap-3">
        {isAdmin ? (
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-[#D4D4D4] transition-colors"
          >
            Admin Dashboard <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-[#D4D4D4] transition-colors"
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
          className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-[#262626] text-[#FAFAFA] hover:bg-white hover:text-[#0A0A0A] rounded transition-colors text-[10px]"
          title="Restore factory demo data"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          Reset Seed Data
        </button>
      </div>
    </aside>
  );
}
