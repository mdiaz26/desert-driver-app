import React from 'react'
import '../Avatar.css'

const Profile = (props) => {
    return(
        <div>
            <p>Username: {props.user.username}</p>
            <p>High Score: {props.findHighScore()}</p>
            <h2>Avatar:</h2>
            <img className="avatar" src={props.avatar.image} alt="avatar"/>
        </div>
    )
}

export default Profile