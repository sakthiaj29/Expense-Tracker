// src/components/Transaction.js
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/userReducer';
import GetCookies from '../util/GetCookies';
import '../styles/transaction.css'; // Import your CSS file for styling
import Popup from './Popup';
import TransactionList from './TransactionList';

function Transaction() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const id = GetCookies('cookieId');
    const name = GetCookies('cookieName');

    if (id) {
      dispatch(addUser({ id, name }));
    }
    else{
      navigate('/signin');
    }
  }, [dispatch]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="transaction-full-container">
      <button className='add-transaction-button' onClick={togglePopup}>Add Transaction</button>
      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={togglePopup} />}
      <TransactionList />
      <filter></filter>
    </div>
  );
}

export default Transaction;
