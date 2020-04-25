import React, {Fragment} from 'react';

const OrdersList = (props) => {
  return(
    <Fragment>
      {props.orders.map((order, i) => (
        <div key={i} className="orders-container">
          <div>{order.pizzaType}</div>
          <div>
            <div style={{color: 'rgb(255, 215, 0)'}}>
              <div className="price-center">{order.price + " $"}</div>
            </div>
          </div>
          <div>{order.amount}</div>
        </div>
      ))}
    </Fragment>
  );
};

export default OrdersList;