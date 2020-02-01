import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import Button from "../../form-element/Button";
import { UserContext } from "../../../context/auth/auth-context";

const NavLinks = () => {
  const { isLoggedIn, logout, user } = useContext(UserContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <Fragment>
          <li>
            <NavLink to={`/${user._id}/places`}>MY PLACES</NavLink>
          </li>

          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
          <li>
            <Button onClick={logout}>LOGOUT</Button>
          </li>
        </Fragment>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
