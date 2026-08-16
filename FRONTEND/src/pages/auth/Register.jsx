import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, Mail, Lock, User, Building, AlertCircle, Sun, Moon, ArrowRight, KeyRound, RotateCw, CheckCircle2 } from 'lucide-react';
import { useRegisterMutation, useVerifyEmailMutation, useResendVerificationMutation } from '../../store/api/auth.api';
import { setCredentials, selectIsAuthenticated, selectCurrentUser } from '../../store/slices/authSlice';
import { useTheme } from '../../context/ThemeContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'company'
  const [companyName, setCompanyName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Email verification screen states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'student') navigate('/student');
      else if (currentUser.role === 'company') navigate('/company');
      else if (currentUser.role === 'admin') navigate('/admin');
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setResendSuccess('');

    if (!name || !email || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (role === 'company' && !companyName) {
      setErrorMsg('Company Name is required for recruiter registrations.');
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        role,
        companyName: role === 'company' ? companyName : undefined,
      }).unwrap();
      setShowVerification(true);
    } catch (err) {
      if (err.data?.errors && err.data.errors.length > 0) {
        setErrorMsg(err.data.errors[0].message);
      } else {
        setErrorMsg(err.data?.message || 'Registration failed. Try again.');
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setResendSuccess('');

    if (!verificationCode) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }

    try {
      const res = await verifyEmail({ email, code: verificationCode }).unwrap();
      dispatch(setCredentials({ user: res.user }));
    } catch (err) {
      if (err.data?.errors && err.data.errors.length > 0) {
        setErrorMsg(err.data.errors[0].message);
      } else {
        setErrorMsg(err.data?.message || 'Verification failed. Try again.');
      }
    }
  };

  const handleResend = async () => {
    setErrorMsg('');
    setResendSuccess('');
    try {
      await resendVerification({ email }).unwrap();
      setResendSuccess('A new 6-digit verification code has been dispatched.');
    } catch (err) {
      setErrorMsg(err.data?.message || 'Resend code failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Brand panel (desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-700 to-primary-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="flex items-center space-x-3 z-10">
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-xl block">PlacementHub</span>
            <span className="text-xs text-indigo-200 block font-medium">Enterprise AI Recruitment</span>
          </div>
        </div>

        <div className="z-10 max-w-lg space-y-6">
          <h2 className="text-4xl font-extrabold font-heading leading-tight">Create your recruiter or candidate account.</h2>
          <p className="text-indigo-100 font-sans text-sm leading-relaxed">
            Register your profile to access custom job listings, configure verification details, and manage hiring workflows instantly.
          </p>
        </div>

        <div className="z-10 text-xs text-indigo-300">
          © 2026 PlacementHub Systems. All rights reserved.
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-center">
          <div className="md:hidden flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary-500" />
            <span className="font-heading font-bold text-slate-800 dark:text-white">PlacementHub</span>
          </div>
          <button 
            onClick={toggleTheme}
            className="ml-auto p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </button>
        </div>
        <div className="max-w-md w-full mx-auto my-auto py-8 space-y-6">
          {!showVerification ? (
            <>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">Register Account</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get started with PlacementHub recruitment pipeline.</p>
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-danger text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Switcher Tab */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Sign up as</label>
                  <div className="flex border border-slate-200 dark:border-slate-800 p-1 rounded-xl bg-slate-50 dark:bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                        role === 'student'
                          ? 'bg-primary-500 text-white shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Student / Candidate
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('company')}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                        role === 'company'
                          ? 'bg-primary-500 text-white shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Recruiter / Company
                    </button>
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Rahul Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all dark:text-white"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all dark:text-white"
                    />
                  </div>
                </div>

                {/* Conditional Recruiter Input */}
                {role === 'company' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Google India"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 mt-2 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-semibold shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all text-sm flex items-center justify-center space-x-2"
                >
                  <span>{isLoading ? 'Creating account...' : 'Register Account'}</span>
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading flex items-center">
                  <KeyRound className="mr-2.5 h-6 w-6 text-primary-500" />
                  Verify Email
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  We sent a 6-digit verification code to <span className="font-semibold text-slate-700 dark:text-slate-350">{email}</span>.
                </p>
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-danger text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {resendSuccess && (
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-success text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>{resendSuccess}</span>
                </div>
              )}

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">6-Digit Verification Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      maxLength="6"
                      required
                      placeholder="123456"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 tracking-[6px] text-center font-bold dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 mt-2 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-semibold shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all text-sm flex items-center justify-center space-x-2"
                >
                  <span>{isVerifying ? 'Verifying Code...' : 'Verify Email'}</span>
                  {!isVerifying && <ArrowRight className="h-4 w-4" />}
                </button>

                <div className="flex items-center justify-between text-xs pt-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-primary-500 font-semibold hover:underline flex items-center"
                  >
                    <RotateCw className={`h-3 w-3 mr-1 ${isResending ? 'animate-spin' : ''}`} />
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowVerification(false);
                      setErrorMsg('');
                      setResendSuccess('');
                    }}
                    className="text-slate-500 dark:text-slate-400 hover:underline"
                  >
                    Change Email
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary-500 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
