import React from 'react';
import {withRouter} from 'react-router-dom';

const CheckoutBtn = (props) => {
  
  const goToCheckout = () => {
    props.history.push("/checkout");
  };
  
  return(
    <div>
      <button 
        className="checkout-btn"
        onClick={goToCheckout}>
        Proceed To Checkout
      </button>
    </div>
  );
};

export default withRouter(CheckoutBtn);