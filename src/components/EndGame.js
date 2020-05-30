import React, { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import { Spring } from "react-spring/renderprops";
import "../styles/EndGame.css";
import Sounds from "../asset-libraries/Sounds";

const EndGame = (props) => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  const [play, changePlay] = useState({ play: false });

  useEffect(() => {
    let gameOverSong = Sounds.losingSong;
    props.musicPlay(gameOverSong);
  }, []);

  return (
    <div className="background">
      <div onLoad={() => changePlay()} className="end-game-report">
        <div className="report-container">
          <div className="buttons">
            <button
              style={fade}
              onClick={() => props.restartGame()}
              className="btn1"
            >
              PLAY AGAIN
            </button>
            <button onClick={() => props.backToGameMenu()} className="btn2">
              GAME MENU
            </button>
          </div>
          <div className="counters">
            <div className="container">
              <div>
                <p className="stat-report-category">COINS</p>
                <Spring from={{ number: 0 }} to={{ number: props.stats.coins }}>
                  {(props) => (
                    <div className="counter">{props.number.toFixed(0)}</div>
                  )}
                </Spring>
              </div>
              <div>
                <p className="stat-report-category">MAX DISTANCE</p>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: props.stats.maxDistance }}
                >
                  {(props) => (
                    <div className="counter">{props.number.toFixed(0)}</div>
                  )}
                </Spring>
              </div>
              <div>
                <p className="stat-report-category">TIMER</p>
                <Spring
                  from={{ number: 0, color: "red" }}
                  to={{ number: props.stats.timer, color: "green" }}
                >
                  {(props) => (
                    <div className="counter">{props.number.toFixed(0)}</div>
                  )}
                </Spring>
              </div>
              <div>
                <p className="stat-report-category">FINAL SCORE</p>
                <Spring from={{ number: 0 }} to={{ number: props.stats.score }}>
                  {(props) => (
                    <div className="counter">{props.number.toFixed(0)}</div>
                  )}
                </Spring>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
