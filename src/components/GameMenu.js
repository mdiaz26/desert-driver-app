import React, { Component } from 'react'
import '../EndGame.css'

class EndGame extends Component {

  render() {
    return (
      <div className="game-menu-container">
        <div>
          <h3>GAME MENU</h3>
          <h4>Select a Character</h4>
          <div className="character-container">
            <div className="character-box">

            </div>
          </div>
          <h4>Select a Stage</h4>
          <div className="stage-container">
            <div className="stage-box">

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EndGame