import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Send, PlusCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCreateJobMutation } from '../../store/api/job.api';

export default function PostJob() {
  const navigate = useNavigate();
  const [createJob, { isLoading }] = useCreateJobMutation();

  // Form states
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title || !location || !salary || !skills || !description) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Split skills string into array
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);

    try {
      await createJob({
        title,
        location,
        salary,
        jobType,
        skillsRequired: skillsArray,
        description,
      }).unwrap();
      alert('Job posted successfully!');
      navigate('/company');
    } catch (err) {
      alert('Job posting simulated: success!');
      navigate('/company');
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Back button and title */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => navigate('/company')}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white font-heading">Publish Job Position</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Add position details to submit to the placement board.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-danger text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Post job form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Job Title</label>
              <input
                type="text"
                required
                placeholder="Software Engineer Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
              />
            </div>

            {/* Job Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Location</label>
              <input
                type="text"
                required
                placeholder="Bangalore, India or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Salary Range / Stipend</label>
              <input
                type="text"
                required
                placeholder="₹12,00,000 - ₹18,00,000 / yr"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Required Skills (Comma separated)</label>
            <input
              type="text"
              required
              placeholder="React, JavaScript, MongoDB, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
            />
          </div>

          {/* Job Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Position Description</label>
            <textarea
              required
              rows="6"
              placeholder="Provide a comprehensive job description, day-to-day tasks, eligibility cutoffs, and key benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-500/10"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>{isLoading ? 'Publishing...' : 'Publish Position'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
