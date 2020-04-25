import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {setUser} from './store/actions/user';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Pizzas from './components/Pizzas/Pizzas';
import Orders from './components/Orders/Orders';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';


function App(props) {
    
  const getUser = async (token) => {
    try{
      const response = await axios.get("/me", {
        headers:{
          "x-auth-token": token
        }
      });
      props.setUser({...response.data, token});
    }catch(error){
      alert("Sorry network error");
    }
  }; 
  
  if(localStorage.getItem('token')){
    getUser(localStorage.getItem('token'));
  }

  
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Pizzas />
        </Route>
        
        <Route path="/order" exact>
          <Orders />
        </Route>
        
        <Route path="/checkout" exact>
          <Checkout />
        </Route>
        
        <Route path="/login" exact>
          <Login />
        </Route>
        
        <Route path="/signup" exact>
          <Signup />
        </Route>
        
        <Route path="/logout" exact>
          <Logout />
        </Route>
      </Switch>
    </div>
  );
}

export default connect(null, {setUser})(App);
