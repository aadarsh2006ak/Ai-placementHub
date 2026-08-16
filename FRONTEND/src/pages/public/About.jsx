import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, Cpu, BellRing } from 'lucide-react';

export default function About() {
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">About PlacementHub</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Our mission, tech-stack, and automated placement values.</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary-500" />
            AI-Driven Recruitment Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            PlacementHub is an enterprise-grade academic placement intelligence platform designed to bridge the gap between talented student candidates and modern corporate recruiters. Our system automates application pipelines, screens resumes using AI intelligence, and coordinates instant socket messaging.
          </p>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Pillars of Trust */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-white">AI ATS Screening</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Evaluates resumes, extracts skill gap analyses, and builds mock interview preparation structures customized per position.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <BellRing className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-white">Real-Time Sockets</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Socket.io broadcasts job status changes, recruiter shortlists, and placement schedules to candidates instantly.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-success flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-white">Authorized Portals</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Role-Based Access Control (RBAC) blocks unauthorized cross-role requests, validating students, recruiters, and admins.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 font-semibold">
          PlacementHub Academic Edition v1.0.0
        </div>
      </div>
    </div>
  );
}
