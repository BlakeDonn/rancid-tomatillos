import React from "react";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }
    updateValue = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    render() {
        console.log(this);
        return (
            <form>
                <h1>Enter User Details </h1>
                <input
                    name="username"
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
                <button>Enter User Details </button>
            </form>
        );
    }
}

export default Login;
