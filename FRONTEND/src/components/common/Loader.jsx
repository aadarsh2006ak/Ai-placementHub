import React from 'react';
import PropTypes from 'prop-types';

/**
 * A professional, themed loading spinner.
 * @param {Object} props
 * @param {boolean} [props.fullScreen=false] - Whether the loader occupies the entire screen.
 * @param {string} [props.size='md'] - Size variant: 'sm', 'md', 'lg'.
 * @returns {React.JSX.Element}
 */
export default function Loader({ fullScreen = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm'
    : 'flex items-center justify-center p-6 w-full';

  return (
    <div className={containerClasses}>
      <div 
        className={`animate-spin rounded-full border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent ${sizeClasses[size] || sizeClasses.md}`}
        style={{ borderColor: 'var(--color-primary-500) transparent transparent transparent' }}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

Loader.propTypes = {
  fullScreen: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
