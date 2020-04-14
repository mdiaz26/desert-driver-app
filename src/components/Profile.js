import React from 'react'

const Profile = (props) => {
    return(
        <div>
            <p>Username: {props.user.username}</p>
            <p>High Score: {props.findHighScore()}</p>
            <img src={props.user.avatar.image} alt="avatar"/>

        </div>
    )
}

export default Profile