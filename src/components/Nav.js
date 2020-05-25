import React from "react";
import "../styles/styles.scss";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../desert-driver-logo6.png";

const Nav = (props) => {
  const isLoggedIn = !!props.userId;

  return (
    <Navbar bg="dark">
      <div className="nav-container">
        {isLoggedIn ? (
          <>
            <Link to={`/users/${props.userId}`} className="profile-btn">
              <img src={props.avatar} alt="Profile" className="tiny-avatar" />
            </Link>
            <Link to="/" className="logo-btn">
              <img id="logo" src={logo} alt="logo"/>
            </Link>
            <Link to="/" className="btn">
              Play!
            </Link>
            <Link to="/leaderboard" className="btn">
              Leaderboard
            </Link>
            <button onClick={props.signOut} className="btn">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="profile-btn">
              Log In
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default Nav;
