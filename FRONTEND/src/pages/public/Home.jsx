import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Palette, 
  Sun, 
  Moon, 
  Compass, 
  TrendingUp, 
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-500 p-2.5 rounded-xl text-white shadow-md shadow-primary-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PlacementHub</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise AI Recruitment</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/40 text-primary-500 border border-primary-100 dark:border-primary-900/30">
          Professional Recruitment Platform
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary-500 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent leading-none">
          Simplifying Placements for Everyone.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          A secure, state-of-the-art recruitment portal built for academic institutes, modern recruiters, and job-seeking candidates. Choose a role dashboard to preview the themed environment.
        </p>
      </section>

      {/* Role Dashboards Selection Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center font-bold text-2xl mb-8 tracking-tight">Access Portals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Portal Card */}
          <div className="relative group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-800 dark:text-white mb-2 flex items-center">
                Student Portal
                <span className="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Explore tech jobs, prepare resumes, submit applications, and monitor hiring pipeline status in real-time.
              </p>
            </div>
            <button 
              onClick={() => navigate('/student')}
              className="mt-4 flex items-center justify-between w-full px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/10 group-hover:shadow-blue-500/20 transition-all duration-200"
            >
              Enter Dashboard
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Company Portal Card */}
          <div className="relative group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-800 dark:text-white mb-2 flex items-center">
                Recruiter Portal
                <span className="ml-2 w-2 h-2 rounded-full bg-indigo-500"></span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Publish openings, manage incoming applicants, shortlist talent, and coordinate selections.
              </p>
            </div>
            <button 
              onClick={() => navigate('/company')}
              className="mt-4 flex items-center justify-between w-full px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/10 group-hover:shadow-indigo-500/20 transition-all duration-200"
            >
              Enter Dashboard
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Admin Portal Card */}
          <div className="relative group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-slate-500/50 dark:hover:border-slate-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-800 dark:text-white mb-2 flex items-center">
                System Admin
                <span className="ml-2 w-2 h-2 rounded-full bg-slate-400"></span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Oversee entire placement stats, authorize companies, manage system configuration, and compile reports.
              </p>
            </div>
            <button 
              onClick={() => navigate('/admin')}
              className="mt-4 flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-950 text-white font-medium shadow-md shadow-slate-900/10 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200"
            >
              Enter Dashboard
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Palette and Design System Preview */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center space-x-3 mb-8 justify-center">
          <Palette className="h-6 w-6 text-primary-500" />
          <h2 className="font-heading font-bold text-2xl text-slate-800 dark:text-white">Corporate Theme Colors</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Primary Swatch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
            <div className="w-full h-12 rounded-lg bg-primary-500 mb-3 shadow-inner"></div>
            <span className="text-sm font-semibold block text-slate-800 dark:text-slate-200">Primary Colors</span>
            <span className="text-xs text-slate-500">Corporate & Trust</span>
          </div>

          {/* Success Swatch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
            <div className="w-full h-12 rounded-lg bg-success mb-3 flex items-center justify-center text-white font-semibold text-xs shadow-inner">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold block text-slate-800 dark:text-slate-200">Success state</span>
            <span className="text-xs text-slate-500">Hired / Approved</span>
          </div>

          {/* Warning Swatch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
            <div className="w-full h-12 rounded-lg bg-warning mb-3 flex items-center justify-center text-white font-semibold text-xs shadow-inner">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold block text-slate-800 dark:text-slate-200">Warning state</span>
            <span className="text-xs text-slate-500">Pending Actions</span>
          </div>

          {/* Danger Swatch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
            <div className="w-full h-12 rounded-lg bg-danger mb-3 flex items-center justify-center text-white font-semibold text-xs shadow-inner">
              <XCircle className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold block text-slate-800 dark:text-slate-200">Danger state</span>
            <span className="text-xs text-slate-500">Errors / Rejected</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
        <p>© 2026 PlacementHub recruitment systems. Built with Tailwind CSS v4.</p>
      </footer>
    </div>
  );
}
