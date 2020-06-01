import React from "react";
import "../styles/styles.scss";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Images from "../asset-libraries/Images";

const Nav = (props) => {
  const isLoggedIn = !!props.userId;

  return (
    <Navbar id="nav-bar">
      <div className="nav-container">
        {isLoggedIn ? (
          <>
            <Link to={`/users/${props.userId}`} className="profile-btn">
              <img src={props.avatar} alt="Profile" className="tiny-avatar" />
            </Link>
            <Link to="/" className="logo-btn">
              <img id="logo" src={Images.logo} alt="Desert Heat Logo" />
            </Link>
            <Link to="/" className="btn">
              Play!
            </Link>
            <Link to="/leaderboard" className="btn">
              Leaderboard
            </Link>
            <Link to="/" onClick={props.signOut} className="btn signOutButton">
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={props.toggleAbout}
              className="profile-btn"
            >
              About
            </Link>
            <Link to="/signup" className="btn sign-up-button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default Nav;
