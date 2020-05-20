import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import JSONAPIAdapter from "./JSONAPIAdapter";
import { Nav, Login, SignUp, ProfileContainer } from "./components";
import { Switch, Route } from "react-router-dom";
import GameContainer from "./containers/GameContainer";
import Leaderboard from "./containers/Leaderboard";
import React from "react";
import heart from "./heart.png";

class App extends React.Component {
  state = {
    users: [],
    scores: [],
    avatars: [],
    userId: "",
    username: "",
    avatar: "",
    selectedStage: "",
  };

  componentDidMount() {
    const adapter = new JSONAPIAdapter(
      "https://desert-driver-api.herokuapp.com/api/v1/"
    );
    adapter.getAll("scores").then((scores) => this.setState({ scores }));

    adapter.getAll("users").then((users) => this.setState({ users }));

    adapter.getAll("avatars").then((avatars) => this.setState({ avatars }));
  }

  setUser = (userObj) => {
    this.setState({
      userId: userObj.id,
      username: userObj.username,
      avatar: userObj.avatar.image,
    });
  };

  signOut = () => {
    this.setState({ userId: "" });
  };

  updateScores = (scoreObj) => {
    this.setState((prevState) => ({ scores: [...prevState.scores, scoreObj] }));
  };

  appendNewUser = (userObj) => {
    this.setState((prevState) => ({ users: [...prevState.users, userObj] }));
    return userObj;
  };

  appendUpdatedUser = (userObj) => {
    let newUsersArray = this.state.users.map((user) => {
      if (user.id === userObj.id) {
        return userObj;
      } else {
        return user;
      }
    });
    this.setState({ users: newUsersArray });
  };

  updateProfileLink = (avatarObj) => {
    this.setState({ avatar: avatarObj.image });
  };

  selectedStageHandler = (event) => {
    this.setState({ selectedStage: event.target.alt });
  };
  backToGameMenu = (event) => {
    this.setState({ selectedStage: "" });
  };

  getAvatarById = (avatarId) => {
    return this.state.avatars.find((avatar) => avatar.id === avatarId);
  };

  render() {
    return (
      <div id="main-container">
        <div className="App text-white">
          <Nav
            userId={this.state.userId}
            avatar={this.state.avatar}
            signOut={this.signOut}
          />
          <Switch>
            <Route
              path="/login"
              render={() => (
                <Login users={this.state.users} setUser={this.setUser} />
              )}
            />
            <Route
              path="/signup"
              render={() => (
                <SignUp
                  users={this.state.users}
                  setUser={this.setUser}
                  appendNewUser={this.appendNewUser}
                  avatars={this.state.avatars}
                />
              )}
            />
            <Route
              path="/leaderboard"
              render={() => (
                <Leaderboard
                  scores={this.state.scores}
                  users={this.state.users}
                />
              )}
            />
            <Route
              path="/users/:id"
              render={(routerProps) => (
                <ProfileContainer
                  {...routerProps}
                  scores={this.state.scores}
                  avatars={this.state.avatars}
                  userId={this.state.userId}
                  appendUpdatedUser={this.appendUpdatedUser}
                  updateProfileLink={this.updateProfileLink}
                  signOut={this.signOut}
                />
              )}
            />
            <Route
              path="/"
              render={() => (
                <GameContainer
                  userId={this.state.userId}
                  username={this.state.username}
                  avatarImage={this.state.avatar}
                  updateScores={this.updateScores}
                  selectedStage={this.selectedStageHandler}
                  stage={this.state.selectedStage}
                  backToGameMenu={this.backToGameMenu}
                />
              )}
            />
          </Switch>
        </div>
        <div>
          <p className="signature">
            March 2020 | Made with <img class="heart" src={heart} /> by{" "}
            <a
              className="signature-links"
              target="_blank"
              href="https://www.linkedin.com/in/alejoluis/"
            >
              LUIS ALEJO
            </a>{" "}
            &{" "}
            <a
              className="signature-links"
              target="_blank"
              href="https://www.linkedin.com/in/mikediaz006/"
            >
              MICHAEL DIAZ
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
