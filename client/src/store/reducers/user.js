import {SET_USER, CLEAR_USER} from '../actions/actionTypes';

const initialState = {
  id: null,
  name: null,
  token: null,
  email: null
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_USER:
      return{
        ...state,
        id: action.id,
        name: action.name,
        token: action.token,
        email: action.email,
      };
    case CLEAR_USER:
      return{
        ...state,
        id: null,
        name: null,
        token: null,
        email: null
      };
    default:
      return state;
  };
};

export default userReducer;