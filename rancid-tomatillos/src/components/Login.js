import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

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
        this.postUserData()
    }

    async postUserData() {
        const promise = await fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        });
        let result = await promise.json();
        this.resultHandler(result)
    }
    resultHandler(result) {
        if (result.error) {
            alert("Wrong info")
        }

        console.log(result)
    }
    //'marge@turing.io', password: 'password123'
    render() {
        console.log(this);
        return (
            <form>
                <h1>Enter User Details </h1>
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
        );
    }
}

export default Login;
