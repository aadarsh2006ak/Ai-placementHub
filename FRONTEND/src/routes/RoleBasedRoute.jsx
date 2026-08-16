import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCurrentRole } from '../store/slices/authSlice';

/**
 * Route guard that restricts access based on authenticated user roles.
 * @param {Object} props
 * @param {string[]} props.allowedRoles
 * @param {React.ReactNode} [props.children]
 * @returns {React.JSX.Element}
 */
export default function RoleBasedRoute({ allowedRoles, children }) {
  const userRole = useSelector(selectCurrentRole);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
}

RoleBasedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};
