import React from 'react'
import '../styles.scss'

const AvatarChoice = (props) => {
    return (
        <div className={`deg${props.number * 51}`}>
            <img 
                className={props.className}
                src={props.image} 
                alt={props.name} 
                name={props.name}
                onClickCapture={props.handleRadioChange}
            />
        </div>
    )
}

export default AvatarChoice