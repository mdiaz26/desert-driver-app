import React, { Component } from "react";
import Images from "../asset-libraries/Images";
import "../styles/GameStats.css";

class GameStats extends Component {
  state = {
    showInstructions: false,
    showStopButton: false,
    musicMuted: false,
    gameSoundMuted: false,
    hoverPower: false,
    powerOff: !this.props.musicPlaying && !this.props.gameSound,
  };

  currentVolume = this.props.deckBVolume;
  previousVolume = 0;

  currentGameVolume = this.props.gameVolume;
  previousGameVolume = 0;
  muted = false;

  gameVolumeAndControls = () => {
    return (
      <div className="game-sound-controls">
        <div
          className={
            this.state.powerOff
              ? "speakers-off-container"
              : this.state.gameSoundMuted
              ? "speaker-container-disabled game-volume"
              : "speaker-container game-volume"
          }
          onClick={
            this.props.gameSound ? (event) => this.toggleMuted(event) : null
          }
        >
          <img
            src={Images.speaker}
            alt="Game Sound Speaker"
            className={
              this.state.powerOff
                ? "speakers-off"
                : this.state.gameSoundMuted
                ? "speaker-disabled game-volume"
                : "speaker game-volume"
            }
          />
          <img
            alt="Game Sound Speaker Glow"
            src={Images.speaker}
            className={
              this.state.powerOff
                ? "speakers-off"
                : this.state.gameSoundMuted
                ? "speaker-disabled game-volume"
                : "speaker-glow game-volume"
            }
          />
        </div>
        <div className="volume-input-container">
          <p className="volume-type">GAME VOLUME</p>
          <input
            type="range"
            min="0.0"
            max="1"
            disabled={!this.props.musicPlaying}
            step="0.001"
            defaultValue={this.props.gameVolume}
            id={
              this.props.musicPlaying && this.props.gameSound
                ? "game-sound-volume"
                : "game-sound-volume-disabled"
            }
            className="game-volume"
            onInput={(event) => this.volumeHandler(event)}
            onChange={(event) => this.volumeHandler(event)}
          />
        </div>
        <div
          alt="Power Button"
          onClick={this.togglePower}
          className={
            this.state.powerOff ? "power-button-off" : "power-button-on"
          }
        >
          <p className={this.state.powerOff ? "power-off" : "power-on"}>
            {this.state.powerOff ? "OFF" : "ON"}
          </p>
        </div>
      </div>
    );
  };

  songVolumeAndControls = () => {
    return (
      <div className="song-controls">
        <div
          className={
            this.state.powerOff
              ? "speakers-off-container"
              : this.state.musicMuted
              ? "speaker-container-disabled music-volume"
              : "speaker-container music-volume"
          }
          onClick={
            this.props.musicPlaying ? (event) => this.toggleMuted(event) : null
          }
        >
          <img
            src={Images.speaker}
            alt="Music Volume"
            className={
              this.state.powerOff
                ? "speakers-off"
                : this.state.musicMuted
                ? "speaker-disabled music-volume"
                : "speaker music-volume"
            }
          />
          <img
            src={Images.speaker}
            alt="Music Volume"
            className={
              this.state.powerOff
                ? "speakers-off"
                : this.state.musicMuted
                ? "speaker-disabled music-volume"
                : "speaker-glow music-volume"
            }
          />
        </div>
        <div className="volume-input-container">
          <p className="volume-type">MUSIC VOLUME</p>
          <input
            type="range"
            min="0.0"
            max="1"
            disabled={!this.props.musicPlaying}
            step="0.001"
            defaultValue={this.props.musicVolume}
            id={
              this.props.musicPlaying
                ? "bg-music-volume"
                : "bg-music-volume-disabled"
            }
            className={"music-volume"}
            onInput={(event) => this.volumeHandler(event)}
            onChange={(event) => this.volumeHandler(event)}
          />
        </div>
        <div className="next-song-container">
          <div
            onClick={this.props.musicPlaying ? this.nextSong : null}
            className={
              this.props.musicPlaying ? "next-song" : "next-song-disabled"
            }
          >
            <img
              src={Images.nextSong}
              alt="Next Song"
              className={
                this.state.powerOff ? "next-power-off" : "next-power-on"
              }
            />
            <img
              src={Images.nextSong}
              alt="Next Song"
              className={
                this.state.powerOff ? "next-power-off" : "next-power-on-glow"
              }
            />
          </div>
        </div>
      </div>
    );
  };

  audioHeader = () => {
    return (
      <div className="audio-header">
        <div className="radio-title-container">
          <span
            className={this.state.powerOff ? "radio-title-off" : "radio-title"}
          >
            DESERT RADIO
          </span>
        </div>
        <div className="artist-and-title-container">
          <div>
            <span
              className={
                this.state.powerOff ? "now-playing-off" : "now-playing"
              }
            >
              {"NOW PLAYING"}
            </span>
            <br />
            <span className={this.state.powerOff ? "title-off" : "title"}>
              {this.props.songInfo.split(" by ")[0]}
            </span>
            <br />
            <span className={this.state.powerOff ? "artist-off" : "artist"}>
              {"by " + this.props.songInfo.split(" by ")[1]}
            </span>
          </div>
        </div>
      </div>
    );
  };

  playerProfileAndLives = () => {
    return (
      <div className="profile-and-lives">
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
    );
  };

