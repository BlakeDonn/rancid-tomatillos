import React from "react";

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
        fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then(response => response.json())
            .then(data => console.log(data))
    };
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
