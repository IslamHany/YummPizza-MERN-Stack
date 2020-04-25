import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {clearUser} from '../../store/actions/user';
import Spinner from '../Spinner/Spinner';

const Logout = (props) => {
  
  useEffect(() => {
    if(!props.user.token){
      props.history.push("/");
    }
    props.clearUser();
    localStorage.clear();
    props.history.push("/");
  }, []);
  
  return <Spinner />;
};

const mapStateToProps = state => {
  return{
    user: state.userReducer
  };
};
export default connect(mapStateToProps, {clearUser})(withRouter(Logout));