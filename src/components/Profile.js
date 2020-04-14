import React from 'react'
import '../Profile.css'

const Profile = (props) => {
    return(
        <div>
            <p>Username: {props.user.username}</p>
            <p>High Score: {props.findHighScore()}</p>
            <img className="avatar" src={props.avatar.image} alt="avatar"/>
        </div>
    )
}

export default Profile