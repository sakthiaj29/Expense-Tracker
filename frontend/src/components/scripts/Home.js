// Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/userReducer';
import GetCookies from '../util/GetCookies';
import RightContent from './RightContent';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const id = GetCookies('cookieId');
    const name = GetCookies('cookieName');

    if (id && name) {
      dispatch(addUser({ id, name }));
    } else {
      navigate('/signin'); // Redirect to SignIn if no cookies
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <RightContent />
    </div>
  );
};

export default Home;
