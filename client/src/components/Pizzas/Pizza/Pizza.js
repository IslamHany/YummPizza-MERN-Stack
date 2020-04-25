import React from 'react';
import {connect} from 'react-redux';
import {addPizza, removePizza} from '../../../store/actions/order';

const Pizza = (props) => {
  const {src, pizzaType, orders, price, addPizza, removePizza} = props;

  const getAmount = () => {
    for(let i = 0; i < orders.length; i++){
      if(orders[i]["pizzaType"] === pizzaType){
        return orders[i].amount;
      }
    }
    return 0;
  };

  const handlePizzaAdd = () => {
    let index, amount;
    for(let i = 0; i < orders.length; i++){
      if(orders[i]["pizzaType"] === pizzaType){
        index = i;
        break;
      }
      index = undefined;
    }
    if(index === undefined){
      addPizza(pizzaType, 1, price, false);
    }else{
      amount = orders[index].amount + 1;
      addPizza(pizzaType, amount, price, index);
    }
  };

  const handlePizzaRemove = () => {
    let index, amount;
    for(let i = 0; i < orders.length; i++){
      if(orders[i]["pizzaType"] === pizzaType){
        index = i;
        break;
      }
      index = undefined;
    }
    if(index !== undefined){
      if(orders[index].amount == 0){
        removePizza(pizzaType, 0, price, index);
      }else{
        amount = orders[index].amount - 1;
        removePizza(pizzaType, amount, price, index);
      }
    }
  };

  return(
    <div className="pizza-container">
      <div className="pizza">
        <div className="pizza-img">
          <img className="pizza-round"src={src} alt={pizzaType}/>
        </div>

        <div className='pizza-description'>
          <h3>{pizzaType} <br /><br /><span style={{color: "#FFD700"}}>{price} $</span></h3>
          <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="pizza-amount">
          <span className="add" onClick={handlePizzaAdd}>&#60;</span>
          <span className="number">{getAmount()}</span>
          <span className="remove" onClick={handlePizzaRemove}>&#60;</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    orders: state.orderReducer.orders
  };
};

export default connect(mapStateToProps, {addPizza, removePizza})(Pizza);