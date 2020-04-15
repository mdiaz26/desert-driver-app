import React from 'react'
// import '../Avatar.css'
import '../styles.scss'

const AvatarChoice = (props) => {
    return (
        <div className={`deg${props.number * 51}`}>
        {/* <div className={props.className}> */}
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