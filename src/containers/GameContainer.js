import React from 'react'
import Canvas from "../components/Canvas.js"

const GameContainer = (props) => {
    return (
        <div>
            <Canvas userId={props.userId} username={props.username} updateScores={props.updateScores}/>
        </div>
    )
}

export default GameContainer