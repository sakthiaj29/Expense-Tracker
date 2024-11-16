import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions, removeTransaction } from '../../redux/transactionReducer';
import '../styles/transactionList.css';

const TransactionList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const transactions = useSelector((state) => state.transaction.transactions || []);
  const loading = useSelector((state) => state.transaction.loading);
  const error = useSelector((state) => state.transaction.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(5);
  const [filterType, setFilterType] = useState('All'); // New state for filter type

  useEffect(() => {
    
    if (user.id) {
      dispatch(fetchTransactions(user.id));
    }
  }, [user.id, dispatch]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  // Apply filter to transactions based on filterType
  const filteredTransactions = filterType === 'All' 
    ? transactions 
    : transactions.filter(transaction => transaction.type === filterType);

  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (confirmDelete) {
      await dispatch(removeTransaction(id));
      dispatch(fetchTransactions(user.id)); // Fetch updated transactions
    }
  };

  const handleEdit = (index) => {
    console.log(`Editing transaction at index ${index}`);
  };

  const handleTransactionsPerPageChange = (e) => {
    setTransactionsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when the items per page changes
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  useEffect(() => {
    console.log("Fetched transactions:", transactions);
  }, [transactions]);

  return (
    <div className="transaction-list-container">
      <h2>Transactions</h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p>Error: {error}</p>}

      <div className="pagination-filter-controls">
      <div className="pagination-controls">
        <label htmlFor="transactionsPerPage">Transactions per page: </label>
        <select
          id="transactionsPerPage"
          value={transactionsPerPage}
          onChange={handleTransactionsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        </div>

        {/* Filter Dropdown */}
        <div className="filter-controls">
        <label htmlFor="transactionFilter">Filter: </label>
        <select
          id="transactionFilter"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        </div>
      </div>

      {!loading && !error && filteredTransactions.length > 0 ? (
        <>
          <div className="transaction-list">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.type}</td>
                    <td>{entry.category}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.description ? (entry.description.length > 30 ? `${entry.description.slice(0, 30)}...` : entry.description) : 'No description'}</td>
                    <td><button className="delete-btn" onClick={() => handleDelete(entry.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredTransactions.length / transactionsPerPage) }, (_, i) => (
              <button 
                key={i} 
                onClick={() => paginate(i + 1)} 
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        !loading && !error && <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
