import { combineReducers } from '@reduxjs/toolkit';
import transactionReducer from './transactionReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  transaction: transactionReducer,
  user: userReducer
});

export default rootReducer;
