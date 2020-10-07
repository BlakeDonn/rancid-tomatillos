import React from 'react'

class Login extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <form>
                <h1>Enter User Details </h1>
                <input name="username" type="text" value={this.state.password}>Enter User Details </input>
                <input name="password" type="text" value={this.state.password}>Enter User Details </input>
                <h1>Enter User Details </h1>
            </form>
        )
    }
}

export default Login;

