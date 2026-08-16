import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-lg text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 text-danger border border-red-200 dark:border-red-900/30">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white font-heading">Access Denied</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
            Your authenticated security role does not have authorization to view this panel. If you believe this is in error, contact the system administrator.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-950 text-white font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Portal Switcher
        </button>
      </div>
    </div>
  );
}
