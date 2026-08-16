import React from 'react';
import PropTypes from 'prop-types';
import { AlertOctagon, RotateCw } from 'lucide-react';

/**
 * Global ErrorBoundary class to intercept React rendering errors.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary intercepted rendering error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-lg text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 text-danger border border-red-200 dark:border-red-900/30 animate-bounce">
              <AlertOctagon className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white font-heading">Application Error</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                An unexpected rendering issue has occurred. The dashboard could not load. Try reloading the application.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="flex items-center justify-center w-full py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs shadow-md shadow-primary-500/10 transition-colors"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
