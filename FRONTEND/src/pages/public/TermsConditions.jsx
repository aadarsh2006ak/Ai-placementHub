import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

export default function TermsConditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-12 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back navigation */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">Terms & Conditions</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: August 2026</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-6 text-xs sm:text-sm font-sans text-slate-650 dark:text-slate-350 leading-relaxed">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center">
            <Scale className="mr-2 h-5 w-5 text-primary-500" />
            Terms of Use
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">1. Candidate Accuracy</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                Students must submit accurate academic history, CGPA metrics, and professional skills in their profiles. False credential representation is ground for immediate suspension of system access by system administrators.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">2. Recruiter Moderation</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                Recruiters must post verified active placement positions. Admins possess the authorization to remove any job post, invalidate company profiles, or block recruiters displaying suspicious behavior.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">3. AI System Scope</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                AI resume screening feedback, ATS scoring, and mock preparations are advisory recommendations. The platform does not guarantee hiring or automated selections.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">4. Platform Security</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-405">
                Attempting to bypass security limits, rate limit structures, or executing NoSQL operator injection payloads will result in immediate IP banning and legal coordination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
