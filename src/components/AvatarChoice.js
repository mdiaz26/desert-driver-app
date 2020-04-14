import React from 'react'
import '../Profile.css'

const AvatarChoice = (props) => {
    return (
        <div className={props.className}>
            <img 
                className="avatar"
                src={props.image} 
                alt={props.name} 
                name={props.name}
                onClickCapture={props.handleRadioChange}
            />
        </div>
    )
}

export default AvatarChoice