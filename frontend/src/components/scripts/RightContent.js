// RightContent.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../redux/transactionReducer';
import GetCookies from '../util/GetCookies';
import { addUser } from '../../redux/userReducer';
import '../styles/rightContent.css';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

const RightContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = GetCookies('cookieId');
    const name = GetCookies('cookieName');

    if (id) {
      dispatch(addUser({ id, name }));
      dispatch(fetchTransactions(id)); // Fetch transactions
    }
  }, [dispatch]);

  const { totalIncome, totalExpense, totalCount } = useSelector((state) => state.transaction);

  return (
    <div className="right-container">
      <p>Dashboard</p>
      <div className="income-expense-balance-transactions">
        <div className="income-box">
          <p className="card-value">₹{totalIncome}</p>
          <p className="card-desc">Income</p>
        </div>
        <div className="expense-box">
          <p className="card-value">₹{totalExpense}</p>
          <p className="card-desc">Expense</p>
        </div>
        <div className="balance-box">
          <p className="card-value">₹{totalIncome - totalExpense}</p>
          <p className="card-desc">Balance</p>
        </div>
        <div className="transactions-box">
          <p className="card-value">{totalCount}</p>
          <p className="card-desc">Transactions</p>
        </div>
      </div>
      <div className="total-expenses-container">
        <p classname='total-expenses-text'>Total Expenses</p>
        <DonutChart />
      </div>
      <div className="account-balance-and-income-container">
        <div className="account-balance-container">
          <LineChart />
        </div>
        <div className="income-container">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default RightContent;
