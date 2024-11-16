// redux/userReducer.js
const ADD_USER = 'ADD_USER';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

const initialState = {
  id: '',
  name: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
