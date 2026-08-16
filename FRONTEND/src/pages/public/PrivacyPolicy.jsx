import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: August 2026</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm space-y-6 text-xs sm:text-sm font-sans text-slate-650 dark:text-slate-350 leading-relaxed">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary-500" />
            Information Collection and Storage
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">1. Profile Setup Data</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                We store register details including user names, email addresses, salt-hashed passwords, and academic credentials. Students upload portfolio links and resumes, which are saved in secure environments (such as Cloudinary CDN storage).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">2. AI Resume Indexing</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                To run ATS scoring, skill-gap analysis, and mock interviews, our backend processes details extracted from student resumes. We do not sell candidate resume data.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">3. Data Deletion Right</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                Under data governance rules, users possess the right to revoke access or delete their profiles. Deleting your profile automatically removes all corresponding job listings, portfolios, applications, and saved scores from our databases.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">4. Third-Party CDN Hooks</h3>
              <p className="mt-1.5 text-slate-550 dark:text-slate-400">
                Portfolios, student resumes, and company logos are hosted securely via Cloudinary, complying with CDN secure-socket transport standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
