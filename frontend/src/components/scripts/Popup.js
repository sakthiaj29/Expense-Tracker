import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../redux/transactionReducer';
import axios from 'axios';
import '../styles/popup.css';

const Popup = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: 'expense',
    date: '',
    time: '',
    category: 'Rent', // Initial category set to 'Salary'
    amount: '',
    description: ''
  });

  useEffect(() => {
    // Update initial category whenever the transaction type changes
    setFormData(prevData => ({
      ...prevData,
      category: prevData.type === 'income' ? 'Salary' : 'Rent'
    }));
  }, [formData.type]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { date, time, category, amount, description } = formData;
  
    if (!date || !time || !category || !amount || !description) {
      alert('Please fill in all fields');
      return;
    }
  
    const transactionData = {
      ...formData,
      user: { id: user.id }  // Ensure user ID is included as an object
    };
  
    try {
      await axios.post('http://localhost:8080/api/transactions/add', transactionData);
      onClose();
      // Fetch transactions again after successfully adding a new transaction
      dispatch(fetchTransactions(user.id));
    } catch (error) {
      console.error('Error while adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const incomeCategories = ['Salary', 'Interest', 'Extra Income', 'Discount'];
  const expenseCategories = ['Rent', 'Food', 'Bills', 'Transportation', 'Insurance', 'Shopping', 'Entertainment', 'HealthCare', 'Taxes', 'Cloths', 'Education', 'Miscellaneous', 'Personalcare'];

  return (
    <div className={`popup-overlay ${isOpen ? 'visible' : ''}`}>
      <div className="popup-content">
        <form onSubmit={onSubmitHandler} className='form-container'>
          <h3 className='input-form-heading'>Transaction</h3>
          <div className='radio-container'>
          <div className='radio-input-container'>
              <label htmlFor='expense'>Expense</label>
              <input
                type='radio'
                id='expense'
                name='type'
                value='expense'
                checked={formData.type === 'expense'}
                onChange={handleChange}
              />
            </div>
            <div className='radio-input-container'>
              <label htmlFor='income'>Income</label>
              <input
                type='radio'
                id='income'
                name='type'
                value='income'
                checked={formData.type === 'income'}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='input-container'>
            <label htmlFor='date'>Date :</label>
            <input type='date' id='date' name='date' value={formData.date} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <label htmlFor='time'>Time :</label>
            <input type='time' id='time' name='time' value={formData.time} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <label htmlFor='category'>Category :</label>
            <select id='category' name='category' value={formData.category} onChange={handleChange}>
              {(formData.type === 'income' ? incomeCategories : expenseCategories).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor='amount'>Amount :</label>
            <input type='number' id='amount' name='amount' value={formData.amount} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <label htmlFor='description'>Description :</label>
            <input type='text' id='description' name='description' value={formData.description} onChange={handleChange} />
          </div>
          <div className='button-container'>
            <button className='cancel-button' type='button' onClick={onClose}>Close</button>
            <button className='submit-button' type='submit' value='Submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
