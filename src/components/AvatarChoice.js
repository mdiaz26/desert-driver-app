import React from 'react'

const AvatarChoice = (props) => {
    return (
        <div className="radio">
            <input type="radio" value={props.name} checked={props.isChecked(props.name)} onChange={props.handleRadioChange}/>
            <img src={props.image} alt={props.name}/>
        </div>
    )
}

export default AvatarChoice