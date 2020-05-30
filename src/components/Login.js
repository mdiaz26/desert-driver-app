import "../styles/Login.css";
import React from "react";
import { Redirect } from "react-router-dom";
import Images from "../asset-libraries/Images";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    redirectToGame: false,
    entered: false,
    flashing: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  findUser = (username) => {
    return this.props.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userObj = this.findUser(this.state.username);
    if (userObj) {
      if (this.state.password === userObj.password) {
        this.props.setUser(userObj, userObj.avatar.id);
        this.setState({ redirectToGame: true });
      } else if (this.state.password !== userObj.password) {
        alert("incorrect password");
        this.setState({ password: "" });
      }
    } else {
      alert(
        "that username has not been found in our database. Try signing up for a new account!"
      );
      this.setState({ username: "", password: "" });
    }
  };

  enterSite = () => {
    this.props.startThemeSong();
    this.setState({
      entered: true,
      flashing: false,
    });
    setTimeout(() => {
      this.setState({ flashing: false });
    }, 5583);
    let flashing = setInterval(() => {
      this.setState((state) => ({
        flashing: !state.flashing,
      }));
    }, 483);
    setTimeout(() => clearInterval(flashing), 4500);
  };

  render() {
    const redirectToGame = this.state.redirectToGame;
    if (redirectToGame) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="logo-container">
          <img
            alt="Login Gif"
            className="logo-background"
            src={Images.loginGif}
          />
          <img
            id={this.state.entered ? "logo" : "large-logo"}
            src={Images.logo}
            alt="Desert Heat Logo"
          />
          <div
            className={
              this.state.entered
                ? "home-screen-buttons-container-hidden"
                : "home-screen-buttons-container"
            }
          >
            <button onClick={this.enterSite} className="home-screen-buttons">
              LOG IN
            </button>
            <button className="home-screen-buttons">SIGN UP</button>
          </div>
        </div>
        <div className="login-screen">
          <div></div>
          <div
            className={this.state.entered ? "login-form" : "login-form-hidden"}
          >
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="USERNAME"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="PASSWORD"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <input className="submit-button" type="submit" value="ENTER" />
            </form>
          </div>
          <div className="sound-warning-container">
            <span
              className={
                this.state.flashing && this.props.musicPlaying
                  ? "sound-warning"
                  : "sound-warning-hidden"
              }
            >
              WARNING: SOUND ON
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
