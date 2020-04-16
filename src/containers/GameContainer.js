import React from 'react'
import Canvas from "../components/Canvas.js"
import GameMenu from "../components/GameMenu.js"

const GameContainer = (props) => {
    return (
        <div>
            <GameMenu />
            <Canvas avatarImage={props.avatarImage}userId={props.userId} username={props.username} updateScores={props.updateScores}/>
        </div>
    )
}

export default GameContainer