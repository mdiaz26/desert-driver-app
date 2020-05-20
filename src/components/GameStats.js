import React, { Component } from "react";
import up from "../arrowUp.png";
import down from "../arrowDown.png";
import right from "../arrowRight.png";
import left from "../arrowLeft.png";
import "../styles/GameStats.css";

class GameStats extends Component {
  state = {
    showInstructions: false,
  };
  capitalize(name) {
    let capitalized = name.split("");
    capitalized[0] = capitalized[0].toUpperCase();
    name = capitalized.join("");
    return name;
  }

  showInstructions = () => {
    this.setState((state) => ({
      showInstructions: !state.showInstructions,
    }));
  };

  render() {
    return (
      <div className="outer-container">
        <div className="stats-container">
          <div className="lives-and-pad-container">
            <div className="lives">
              <img
                className="current-player-image"
                src={this.props.stats.playerAvatar}
                alt={this.props.stats.playerName}
              />
              <div className="name-and-lives">
                <p className="player-name">
                  {this.props.stats.playerName
                    ? this.props.stats.playerName.toUpperCase()
                    : "..."}
                </p>
                <p className="player-lives">x {this.props.stats.lives}</p>
              </div>
            </div>
            <div className="keypad-container">
              <div className="arrow-box-top">
                <img
                  src={up}
                  onMouseEnter={this.showInstructions}
                  onMouseLeave={this.showInstructions}
                  className={this.props.stats.ArrowUp ? "light-up" : "dim"}
                />
              </div>
              <div
                className="arrow-box-bottom"
                onMouseEnter={this.showInstructions}
                onMouseLeave={this.showInstructions}
              >
                <img
                  src={left}
                  className={this.props.stats.ArrowLeft ? "light-up" : "dim"}
                />
                <img
                  src={down}
                  className={this.props.stats.ArrowDown ? "light-up" : "dim"}
                />
                <img
                  src={right}
                  className={this.props.stats.ArrowRight ? "light-up" : "dim"}
                />
              </div>
              <div
                className={
                  this.state.showInstructions
                    ? "instructions-container"
                    : "hide-instructions"
                }
              >
                <p className="instructions">INSTRUCTIONS</p>
                <p className="instructions-entry">USE YOUR KEYBOARD TO PLAY</p>
                <p className="instructions-entry">
                  <img src={up} className="instructions-photo-up" /> TO DRIVE{" "}
                  {" AND "} <img src={down} className="instructions-photo-up" />{" "}
                  TO REVERSE
                </p>
                <p className="instructions-entry">
                  <img src={left} className="instructions-photo-left" />{" "}
                  {" OR "}
                  <img src={right} className="instructions-photo-right" />
                  TO NUDGE BACK / FORWARD
                </p>
              </div>
            </div>
          </div>

          <div className="stats-div">
            <div className="stat">
              <p className="stat-cat">TIMER</p>
              <h4>{this.props.stats.timer}</h4>
            </div>
            <div className="stat">
              <p className="stat-cat">COINS</p>
              <h4>{this.props.stats.coins}</h4>
            </div>
            <div className="stat">
              <p className="stat-cat">CURRENT DISTANCE</p>
              <h4>{this.props.stats.currentDistance.toFixed(2)}</h4>
            </div>

            <div className="stat">
              <p className="stat-cat">MAX DISTANCE</p>
              <h4>{this.props.stats.maxDistance.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameStats;
