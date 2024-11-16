import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseISO, format } from 'date-fns';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    totalIncome: 0,
    totalExpense: 0,
    totalCount: 0,
    balance: 0,
    loading: false,
    error: null,
    monthlyIncome: {},
    monthlyExpense: {},
  },
  reducers: {
    setTransactions: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.transactions = action.payload;
        state.loading = false;
        state.error = null;
        state.totalIncome = calculateTotal(state.transactions, 'income');
        state.totalExpense = calculateTotal(state.transactions, 'expense');
        state.totalCount = state.transactions.length;
        state.balance = state.totalIncome - state.totalExpense;
        state.monthlyIncome = calculateMonthlyTotals(state.transactions, 'income');
        state.monthlyExpense = calculateMonthlyTotals(state.transactions, 'expense');
      } else {
        state.loading = false;
        state.error = 'Fetched data is invalid';
      }
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.loading = false;
      state.error = null;
      state.totalIncome = calculateTotal(state.transactions, 'income');
      state.totalExpense = calculateTotal(state.transactions, 'expense');
      state.totalCount++;
      state.balance = state.totalIncome - state.totalExpense;
      state.monthlyIncome = calculateMonthlyTotals(state.transactions, 'income');
      state.monthlyExpense = calculateMonthlyTotals(state.transactions, 'expense');
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      state.totalIncome = calculateTotal(state.transactions, 'income');
      state.totalExpense = calculateTotal(state.transactions, 'expense');
      state.totalCount--;
      state.balance = state.totalIncome - state.totalExpense;
      state.monthlyIncome = calculateMonthlyTotals(state.transactions, 'income');
      state.monthlyExpense = calculateMonthlyTotals(state.transactions, 'expense');
    }
  }
});

const calculateTotal = (transactions, type) => {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === type) {
      return total + transaction.amount;
    } else {
      return total;
    }
  }, 0);
};

const calculateMonthlyTotals = (transactions, type) => {
  const monthlyTotals = {};
  transactions.forEach(transaction => {
    if (transaction.type === type) {
      const month = format(parseISO(transaction.date), 'yyyy-MM');
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += transaction.amount;
    }
  });
  return monthlyTotals;
};

export const { setTransactions, setLoading, setError, addTransaction, deleteTransaction } = transactionSlice.actions;

export const fetchTransactions = (userId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`http://localhost:8080/api/transactions/user/${userId}`);
    dispatch(setTransactions(response.data));
  } catch (error) {
    dispatch(setError('Error fetching transactions'));
    console.error('Error fetching transactions:', error);
  }
};

export const createTransaction = (transaction) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post('http://localhost:8080/api/transactions/add', transaction);
    dispatch(addTransaction(response.data));
  } catch (error) {
    dispatch(setError('Error adding transaction'));
    console.error('Error adding transaction:', error);
  }
};

export const removeTransaction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/transactions/delete/${id}`);
    dispatch(deleteTransaction(id));
  } catch (error) {
    dispatch(setError('Error deleting transaction'));
    console.error('Error deleting transaction:', error);
  }
};

export default transactionSlice.reducer;
