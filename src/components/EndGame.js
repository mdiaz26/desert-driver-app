import React, { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import { Spring } from "react-spring/renderprops";
import "../styles/EndGame.css";
import Sounds from "../asset-libraries/Sounds";

const EndGame = (props) => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  useEffect(() => {
    let gameOverSong = Sounds.losingSong;
    props.musicPlay(gameOverSong);
  }, []);

  return (
    <div className="background">
      <div className="end-game-report">
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
                    <div className="counter">
                      {props.number.toFixed(0)}{" "}
                      <span className="operation">+</span>{" "}
                    </div>
                  )}
                </Spring>
              </div>
              <div>
                <p className="stat-report-category">FLIPS</p>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: props.stats.flipCount }}
                >
                  {(props) => (
                    <div className="counter">
                      {props.number.toFixed(0)}{" "}
                      <span className="operation">x</span>{" "}
                    </div>
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
                    <div className="counter">
                      {props.number.toFixed(0)}
                      <span className="operation">-</span>{" "}
                    </div>
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
                    <div className="counter">
                      {props.number.toFixed(0)}{" "}
                      <span className="operation">+</span>{" "}
                    </div>
                  )}
                </Spring>
              </div>
              <div>
                <p className="stat-report-category">BEST FLIP</p>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: props.stats.bestFlip }}
                >
                  {(props) => (
                    <div className="counter">{props.number.toFixed(0)}</div>
                  )}
                </Spring>
              </div>
            </div>
          </div>
          <div>
            <p className="final-score-category">FINAL SCORE</p>
            <Spring from={{ number: 0 }} to={{ number: props.stats.score }}>
              {(props) => (
                <div className="final-score-counter">
                  {props.number.toFixed(0)}
                </div>
              )}
            </Spring>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
