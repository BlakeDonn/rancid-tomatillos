import React from "react";
import {Redirect} from 'react-router-dom'
import {postUserLogin} from "../api";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      badLogin: "",
    };
  }
  updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };
  submitUserInfo = (event) => {
    event.preventDefault();
    this.postUserData();
  };

  async postUserData() {
    try {
      const result = await postUserLogin(this.state);
      console.log(result);
      if (result.error) {
        return this.setState({
          password: "",
          email: "",
          badLogin: result.error,
        });
      } else {
        this.props.toggleLogin(result.id, result.name);
      }
    } catch (e) {}
  }
  //'marge@turing.io', password: 'password123'
  render() {
    return (
      <div className="login-container">
        <form clasName="login-form">
          <h1>Enter User Details</h1>
          <input
            placeholder="email"
            name="email"
            //type="text"
            onChange={this.updateValue}
            value={this.state.username}
          ></input>
          <input
            placeholder="password"
            name="password"
            //type="password"
            onChange={this.updateValue}
            value={this.state.password}
          ></input>
          <button onClick={this.submitUserInfo}>Submit</button>
        </form>
        {this.state.badLogin && <h3>Incorrect Login</h3>}
      </div>
    );
  }
}

export default Login;
