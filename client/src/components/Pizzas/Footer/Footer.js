import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const Footer = (props) => {
  
  const handleOrderSubmit = () => {
    props.history.push('/order');
  };
  
  let disabled = () => {
    if(props.orders.length === 0){
      return true;
    }
    for(let i = 0; i < props.orders.length; i++){
      if(props.orders[i].amount > 0){
        return false;
      }
    }
    return true;
  };
  
  return(
    <div className="footer">
      <button 
        className="order-now"  
        onClick={handleOrderSubmit}
        disabled={disabled()}>
        Order Now
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    orders: state.orderReducer.orders
  };
};

export default connect(mapStateToProps)(withRouter(Footer));