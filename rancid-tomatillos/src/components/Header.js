import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
function Header() {
    return (
        <nav>
            <h1>Rotten Tomatillos</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
