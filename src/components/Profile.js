import React from "react";
import "../styles/Profile.css";

const Profile = (props) => {
  return (
    <div className="user-profile">
      <div className="profile-div">
        <div className="parent-column">
          <p className="column">USERNAME</p>
          <span> {props.user.username.toUpperCase()}</span>
          <p className="column">HIGH SCORE</p>
          <span> {props.findBestInAttribute("points")}</span>
          <p className="column">MAX DISTANCE</p>
          <span>{props.findBestInAttribute("max_distance")}</span>
        </div>

        <div className="avatar-div">
          <img className="avatar" src={props.avatar.image} alt="avatar" />
          <button className="edit-btn" onClick={() => props.toggleEdit()}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
