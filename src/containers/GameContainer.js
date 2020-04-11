import React from 'react'
import Canvas from "../components/Canvas.js"

const GameContainer = (props) => {
    return (
        <div>
            <Canvas userId={props.userId}/>
        </div>
    )
}

export default GameContainer