import {ADD_PIZZA, REMOVE_PIZZA, CLEAR_ORDER} from './actionTypes';

export const addPizza = (pizzaType, amount, price, index) => {
  return {
    type: ADD_PIZZA,
    pizzaType,
    amount,
    price,
    index
  };
};

export const removePizza = (pizzaType, amount, price, index) => {
  return{
    type: REMOVE_PIZZA,
    pizzaType,
    amount,
    price,
    index
  };
};

export const clearOrder = () => {
  return{
    type: CLEAR_ORDER
  };
};