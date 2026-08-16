import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import TermsConditions from '../pages/public/TermsConditions';
import Unauthorized from '../pages/Unauthorized';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Layouts
import StudentLayout from '../layouts/StudentLayout';
import CompanyLayout from '../layouts/CompanyLayout';
import AdminLayout from '../layouts/AdminLayout';

// Dashboards & Panels
import StudentDashboard from '../pages/student/StudentDashboard';
import ResumeBuilder from '../pages/student/ResumeBuilder';
import CompanyDashboard from '../pages/company/CompanyDashboard';
import PostJob from '../pages/company/PostJob';
import AdminDashboard from '../pages/admin/AdminDashboard';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />

      {/* Student Portal Sub-Routes (Protected & Role-restricted) */}
      <Route 
        path="/student" 
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['student']} />
          </ProtectedRoute>
        }
      >
        <Route element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="jobs" element={<StudentDashboard />} />
          <Route path="applications" element={<StudentDashboard />} />
          <Route path="profile" element={<ResumeBuilder />} />
        </Route>
      </Route>

      {/* Recruiter Portal Sub-Routes (Protected & Role-restricted) */}
      <Route 
        path="/company" 
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['company']} />
          </ProtectedRoute>
        }
      >
        <Route element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="applicants" element={<CompanyDashboard />} />
          <Route path="jobs" element={<CompanyDashboard />} />
          <Route path="post-job" element={<PostJob />} />
        </Route>
      </Route>

      {/* System Admin Portal Sub-Routes (Protected & Role-restricted) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['admin']} />
          </ProtectedRoute>
        }
      >
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="approvals" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
