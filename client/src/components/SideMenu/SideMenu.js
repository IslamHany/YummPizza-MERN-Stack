import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const SideMenu = (props) => {

  return(
    <Fragment>
      <div 
        className="back-drop"
        style={{
          display: props.open ? "block" : "none"
        }}
        onClick={props.closeMenu}></div>
      <div 
        className="content" 
        style={{
          left: props.open ? "0%" : "-50%"
        }}>
        <span className="close" onClick={props.closeMenu}>X</span>
        <ul>
          {props.user.token ? (
            <li>
              <Link to="/logout" onClick={props.closeMenu}>Logout</Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={props.closeMenu}>
                Sign In
              </Link>
            </li>
          )}
          <li>
            <Link to="/order" onClick={props.closeMenu}>Order</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default SideMenu;