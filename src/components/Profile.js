import React, { useState } from "react";
import "../styles/Profile.css";
import OnImagesLoaded from "react-on-images-loaded";

const Profile = (props) => {
  const [showImagesState, changeShowImagesState] = useState({ showImages: false });

  return (
    <OnImagesLoaded onLoaded={() => changeShowImagesState({showImages: true})}>
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
            {console.log(showImagesState.showImages)}
            {props.avatar ? 
              <img 
              className="avatar" 
              src={props.avatar.image} 
              // src={"/Avatars/bad-santa.png"} 
              alt="avatar" 
              onLoad={() => console.log("image has loaded")}
              />
              :
              <div 
                className="loader"
                // style={{ opacity: this.state.showImages ? 0 : 1 }}
              >
                {console.log("image has not loaded")}
                LOADING</div>  
            }
            <button className="edit-btn" onClick={() => props.toggleEdit()}>
              EDIT
            </button>
          </div>
      </div>
    </div>
        </OnImagesLoaded>
  );
};

export default Profile;
