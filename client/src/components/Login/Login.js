import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from '../../store/actions/user';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

class Login extends Component{
  
  state = {
    isLoading: false,
    password: '',
    email: '',
    error: null
  };

  componentDidMount(){
    if(this.props.user.token){
      this.props.history.push("/");
    }
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  handleSubmit = async (e) => {
    this.setState({
      isLoading: true,
      error: null
    });
    e.preventDefault();
    try{
      const response = await axios.post("/login", {
        email: this.state.email,
        password: this.state.password
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
            <input onChange={(e) => this.handleChange(e)} name="email" type="email" placeholder="email" required/>
            <input onChange={(e) => this.handleChange(e)} name="password" type="password" placeholder="password" required/>
            <input type="submit" value="Login" onClick={this.handleSubmit}/>
          </form>
        )}
        
        {this.state.error && (
          <div className="error">{this.state.error}</div>
        )}
        
        <div className="form-info">
          <p>Do not have an account ? 
            <Link to="/signup">
              <span className="blue"> Sign up</span>
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

export default connect(mapStateToProps, {setUser})(withRouter(Login));