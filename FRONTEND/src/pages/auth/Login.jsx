import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, Mail, Lock, AlertCircle, Sun, Moon, ArrowRight, KeyRound, RotateCw, CheckCircle2 } from 'lucide-react';
import { useLoginMutation, useVerifyEmailMutation, useResendVerificationMutation } from '../../store/api/auth.api';
import { setCredentials, selectIsAuthenticated, selectCurrentUser } from '../../store/slices/authSlice';
import { useTheme } from '../../context/ThemeContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Email verification screen states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();

  const [login, { isLoading }] = useLoginMutation();
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

    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: res.user }));
    } catch (err) {
      if (err.status === 403 && err.data?.needsVerification) {
        setShowVerification(true);
        setErrorMsg(err.data.message || 'Please verify your email address.');
      } else {
        setErrorMsg(err.data?.message || 'Login failed. Please verify credentials.');
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
      setErrorMsg(err.data?.message || 'Verification failed. Try again.');
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

  const handleQuickLogin = (mockEmail, mockPass) => {
    setEmail(mockEmail);
    setPassword(mockPass);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Brand panel on left (desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-700 to-indigo-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative circles */}
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
          <h2 className="text-4xl font-extrabold font-heading leading-tight">Connecting academic talent with global tech opportunities.</h2>
          <p className="text-indigo-100 font-sans text-sm leading-relaxed">
            Automated resume analysis, customized recruitment pipelines, and seamless socket notifications built directly for modern institutes.
          </p>
        </div>

        <div className="z-10 text-xs text-indigo-300">
          © 2026 PlacementHub Systems. All rights reserved.
        </div>
      </div>

      {/* Login panel on right */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-white dark:bg-slate-900">
        {/* Header toggle */}
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

        {/* Form Body */}
        <div className="max-w-md w-full mx-auto my-auto py-12 space-y-8">
          {!showVerification ? (
            <>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">Welcome back</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Please enter your details to sign in to your dashboard.</p>
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-danger text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
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

                <div className="space-y-2">
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
                  className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-semibold shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all text-sm flex items-center justify-center space-x-2"
                >
                  <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
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
                  Your account requires email verification. We sent a 6-digit OTP code to <span className="font-semibold text-slate-700 dark:text-slate-350">{email}</span>.
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
                    Go Back to Login
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Quick Mock Login Panel for easy developer testing */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Quick Login Preview</h3>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleQuickLogin('student@test.com', 'password123')}
                className="py-2 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/30 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/20 transition-colors"
              >
                Student
              </button>
              <button 
                onClick={() => handleQuickLogin('recruiter@test.com', 'password123')}
                className="py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/30 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/20 transition-colors"
              >
                Recruiter
              </button>
              <button 
                onClick={() => handleQuickLogin('admin@test.com', 'password123')}
                className="py-2 rounded-lg bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-primary-500 font-semibold hover:underline">
            Register portal
          </Link>
        </div>
      </div>
    </div>
  );
}
