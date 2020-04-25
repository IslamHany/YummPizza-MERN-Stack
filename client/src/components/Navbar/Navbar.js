import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SideMenu from '../SideMenu/SideMenu';

class Navbar extends Component{
  
  state = {
    open: false
  };

  openMenu = () => {
    this.setState({open: true});
  };

  closeMenu = () => {
    this.setState({open: false});
  };
  
  render(){
    return(
      <Fragment>
        <div className="nav">
          <div className="logo">
            <Link to="/">
              <img src='/assets/images/logo.png' alt="Logo"/>
              <span>Yummy Pizza</span>
            </Link>
          </div>

          <div className="nav-links">
            <ul>
              {this.props.user.name ? (
                <li className="welcome">
                  Welcome {this.props.user.name} |
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    Authenticate |
                  </Link>
                </li>
              )}
              <li>
                <Link to="/order">
                  Order |
                </Link>
              </li>
              {this.props.user.name && (
                <li>
                  <Link to="/logout">
                    Logout
                  </Link>
                </li>
              )}
              <li className="menu" onClick={this.openMenu}>Menu</li>
            </ul>
          </div>
        </div>
        
        <SideMenu open={this.state.open} closeMenu={this.closeMenu} user={this.props.user}/>
      </Fragment>
    );
  };
};

const mapStateToProps = state => {
  return{
    user: state.userReducer
  };
};

export default connect(mapStateToProps)(Navbar);