  instructionsContainer = () => {
    return (
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
          <img
            src={Images.up}
            className="instructions-photo-up"
            alt="Up Arrow"
          />{" "}
          TO DRIVE {" AND "}{" "}
          <img
            src={Images.down}
            className="instructions-photo-up"
            alt="Down Arrow"
          />{" "}
          TO REVERSE
        </p>
        <p className="instructions-entry">
          <img
            src={Images.left}
            className="instructions-photo-left"
            alt="Left Arrow"
          />{" "}
          {" OR "}
          <img
            src={Images.right}
            alt="Right Arrow"
            className="instructions-photo-right"
          />
          TO SWING THE ROTATION
        </p>
        <p className="instructions-entry">
          <img
            src={Images.spaceBar}
            alt="Space-Bar"
            className="instructions-photo-space"
          />{" "}
          {"  "}
          TO {this.props.stats.pauseGame ? "RESUME" : "PAUSE"} THE GAME
        </p>
      </div>
    );
  };

  keypadAndInstructions = () => {
    return (
      <div className="keypad-container">
        <div className="arrow-box-top">
          <img
            src={Images.up}
            alt="Up Arrow"
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
            src={Images.left}
            alt="Left Arrow"
            className={this.props.stats.ArrowLeft ? "light-up" : "dim"}
          />
          <img
            src={Images.down}
            alt="Down Arrow"
            className={this.props.stats.ArrowDown ? "light-up" : "dim"}
          />
          <img
            src={Images.right}
            alt="Right Arrow"
            className={this.props.stats.ArrowRight ? "light-up" : "dim"}
          />
        </div>
        {this.instructionsContainer()}
      </div>
    );
  };

  statBox = () => {
    return (
      <div className="stat-box">
        <div className="stats-top">
          <div className="stat">
            <p className="stat-cat">TIMER</p>
            <p className="stat-value">{this.props.stats.timer}</p>
          </div>
          <div className="stat">
            <p className="stat-cat">COINS</p>
            <p className="stat-value">{this.props.stats.coins}</p>
          </div>
          <div className="stat">
            <p className="stat-cat">FLIPS</p>
            <p className="stat-value">{this.props.stats.flipCount}</p>
          </div>
          <div className="stat">
            <p className="stat-cat">BEST FLIP</p>
            <p className="stat-value">
              {this.props.stats.bestFlip}°{" "}
              <span className="best-flip-count">
                x{this.props.stats.bestFlipCount}
              </span>
            </p>
          </div>
        </div>
        <div className="stats-bottom">
          <div className="stat">
            <p className="stat-cat">CURRENT DISTANCE</p>
            <p className="stat-value">
              {this.props.stats.currentDistance.toFixed(2)}
            </p>
          </div>
          <div className="stat">
            <p className="stat-cat">MAX DISTANCE</p>
            <p className="stat-value">
              {this.props.stats.maxDistance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
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

  showStopButton = () => {
    this.setState((state) => ({
      showStopButton: !state.showStopButton,
    }));
  };

  volumeHandler = (event) => {
    if (event.target.className.includes("music-volume")) {
      this.currentVolume = event.target.value;
      if (event.target.value < 0.005) {
        this.setState({ musicMuted: true });
      } else if (event.target.value > 0.005) {
        this.setState({ musicMuted: false });
      }
      this.props.setMusicVolume(event.target.value);
    } else if (event.target.className.includes("game-volume")) {
      this.currentGameVolume = event.target.value;
      if (event.target.value < 0.005) {
        this.setState({ gameSoundMuted: true });
      } else if (event.target.value > 0.005) {
        this.setState({ gameSoundMuted: false });
      }
      this.props.setGameVolume(event.target.value);
    }

    if (
      event.target.id === "bg-music-volume" ||
      event.target.id === "game-sound-volume"
    ) {
      event.target.blur();
    }
  };

  activate = () => {
    this.setState((state) => ({
      active: !state.active,
    }));
  };
  hoverPower = () => {
    this.setState((state) => ({
      hoverPower: !state.hoverPower,
    }));
  };

  togglePower = () => {
    this.setState((state) => ({
      powerOff: !state.powerOff,
    }));
    this.toggleAllSounds();
  };

  toggleMuted = (event) => {
    let input;
    if (event.target.className.includes("music-volume")) {
      input = document.getElementById("bg-music-volume");
      if (input.value > 0) {
        this.previousVolume = input.value;
        input.value = 0;
      } else {
        input.value = this.previousVolume;
      }
      this.setState((state) => ({
        musicMuted: !state.musicMuted,
      }));
    } else if (event.target.className.includes("game-volume")) {
      input = document.getElementById("game-sound-volume");

      if (input.value > 0) {
        this.previousGameVolume = input.value;
        input.value = 0;
      } else {
        input.value = this.previousGameVolume;
      }
      this.setState((state) => ({
        gameSoundMuted: !state.gameSoundMuted,
      }));
    }

    let volumeObj = {
      target: {
        className: event.target.className,
        value: input.value,
        alt: event.target.alt,
      },
    };
    this.volumeHandler(volumeObj);
  };

  nextSong = () => {
    this.props.nextSong();
  };

  toggleAllSounds = () => {
    this.props.toggleAllSounds();
  };

  render() {
    return (
      <div className="outer-container">
        <div className="stats-container">
          <div className="player-lives-and-keypad-container">
            {this.playerProfileAndLives()}
            {this.keypadAndInstructions()}
          </div>

          <div className="audio-container">
            {this.audioHeader()}

            <div className="volume-and-controls">
              {this.songVolumeAndControls()}
              {this.gameVolumeAndControls()}
            </div>
          </div>

          {this.statBox()}
        </div>
      </div>
    );
  }
}

export default GameStats;
