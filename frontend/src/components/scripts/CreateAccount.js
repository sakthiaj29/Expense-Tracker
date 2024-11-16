import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SetCookies  from '../util/SetCookies';
import { addUser } from '../../redux/userReducer';
import { useDispatch } from 'react-redux';
import GetCookies from '../util/GetCookies';
import '../styles/createAccount.css';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const id = GetCookies('cookieId');
    const name = GetCookies('cookieName');

    if (id !== '') {
      dispatch(addUser({ id: id, name: name }));
      navigate('/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, emailId, phoneNumber, password, confirmPassword } = formData;

    if (!name || !emailId || !phoneNumber || !password || !confirmPassword ) {
      setError('All fields must be filled');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          emailId,
          phoneNumber,
          password,
          confirmPassword
        })
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.id); // add message

        //add id cookie
        <SetCookies 
          id={result.id}
        />
        
        navigate('/dashboard');
      } else {
        console.error('Backend error:', result);
        setError(result);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='sign_up'>
      <div className='sign_up_container'>
        <div className='sign_up_block'>
          <h2 className='sign_up_block_header'>Create Account</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              <h5 className='sign_up_text'>Enter your User name</h5>
              <input
                className='sign_up_email_input'
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <h5 className='sign_up_text'>Enter your Email</h5>
              <input
                className='sign_up_email_input'
                type='email'
                name='emailId'
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <h5 className='sign_up_text'>Enter your Phone number</h5>
              <input
                className='sign_up_email_input'
                type='number'
                min='1000000000'
                max='9999999999' 
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <h5 className='sign_up_text'>Enter your password</h5>
              <input
                className='sign_up_email_input'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <h5 className='sign_up_text'>Confirm Password</h5>
              <input
                className='sign_up_email_input'
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            <button className='continue_button' type='submit'>Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
