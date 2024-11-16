// components/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../redux/userReducer';
import SetCookies from '../util/SetCookies';
import GetCookies from '../util/GetCookies';
import '../styles/signIn.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const id = GetCookies('cookieId');
    const name = GetCookies('cookieName');

    if (id !== '') {
      dispatch(addUser({ id: id, name: name }));
      navigate('/dashboard');
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId, password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
  
        // Save user to Redux store
        dispatch(addUser({ id: userData.id, name: userData.name }));
  
        // Set cookies for user ID and name
        SetCookies(userData.id, userData.name);
  
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        alert('No user found');
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Sign-in failed:', error.message);
    }
  };  

  const goToCreateAccount = () => {
    navigate('/createaccount');
  };

  return (
    <div className="sign_in">
      <div className="sign_in_container">
        <div className="sign_in_block">
          <h2 className="sign_in_block_header">Sign in</h2>
          <form onSubmit={handleSignIn}>
            <label>
              <h5 className="sign_in_text">Enter your Email</h5>
              <input
                className="sign_in_email_input"
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label>
              <h5 className="sign_in_text">Enter your Password</h5>
              <input
                className="sign_in_email_input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="continue_button" type="submit">Continue</button>
            <button
              onClick={goToCreateAccount}
              className="create_account_button"
            >
              Create Your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
