import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {clearOrder} from '../../store/actions/order';
import Spinner from '../Spinner/Spinner';
import Completed from '../Completed/Completed'
import {connect} from 'react-redux';

class Checkout extends Component{
  
  state = {
    name: '',
    address: '',
    isLoading: false,
    submitted: false,
    error: null
  };
  
  componentDidMount(){
    if(this.props.orders.length === 0 || this.checkForAmount().length === 0){
      this.props.history.push("/");
    }
  }
  
  checkForAmount = () => {
    let orders = [];
    for(let i = 0; i < this.props.orders.length; i++){
      if(this.props.orders[i].amount > 0){
        orders.push({
          amount: this.props.orders[i].amount,
          pizzaType: this.props.orders[i].pizzaType,
          price: this.props.orders[i].price
        });
      }
    }
    return orders;
  };

  handleSubmit = async(e) => {
    const orders = this.props.orders;
    const data = {orders: orders, address: this.state.address};
    e.preventDefault();
    this.setState({
      isLoading: true,
      error: null
    });
    if(this.props.user.token){
      try{
        await axios.post("/order", data, {
          headers: {
            "x-auth-token": this.props.user.token
          }
        });
        this.setState({
          isLoading: false,
          error: null,
          submitted: true
        });
        this.props.clearOrder();
      }catch(error){
        this.setState({
          isLoading: false,
          error: "Please fill all fields"
        });
      }
    }else{
      try{
        await axios.post("/order/notsigned", {...data, name: this.state.name});
        this.setState({
          isLoading: false,
          error: null,
          submitted: true
        });
        this.props.clearOrder();
      }catch(error){
        this.setState({
          isLoading: false,
          error: "Please fill all fields"
        });
      }
    }
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  
  render(){
    let content = (
      <div style={{marginTop: '100px'}}>
        {this.state.isLoading ? <Spinner /> : (
          <form className="form">
            {!this.props.user.token && (
              <input type="text" name="name" placeholder="name" onChange={this.handleChange} required/>
            )}
            <input type="text" name="address" placeholder="Address" onChange={this.handleChange}/>
            <input type="submit" value="submit" onClick={this.handleSubmit} required/>
          </form>
        )}
        
        {this.state.error && (
          <div className="error">{this.state.error}</div>
        )}
      </div>
    );
    
    if(this.state.submitted){
      return <Completed />
    }
    return content;
  };
};

const mapStateToProps = state => {
  return{
    orders: state.orderReducer.orders,
    user: state.userReducer
  };
};

export default connect(mapStateToProps, {clearOrder})(withRouter(Checkout));