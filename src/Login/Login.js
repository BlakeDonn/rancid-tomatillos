import React from "react";
import {postUserLogin} from "../api";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      badLogin: false,
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
    let promise = await postUserLogin(this.state)
    promise = await promise.json()
    this.resultHandler(promise);
  }
  resultHandler(result) {
    if (result.error) {
      this.setState({password: "", email: "", badLogin: true});
    } else {
      console.log("test2");
      this.props.toggleLogin(result.id, result.name);
      this.props.history.push("/");
    }
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
        {this.state.badLogin ? <h3>Incorrect Login</h3> : null}
      </div>
    );
  }
}

export default Login;
