import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import OrdersList from './OrdersList/OrdersList';
import CheckoutBtn from './CheckoutBtn/CheckoutBtn';

const Orders = (props) => {

  const checkForAmount = () => {
    let orders = [];
    for(let i = 0; i < props.orders.length; i++){
      if(props.orders[i].amount > 0){
        orders.push({
          amount: props.orders[i].amount,
          pizzaType: props.orders[i].pizzaType,
          price: props.orders[i].price
        });
      }
    }
    return orders;
  };
  
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for(let i = 0; i < props.orders.length; i++){
      totalPrice += (props.orders[i].price * props.orders[i].amount);
    }
    return totalPrice;
  };

  return(
    <div style={{marginTop: "100px"}}>
      <div className="orders">
        {props.orders.length === 0 || checkForAmount().length === 0 ? "No orders Yet" : (
          <Fragment>
            <div className="orders-container">
              <div className="brown">Pizza Type</div>
              <div className="brown">Price</div>
              <div className="brown">Pizza Amount</div>
            </div>
            <OrdersList orders={checkForAmount()} />
            <div>
              Total Price: <span style={{color: 'rgb(255, 215, 0)'}}>{calculateTotalPrice()} $
              </span></div>
            <CheckoutBtn />
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    orders: state.orderReducer.orders
  };
};

export default connect(mapStateToProps)(Orders);