import React from 'react'
import Canvas from "../components/Canvas.js"
import GameMenu from "../components/GameMenu.js"
import {Redirect} from 'react-router-dom'

const GameContainer = (props) => {
    if (!props.user) {
        console.log(props)
        return <Redirect to="/login"/>
    } else if (props.user) {
        console.log(props.user)
        return (
            <div>
                {props.stage === "" ? 
                <GameMenu selectedStage={props.selectedStage}/>
                :
                <Canvas backToGameMenu={props.backToGameMenu} stage={props.stage} avatarImage={props.avatarImage}userId={props.userId} username={props.user.username} updateScores={props.updateScores}/>
                }
            </div>
        )
    }
}

export default GameContainer