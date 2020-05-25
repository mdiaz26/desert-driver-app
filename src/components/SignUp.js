import React from "react";
import { Redirect } from "react-router-dom";
import JSONAPIAdapter from "../JSONAPIAdapter";
import AvatarChoice from "./AvatarChoice";
import "../styles/styles.scss";
import "../styles/SignUp.css";
import background from "../sign-up-background2.gif";
import moon from "../moon.png";
import logo from "../desert-driver-logo6.png";
import OnImagesLoaded from "react-on-images-loaded";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    selectedAvatar: "Billy Billions",
    redirectToGame: false,
    showImages: false,
  };

  componentDidMount(){
    console.log("the component has mounted")
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createUser = () => {
    const adapter = new JSONAPIAdapter("https://desert-driver-api.herokuapp.com/api/v1/");
    adapter
      .post("users", {
        user: {
          username: this.state.username,
          password: this.state.password,
          avatar_id: this.getAvatarId(this.state.selectedAvatar),
        },
      })
      .then(this.props.appendNewUser)
      .then((userObj) => this.props.setUser(userObj));
  };

  removeSpaces = (string) => {
    return string.replace(/\s+/g, "");
  };

  getAvatarId = (name) => {
    let avatarObj = this.props.avatars.find((avatar) => avatar.name === name);
    return avatarObj.id;
  };

  isChecked = (name) => {
    return this.state.selectedAvatar === name;
  };

  handleRadioChange = (event) => {
    event.persist();
    this.setState({ selectedAvatar: event.target.name });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Password and confirm password do not match. Please try again");
      this.setState({
        password: "",
        confirmPassword: "",
      });
    } else if (
      this.props.users.filter((user) => user.username === this.state.username)
        .length > 0
    ) {
      alert(
        "This user already exists. Try changing your username or logging in"
      );
      this.setState({
        password: "",
        confirmPassword: "",
      });
    } else if (
      !this.removeSpaces(this.state.username) ||
      !this.removeSpaces(this.state.password) ||
      !this.removeSpaces(this.state.confirmPassword)
    ) {
      alert("no blank spaces please");
      this.setState({
        password: "",
        confirmPassword: "",
      });
    } else {
      this.createUser();
      this.setState({
        username: "",
        password: "",
        confirmPassword: "",
      });
      this.redirect();
    }
  };

  redirect = () => {
    this.setState({
      redirectToGame: true,
    });
  };
  handleSelection = () => {
    let selection = this.props.avatars.filter(
      (avatar) => avatar.name === this.state.selectedAvatar
    );
    let obj = selection[0];
    let image;
    for (let key in obj) {
      if (key === "image") image = obj[key];
    }
    return image;
  };

  render() {
    const redirectToGame = this.state.redirectToGame;

    if (redirectToGame) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="sign-up-screen">
          <div className="logo-container">
            <img id="sign-up-logo" alt="game logo" src={logo} />
            <img className="sign-up-background" alt="background" src={background} />
          </div>
          <br />
          <div className="sign-up-form">
            <p className="choose-your-ride">CHOOSE YOUR RIDE</p>
            {/* <> */}
            {this.props.avatars.length === 7 && <OnImagesLoaded
              onLoaded={() => this.setState({showImages: true})}
              onTimeout={() => this.setState({showImages: true})}
              timeout={7000}
            >
            <div className="avatar-frame">
              {this.props.avatars.map((avatar, index) => (
                <AvatarChoice
                  key={avatar.id}
                  {...avatar}
                  number={index + 1}
                  handleRadioChange={this.handleRadioChange}
                  className={
                    this.state.selectedAvatar === avatar.name
                      ? "gold-border"
                      : "none"
                  }
                  opacity={ this.state.showImages ? 1 : 0 }
                />
                ))}
  
              <div className="inner-circle"> 
                <img
                  id="fill-this-image"
                  src={this.handleSelection()}
                  alt={this.handleSelection()}
                  style={{ opacity: this.state.showImages ? 1 : 0}}
                  />
              </div>
              { !this.state.showImages && <div 
                className="loader"
                style={{ opacity: this.state.showImages ? 0 : 1 }}
              ></div>}
            </div>
            </OnImagesLoaded>}
    
            {/* <br />
            <br /> */}
  
            {/* <p>Sign Up Form</p> */}
            <form className="form" onSubmit={this.handleSubmit}>
              <label>
                <input
                  className="input-field"
                  placeholder="Username"
                  type="text"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className="input-field"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className="input-field"
                  placeholder="Confirm Password"
                  type="password"
                  value={this.state.confirmPassword}
                  name="confirmPassword"
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <input className="submit-btn" type="submit" value="START GAME" />
            </form>
            {/* </> */}
            <div className="moon-container">
              <img className="moon" alt="giant-moon" src={moon} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SignUp;
