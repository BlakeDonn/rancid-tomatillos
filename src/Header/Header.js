import React from "react";
import {Link} from "react-router-dom";
const Header = (props) => {
  return (
    <nav>
      <h1>Rotten Tomatillos</h1>
      <ul>
        {props.loggedIn && !props.favoriteView && (
          <li>
            <Link to="/" onClick={props.toggleFavoriteView}>
              Favorites
            </Link>
          </li>
        )}
        {props.loggedIn && props.favoriteView && (
          <li>
            <Link to="/" onClick={props.toggleFavoriteView}>
              All Movies
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
