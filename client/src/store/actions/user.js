import {SET_USER, CLEAR_USER} from './actionTypes';

export const setUser = ({id, name, email, token}) => {
  return{
    type: SET_USER,
    id,
    name,
    email,
    token
  };
};

export const clearUser = () => {
  return{
    type: CLEAR_USER
  };
};