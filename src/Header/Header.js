import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
const Header = (props) => {
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
                    {!props.loggedIn ? (
                        <Link to="/login">Login</Link>
                    ) : (
                            <Link to="/" onClick={props.toggleLogin}>
                                Logout
                            </Link>
                        )}
                </li>
            </ul>
        </nav>
    );
};

export default Header;
