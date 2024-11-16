import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/leftMenu.css';
import { useSelector } from 'react-redux';

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.name);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const fileInputRef = useRef();

  const handleProfileClick = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setProfilePhoto(reader.result); // Set the image data as the new profile photo
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSignOutClick = () => {
    setShowSignOutModal(true); // Show the modal
  };

  const handleSignOutConfirm = () => {
    // Clear cookies or localStorage here (if used for authentication)
    document.cookie = "cookieId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Navigate to the sign-in page
    navigate('/signIn');
  };

  const handleSignOutCancel = () => {
    setShowSignOutModal(false); // Hide the modal
  };

  return (
    <div className='left-menu-container'>
      <div className='profile-container'>
        <p className='title'>EXPENSE TRACKER</p>
        <div className='profile' onClick={handleProfileClick}>
          <img className='profile-img' src={profilePhoto || 'https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'} alt='profile' />
          <p className='profile-name'>{userName}</p>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className='left-menu'>
        <Link to='/dashboard' className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to='/transaction' className={location.pathname === '/transaction' ? 'active' : ''}>Transaction</Link>
      </div>
      <button className='sign-out-button' onClick={handleSignOutClick}>
        Sign Out
      </button>

      {/* Sign Out Modal */}
      {showSignOutModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <p>Are you sure you want to sign out?</p>
            <p className='email-display'>{userName}</p>
            <div className='modal-buttons'>
              <button className='confirm-button' onClick={handleSignOutConfirm}>
                Sign Out
              </button>
              <button className='cancel-button' onClick={handleSignOutCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
