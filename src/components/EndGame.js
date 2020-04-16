import React, { Component } from 'react'
import '../EndGame.css'

class EndGame extends Component {

  componentDidMount(){
    this.props.saveScore()
  }

  render() {
    return (
      <div className="background">
        <div className="end-game-report">
          <div>
            <button onClick={() => this.props.restartGame()} className="buttons">PLAY AGAIN</button>
            <button onClick={() => this.props.backToGameMenu()} className="buttons">GAME MENU</button>
          </div>
          <section className="counters">
            <div className="container">
              <div>
                <h3>Coins</h3>
                <div className="counter" >{this.props.stats.coins}</div>
              </div>
              <div>
                <h3>Max Distance</h3>
                <div className="counter" >{(this.props.stats.maxDistance).toFixed(2)}</div>
              </div>
              <div>
                <h3>Timer</h3>
                <div className="counter" >{this.props.stats.timer}</div>
              </div>
              <div>
                <h3>Final Score</h3>
                <div className="counter" >{this.props.stats.score}</div>
              </div>
            </div>
          </section>

          {/* <span className="box one"></span>
          <span className="box two"></span>
          <span className="box three"></span> */}
          
          {/* <h3>(Coins x Distance) - Time Used</h3>
          <h3>{this.props.stats.coins} x {(this.props.stats.distance).toFixed(2)} - {this.props.stats.timer}</h3>
          <h1 className="total-score">FINAL SCORE: {this.props.stats.score}</h1> */}
          
        </div>
      </div>
    )
  }

}

export default EndGame