import React from 'react'
import Canvas from "../components/Canvas.js"
// import GameMenu from "../components/GameMenu.js"

const GameContainer = (props) => {
    return (
        <div>
            {props.stage === "" ? 
            <GameMenu selectedStage={props.selectedStage}/>
            :
            <Canvas backToGameMenu={props.backToGameMenu} stage={props.stage} avatarImage={props.avatarImage}userId={props.userId} username={props.username} updateScores={props.updateScores}/>
            }
        </div>
    )
}

export default GameContainer