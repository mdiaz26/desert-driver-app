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
    this.props.hideFooterMusic();
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
    document.querySelector(".input-field").focus();
  };

  render() {
    const redirectToGame = this.state.redirectToGame;
    if (redirectToGame) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="about-and-logo">
          <div className={this.props.showAbout ? "show-about" : "hide-about"}>
            <div className="about-box">
              <div className="scroll-box">
                <section id="about-section">
                  <p className="about-headings">ABOUT</p>
                  <p>
                    Welcome to Desert Driver. This is currently a web broswer
                    based single-player game. It was designed and created by
                    Luis Alejo & Michael Diaz. It was made using React, Ruby on
                    Rails, PostgreSQL, Javascript, HTML 5 Canvas, and CSS. The
                    code for this game is open source. Please feel free to use,
                    share, and/or contribute to the code. Enjoy!
                  </p>
                </section>
                <section id="instructions-section">
                  <p className="about-headings">HOW TO PLAY</p>
                  <ol>
                    <li>
                      To create an account go to the Sign-Up screen by clicking
                      'Sign-Up' on the upper-right hand corner.
                    </li>
                    <li>Choose a Driver to play with.</li>
                    <li>
                      Create a Username and Password. Confirm your password and
                      click 'Submit'.
                    </li>
                    <li>
                      Once logged in, click the 'Play' link on the navigation
                      bar at the top of the page.
                    </li>
                    <li>
                      This will lead you to the Stage Selection screen. Click
                      the stage you would like to play to initiate the game.
                    </li>
                    <li>Use your keyboard to play the game.</li>
                  </ol>
                </section>
                <section id="credits-section">
                  <p className="about-headings">CREDITS</p>
                  <span>Development Team:</span>
                  <ul>
                    <li>Luis Alejo</li>
                    <li>Michael Diaz</li>
                  </ul>
                  <span>Visual Inspiration</span>
                  <ul>
                    <li>Make An HTML 5 Canvas Motorcycle Game</li>
                  </ul>
                  <span>Music</span>
                  <p>
                    We do not own licenses for any of the Music or Sound Effects
                    sampled in this game. Please support the work of these
                    artists by following the links below:
                  </p>
                  <ul>
                    <li>"Still Rockin" by Pretty Lights</li>
                    <li>"They Don't Know" by 2Late</li>
                    <li>"Quatic" by Botany</li>
                    <li>"Vultures" by Chee</li>
                    <li>"Ecdysis" by Flume</li>
                    <li>"Vega" by il:lo</li>
                    <li>"Take Three" by Jerry Folk</li>
                    <li>"LA Melody" by Konx-Om-Pax</li>
                    <li>"Eternal Now" by LSDREAM and Champagne Drip</li>
                    <li>"Moro Cut" by Mad Zach and Yunis</li>
                    <li>"Noth" by Mad Zach and Yunis</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <div className="logo-container">
            <img
              alt="Login Gif"
              className="logo-background"
              src={Images.loginGif}
            />
            <img
              id={
                this.props.showAbout
                  ? "logo-about"
                  : this.state.entered
                  ? "logo"
                  : "large-logo"
              }
              src={Images.logo}
              alt="Desert Heat Logo"
            />
            <div
              className={
                this.state.entered
                  ? "home-screen-buttons-container-hidden"
                  : this.props.showAbout
                  ? "home-screen-buttons-container-hidden"
                  : "home-screen-buttons-container"
              }
            >
              <button onClick={this.enterSite} className="home-screen-buttons">
                SIGN IN
              </button>
            </div>
          </div>
        </div>

        <div className="login-screen">
          <div></div>
          <div
            className={
              this.state.entered && !this.state.showAbout
                ? "login-form"
                : "login-form-hidden"
            }
          >
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="USERNAME"
                  value={this.state.username}
                  name="username"
                  autoFocus="true"
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
