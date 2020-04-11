import React, { Component } from 'react'
import '../GameStats.css'

class GameStats extends Component {
  render() {

    return (
      <div className="stats-container">
        <div className="stats-div">
          <div className="pause-button">
            
          </div>
          <div className="lives">
            <img className="current-player-image" src={this.props.stats.playerAvatar} />
            <h4 >X {this.props.stats.lives}</h4>
          </div>
          <div className="score">
            <h5>Score: {Math.round(this.props.stats.score)}</h5>
          </div>
          <div className="high-score">
            <h5>High Score: {this.props.stats.highScore}</h5>
          </div>
          <div className="distance">
            <h5>Distance: {(this.props.stats.distance).toFixed(2)}</h5>
          </div>
          <div className="timer">
            <h5>Timer: {(this.props.stats.timer)}</h5>
          </div>
        </div>
      </div>
    )
  }

}

export default GameStats