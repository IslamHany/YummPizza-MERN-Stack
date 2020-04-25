import {ADD_PIZZA, REMOVE_PIZZA, CLEAR_ORDER} from '../actions/actionTypes';

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  const orders = [...state.orders];
  if(action.index === false){
    orders.push({
      pizzaType: action.pizzaType,
      amount: action.amount,
      price: action.price,
    });
  }else{
    orders[action.index] = {
      pizzaType: action.pizzaType,
      amount: action.amount,
      price: action.price,
    };
  }
  switch(action.type){
    case ADD_PIZZA:
      return{
        ...state,
        orders: orders
      };
    case REMOVE_PIZZA:
      return{
        ...state,
        orders: orders
      };
    case CLEAR_ORDER:
      return{
        ...state,
        orders: []
      };
    default:
      return state;
  };
};

export default orderReducer;