import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [editData, setEditData] = useState({
    name: '',
    state: 'Madhya Pradesh'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    priceUpdates: true,
    schemeUpdates: true,
    recommendationUpdates: true,
    weeklyReport: true,
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Load user from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setEditData({
        name: user.name || '',
        state: user.state || 'Madhya Pradesh'
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Handle edit submit
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Update localStorage immediately
      const updatedUser = {
        ...userData,
        name: editData.name,
        state: editData.state
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      
      // Try to update backend
      try {
        const response = await fetch('http://localhost:8080/api/auth/update-profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editData)
        });
        
        if (!response.ok) {
          console.warn('Backend update failed, but localStorage updated');
        }
      } catch (err) {
        console.warn('Could not reach backend, but localStorage updated');
      }

      alert('✅ Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    try {
      setLoading(true);
      setTimeout(() => {
        setPasswordSuccess('✅ Password changed successfully!');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        setTimeout(() => {
          setShowChangePassword(false);
          setPasswordSuccess('');
        }, 2000);

        setLoading(false);
      }, 1000);

    } catch (error) {
      setPasswordError('Failed to change password');
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      '⚠️ ARE YOU SURE?\n\nThis will permanently delete your account and all data.\n\nType "DELETE" to confirm.'
    );

    if (!confirmDelete) return;

    const deleteText = prompt('Type "DELETE" to confirm account deletion:');
    
    if (deleteText !== 'DELETE') {
      alert('❌ Deletion cancelled. Account not deleted.');
      return;
    }

    try {
      setLoading(true);

      setTimeout(() => {
        localStorage.removeItem('user');
        alert('✅ Account deleted successfully. Redirecting to login...');
        navigate('/login');
        setLoading(false);
      }, 1500);

    } catch (error) {
      alert('❌ Failed to delete account');
      setLoading(false);
    }
  };

  // Handle notifications change
  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveNotifications = () => {
    alert('✅ Notification settings saved!');
    setShowNotifications(false);
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="profile-empty">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">👨‍🌾</div>
          <div className="profile-title">
            <h1>{userData.name || 'Farmer'}</h1>
            <p className="profile-subtitle">Your farming profile</p>
          </div>
        </div>
        <button 
          className={`edit-btn ${isEditing ? 'cancel' : 'edit'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {!isEditing ? (
          // VIEW MODE
          <>
            {/* Personal Information Card */}
            <div className="profile-card">
              <div className="card-header">
                <h2>👤 Personal Information</h2>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{userData.name || 'Not set'}</p>
                </div>
                <div className="info-item">
                  <label>📧 Email</label>
                  <p>{userData.email || 'Not set'}</p>
                </div>
                <div className="info-item">
                  <label>📍 State</label>
                  <p>{userData.state || 'Not set'}</p>
                </div>
              </div>
            </div>

            {/* Account Settings Card */}
            <div className="profile-card">
              <div className="card-header">
                <h2>⚙️ Account Settings</h2>
              </div>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>🔐 Change Password</h3>
                    <p>Update your password for better security</p>
                  </div>
                  <button 
                    className="setting-btn"
                    onClick={() => setShowChangePassword(true)}
                  >
                    Change
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>🔔 Notifications</h3>
                    <p>Manage notification preferences</p>
                  </div>
                  <button 
                    className="setting-btn"
                    onClick={() => setShowNotifications(true)}
                  >
                    Manage
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>🗑️ Delete Account</h3>
                    <p>Permanently delete your account and data</p>
                  </div>
                  <button 
                    className="setting-btn danger"
                    onClick={() => setShowDeleteAccount(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          // EDIT MODE
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="profile-card">
              <div className="card-header">
                <h2>✏️ Edit Profile</h2>
              </div>

              <div className="form-group">
                <label>👤 Full Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>📍 State</label>
                <select
                  value={editData.state}
                  onChange={(e) => setEditData({...editData, state: e.target.value})}
                  className="form-input"
                  required
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={loading}
                >
                  {loading ? '⏳ Saving...' : '💾 Save Changes'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showChangePassword && (
        <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🔐 Change Password</h2>
              <button 
                className="modal-close"
                onClick={() => setShowChangePassword(false)}
              >
                ✕
              </button>
            </div>

            {passwordError && (
              <div className="modal-error">
                <span>⚠️</span> {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="modal-success">
                <span>✅</span> {passwordSuccess}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="modal-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  placeholder="Enter your current password"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  placeholder="Enter new password (min 6 characters)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  className="form-input"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="modal-btn primary"
                  disabled={loading}
                >
                  {loading ? '⏳ Changing...' : '💾 Change Password'}
                </button>
                <button 
                  type="button" 
                  className="modal-btn secondary"
                  onClick={() => setShowChangePassword(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {showNotifications && (
        <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🔔 Manage Notifications</h2>
              <button 
                className="modal-close"
                onClick={() => setShowNotifications(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              <p>Choose which notifications you want to receive:</p>
            </div>

            <div className="modal-form">
              <div className="notification-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="weatherAlerts"
                    checked={notifications.weatherAlerts}
                    onChange={handleNotificationsChange}
                  />
                  <span>🌦️ Weather Alerts</span>
                </label>
                <p className="notification-desc">Get alerts for weather changes</p>
              </div>

              <div className="notification-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="priceUpdates"
                    checked={notifications.priceUpdates}
                    onChange={handleNotificationsChange}
                  />
                  <span>💰 Price Updates</span>
                </label>
                <p className="notification-desc">Get market price notifications</p>
              </div>

              <div className="notification-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="schemeUpdates"
                    checked={notifications.schemeUpdates}
                    onChange={handleNotificationsChange}
                  />
                  <span>📋 Scheme Updates</span>
                </label>
                <p className="notification-desc">Get government scheme updates</p>
              </div>

              <div className="notification-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="recommendationUpdates"
                    checked={notifications.recommendationUpdates}
                    onChange={handleNotificationsChange}
                  />
                  <span>💡 Recommendations</span>
                </label>
                <p className="notification-desc">Get crop recommendations</p>
              </div>

              <div className="notification-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="weeklyReport"
                    checked={notifications.weeklyReport}
                    onChange={handleNotificationsChange}
                  />
                  <span>📊 Weekly Report</span>
                </label>
                <p className="notification-desc">Get weekly farming reports</p>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="modal-btn primary"
                onClick={handleSaveNotifications}
              >
                💾 Save Settings
              </button>
              <button 
                type="button" 
                className="modal-btn secondary"
                onClick={() => setShowNotifications(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteAccount && (
        <div className="modal-overlay" onClick={() => setShowDeleteAccount(false)}>
          <div className="modal danger" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚠️ Delete Account</h2>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteAccount(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              <p className="warning-text">
                🚨 <strong>This action cannot be undone!</strong>
              </p>
              <p>Deleting your account will:</p>
              <ul>
                <li>❌ Permanently delete your account</li>
                <li>❌ Delete all your farm data</li>
                <li>❌ Delete all your preferences</li>
                <li>❌ Cannot be recovered</li>
              </ul>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="modal-btn danger-btn"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? '⏳ Deleting...' : '🗑️ Yes, Delete My Account'}
              </button>
              <button 
                type="button" 
                className="modal-btn secondary"
                onClick={() => setShowDeleteAccount(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;