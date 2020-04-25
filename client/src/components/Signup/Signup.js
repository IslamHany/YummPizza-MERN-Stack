import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {setUser} from '../../store/actions/user';
import Spinner from '../Spinner/Spinner';

class Signup extends Component{
  
  state = {
    isLoading: false,
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    error: null
  };

  componentDidMount(){
    if(this.props.user.token){
      this.props.history.push("/");
    }
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      error: null
    });
    
    try{
      if(this.state.password !== this.state.confirmPassword){
        throw new Error();
      }
      const response = await axios.post("/register", {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      });
      this.setState({isLoading: false});
      this.props.setUser(response.data);
      localStorage.setItem("token", response.data.token);
      this.props.history.push("/");
    }catch(error){
      this.setState({
        isLoading: false,
        error: "Invalid Credentials"
      });
    }
  };
  
  render(){
    return(
      <div style={{marginTop: '100px'}}>
        {this.state.isLoading ? <Spinner /> : (
          <form className="form">
            <input name="email" onChange={(e) => this.handleChange(e)} type="email" placeholder="Email" required/>
            <input name="name" onChange={(e) => this.handleChange(e)} type="text" placeholder="Name" required/>
            <input name="password" onChange={(e) => this.handleChange(e)} type="password" placeholder="Password" required/>
            <input name="confirmPassword" onChange={(e) => this.handleChange(e)} type="password" placeholder="Confirm Password" required/>
            <input type="submit" value="Sign up" required onClick={this.handleSubmit}/>
          </form>
        )}
        
        {this.state.error && (
          <div className="error">{this.state.error}</div>
        )}
        
        <div className="form-info">
          <p>have an account ? 
            <Link to="/login">
              <span className="blue"> Login</span>
            </Link>
          </p>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return{
    user: state.userReducer
  };
};

export default connect(mapStateToProps, {setUser})(withRouter(Signup));