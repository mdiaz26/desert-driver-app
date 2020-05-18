import React, { Component } from "react";
import "../styles/GameMenu.css";
import desertGIF from "../desert-snippet.gif";
import desertStill from "../desert-screenshot.jpg";
import nightGIF from "../night-snippet.gif";
import nightStill from "../night-screenshot.jpg";

class EndGame extends Component {
  state = {
    desertHover: false,
    nightHover: false,
  };
  switchToGif = (event) => {
    if (event.target.alt === "Desert Heat Stage") {
      this.setState((state) => ({
        desertHover: !state.desertHover,
      }));
    } else if (event.target.alt === "Night Sky Stage") {
      this.setState((state) => ({
        nightHover: !state.nightHover,
      }));
    }
  };
  render() {
    return (
      <div className="game-menu-container">
        <div>
          <p className="game-menu-header">SELECT A STAGE</p>
          <div className="stage-container">
            <div className="stage-box">
              <div className="desert-heat" alt="Desert Heat Stage">
                <p className="stage-title" alt="Desert Heat Stage">
                  DESERT HEAT
                </p>
                <img
                  onMouseEnter={(event) => this.switchToGif(event)}
                  onMouseLeave={(event) => this.switchToGif(event)}
                  onClick={(event) => this.props.selectedStage(event)}
                  className="desert-heat-img"
                  src={this.state.desertHover ? desertGIF : desertStill}
                  alt="Desert Heat Stage"
                />
                <div className="title-container"></div>
              </div>
              <div className="night-sky" alt="Night Sky Stage">
                <p className="stage-title" alt="Night Sky Stage">
                  NIGHT SKY
                </p>
                <img
                  onMouseEnter={(event) => this.switchToGif(event)}
                  onMouseLeave={(event) => this.switchToGif(event)}
                  onClick={(event) => this.props.selectedStage(event)}
                  className="night-sky-img"
                  src={this.state.nightHover ? nightGIF : nightStill}
                  alt="Night Sky Stage"
                />
                <div className="title-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EndGame;
