import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">Support & Contact</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Reach out to our placement coordinators or report support queries.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Office coordinates */}
          <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6 self-start">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Office Coordinates</h2>
            
            <div className="space-y-4 text-xs font-sans text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <span>support@placementhub.edu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span>+91 80 4910 2000</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                <span>T-Block Placement Cells, University Campus, Bangalore, KA, India</span>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">Email Query Form</h2>

            {status === 'success' && (
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-success text-xs font-semibold">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>Your query has been dispatched successfully. We will reply within 24 hours.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-danger text-xs font-semibold">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>Please complete all fields.</span>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Recruiter profile verification request"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Detailed Query Description</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Detail the issue or help request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-primary-500/10"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Query</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
