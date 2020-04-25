import React from 'react';
import {withRouter} from 'react-router-dom';

const Completed = (props) => {
  
  const goHome = () => props.history.push("/");
  
  return(
    <div style={{marginTop: "100px"}}>
      <div className="completed">
        <p className="check"><span>&#10003;</span></p>
        <p>Your Order has been recieved</p>
        <button style={{
            display: "block",
            margin: "15px auto",
            backgroundColor: "#5cb85c",
            color: "white",
            width: "150px",
            padding: "20px 10px",
            outline: "none",
            border: "none",
            boxShadow: "2px 2px 2px #099614",
            cursor: "pointer",
          }} onClick={goHome}>Ok</button>
      </div>
    </div>
  );
};

export default withRouter(Completed);