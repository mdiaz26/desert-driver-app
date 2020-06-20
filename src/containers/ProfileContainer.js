import React from "react";
import JSONAPIAdapter from "../JSONAPIAdapter";
import { Redirect } from "react-router-dom";
import Profile from "../components/Profile";
import ProfileEdit from "../components/ProfileEdit";

// const adapter = new JSONAPIAdapter("https://desert-driver-api.herokuapp.com/api/v1/");
const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/');


class ProfileContainer extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
      id: "",
      avatar: {
        image: "",
      },
    },
    avatar: null,
    editMode: false,
  };

  componentDidMount() {
    adapter
      .getOne("users", this.props.match.params.id)
      .then((user) => this.setState({ user: user, avatar: user.avatar }));
  }

  findBestInAttribute = (attribute) => {
    if (this.props.scores.length && this.state.user.id) {
      const scores = [...this.props.scores];
      let userScores = scores.filter(
        (score) => score.user_number === this.state.user.id
      );
      if (userScores.length > 0) {
        userScores.sort((scoreA, scoreB) => scoreB[attribute] - scoreA.points);
        return userScores[0][attribute];
      } else if (userScores.length === 0) {
        return "no scores yet";
      }
    }
  };

  toggleEdit = () => {
    this.setState((prevState) => ({ editMode: !prevState.editMode }));
  };

  handleChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateAPI();
    this.toggleEdit();
    this.props.updateProfileLink(this.state.avatar);
  };

  updateAPI = () => {
    adapter
      .update("users", this.state.user.id, {
        username: this.state.user.username,
        password: this.state.user.password,
        avatar_id: this.state.avatar.id,
      })
      .then(this.props.appendUpdatedUser);
  };

  deleteAccount = () => {
    adapter.delete("users", this.state.user.id);
    this.props.signOut();
  };

  handleRadioChange = (event) => {
    let avatarObj = this.props.avatars.find(
      (avatar) => avatar.name === event.target.name
    );
    this.setState({ avatar: avatarObj });
  };

  render() {
    if (this.props.userId === "") {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {/* <button onClick={() => console.log(this.state)}>See State</button> */}
        {/* <h1>Profile</h1> */}
        {this.state.editMode ? (
          <>
            {/* <button onClick={this.toggleEdit}>Cancel</button> */}
            <ProfileEdit
              user={this.state.user}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              deleteAccount={this.deleteAccount}
              avatars={this.props.avatars}
              avatar={this.state.avatar}
              isChecked={this.isChecked}
              handleRadioChange={this.handleRadioChange}
              toggleEdit={this.toggleEdit}
            />
          </>
        ) : (
            <>
              <Profile
                user={this.state.user}
                avatar={this.state.avatar}
                findBestInAttribute={this.findBestInAttribute}
                toggleEdit={this.toggleEdit}
              />
              {/* <button onClick={this.toggleEdit}>Edit</button> */}
            </>
          )}
      </div>
    );
  }
}

export default ProfileContainer;
