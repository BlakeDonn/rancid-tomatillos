import React from "react";
import {Link} from "react-router-dom";
const Header = (props) => {
  return (
    <nav>
      <h1>Rotten Tomatillos</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {props.loggedIn && (
          <li>
            <Link to="/" onClick={props.toggleFavoriteView}>
              Favorites
            </Link>
          </li>
        )}
        {!props.loggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {props.loggedIn && (
          <li>
            <Link to="/" onClick={props.toggleLogin}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
