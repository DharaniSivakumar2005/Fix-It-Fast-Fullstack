import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await adminLogin({
        email: email.trim().toLowerCase(),
        password,
        secretKey: secretKey.trim() || undefined,
      });

      if (result.success) {
        if (result.requirePasswordChange) {
          navigate('/admin/change-password', { replace: true });
        } else {
          const dashboardPath =
            result.user.role === 'superadmin' ? '/admin/super-dashboard' : '/admin/dashboard';
          navigate(dashboardPath, { replace: true });
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Abstract Background Pattern */}
      <div className="admin-login-bg-blur">
        <div className="admin-login-bg-blur-circle admin-login-bg-blur-circle-1"></div>
        <div className="admin-login-bg-blur-circle admin-login-bg-blur-circle-2"></div>
        <div className="admin-login-bg-blur-circle admin-login-bg-blur-circle-3"></div>
      </div>

      {/* Back to Home Link */}
      <button onClick={() => navigate('/')} className="admin-login-back-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="admin-login-card-wrapper">
        <div className="admin-login-card">
          {/* Logo/Icon */}
          <div className="admin-login-logo">
            <div className="admin-login-logo-bg">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="admin-login-title">
            <h1>Admin Login</h1>
            <p>Access the FixItFast Admin Panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-login-error">
              <div className="admin-login-error-content">
                <span className="admin-login-error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="admin-login-form">
            {/* Email Input */}
            <div className="admin-login-input-group">
              <label htmlFor="email" className="admin-login-label">
                Email Address
              </label>
              <div className="admin-login-input-wrapper">
                <div className="admin-login-input-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fixitfast.com"
                  className="admin-login-input"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="admin-login-input-group">
              <label htmlFor="password" className="admin-login-label">
                Password
              </label>
              <div className="admin-login-input-wrapper">
                <div className="admin-login-input-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="admin-login-input"
                />
              </div>
            </div>

            {/* Secret Key Input */}
            <div className="admin-login-input-group">
              <label htmlFor="secretKey" className="admin-login-label">
                Admin Secret Key
                <span className="admin-login-label-optional">(Optional for Super Admins)</span>
              </label>
              <div className="admin-login-input-wrapper">
                <div className="admin-login-input-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                  </svg>
                </div>
                <input
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter your admin secret key"
                  className="admin-login-input"
                />
              </div>
              <p className="admin-login-helper-text">
                Super Admins can leave this field blank.
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="admin-login-submit-btn"
            >
              {isLoading ? (
                <span className="admin-login-loading">
                  <svg className="admin-login-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="admin-login-footer">
            <p>Secure admin access powered by FixItFast</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="admin-login-decoration admin-login-decoration-1"></div>
        <div className="admin-login-decoration admin-login-decoration-2"></div>
      </div>
    </div>
  );
};

export default AdminLogin;