// import { render } from 'react-dom'
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
// import useMeasure from '.useMeasure'
import {Spring} from 'react-spring/renderprops'
import '../EndGame.css'

const EndGame = (props) => {

  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  // console.log(fade)

  // componentDidMount(){
  //   this.props.saveScore()
  // }
  
  return (
    <div className="background">
      <div className="end-game-report">
        <div className="buttons">
          <button style={fade} onClick={() => props.restartGame()} className="btn1">PLAY AGAIN</button>
          <button onClick={() => props.backToGameMenu()} className="btn2">GAME MENU</button>
        </div>
        <section className="counters">
          <div className="container">
            <div>
              <h3 >Coins</h3>
              <Spring 
                from={{ number: 0 }}
                to={{ number: props.stats.coins }}>
                {props => <div className="counter">{(props.number).toFixed(0)}</div>}
              </Spring>
            </div>
            <div>
              <h3 >Max Distance</h3>
              <Spring 
                from={{ number: 0 }}
                to={{ number: props.stats.maxDistance }}>
                {props => <div className="counter">{(props.number).toFixed(0)}</div>}
              </Spring>
            </div>
            <div>
              <h3 >Timer</h3>
              <Spring 
                from={{ number: 0, 
                        color: 'red' }}
                to={{ number: props.stats.timer, 
                        color: 'green'  }}>
                {props => <div className="counter">{(props.number).toFixed(0)}</div>}
              </Spring>
            </div>
            <div>
              <h3 >Final Score</h3>
              <Spring 
                from={{ number: 0 }}
                to={{ number: props.stats.score }}>
                {props => <div className="counter">{(props.number).toFixed(0)}</div>}
              </Spring>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
  

}

export default EndGame