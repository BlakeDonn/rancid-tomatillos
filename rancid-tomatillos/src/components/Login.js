import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainView from "./MainView";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
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
        const promise = await fetch(
            "https://rancid-tomatillos.herokuapp.com/api/v2/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            }
        );
        let result = await promise.json();
        this.resultHandler(result);
    }
    resultHandler(result) {
        if (result.error) {
            alert("Wrong info");
        } else {
            this.props.isAuthed()
            this.props.history.push('/')
        }
    }
    //'marge@turing.io', password: 'password123'
    render() {
        return (
            <div className="login-container">
                <form clasName="login-form">
                    <h1>Enter User Details</h1>
                    <input
                        name="email"
                        type="text"
                        onChange={this.updateValue}
                        value={this.state.username}
                    ></input>
                    <input
                        name="password"
                        type="text"
                        onChange={this.updateValue}
                        value={this.state.password}
                    ></input>
                    <button onClick={this.submitUserInfo}>
                        Enter User Details{" "}
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
