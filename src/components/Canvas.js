import JSONAPIAdapter from "../JSONAPIAdapter";
import React, { Component } from "react";
import DesertHeat from "../stages/DesertHeat";
import NightSky from "../stages/NightSky";
import Player from "../stages/Player";
import Coin from "../stages/Coin";
import GameStats from "./GameStats";
import EndGame from "./EndGame";
import Ground from "../helpers/Ground";
import Sounds from "../asset-libraries/Sounds";
import "../styles/Canvas.css";

class Canvas extends Component {
  state = {
    stage: this.props.stage,
    gameOn: true,
    playerName: null,
    playerAvatar: null,
    logo: this.props.logo,
    lives: 3,
    coins: 0,
    score: 0,
    timer: 0,
    distance: 0,
    countDown: 3,
    millisecond: 0,
    maxDistance: 0,
    currentDistance: 0,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    pauseGame: false,
    flipCount: 0,
    bestFlip: 0,
  };

  canvas = React.createRef();
  coins = this.createCoins();
  palmTreePositions = this.createPalmTreePositions();
  interval = null;
  miniInterval = null;
  animationID = null;
  countDown = null;

  componentDidMount() {
    this.game();
    this.props.coinAudio();
    setTimeout(() => {
      this.startTimers();
    }, 3000);
    this.countDown = setInterval(() => {
      this.setState((prevState) => ({ countDown: prevState.countDown - 1 }));
    }, 1000);
    let song =
      Sounds.bgMusic[Math.floor(Math.random() * Sounds.bgMusic.length)];
    setTimeout(() => {
      this.props.musicPlaying && this.props.musicPlay(song);
    }, 3000);
    this.props.countdownAudio();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.miniInterval);
    cancelAnimationFrame(this.animationID);
    this.props.selectedStage(null);
    this.props.switchFromGameScreen()
    // this.props.bgMusic && this.props.musicFadeOut();
    // setTimeout(() => this.props.startThemeSong(), 1001);
  }

  restartGame = () => {
    clearInterval(this.miniInterval);
    this.coins = this.createCoins();
    if (this.props.bgMusic) {
      clearInterval(this.props.fadeOut);
    }
    this.setState(
      {
        lives: 3,
        coins: 0,
        score: 0,
        timer: 0,
        gameOn: true,
        distance: 0,
        countDown: 3,
        millisecond: 0,
        maxDistance: 0,
        currentDistance: 0,
        flipCount: 0,
        bestFlip: 0,
      },
      this.componentDidMount()
    );
  };

  startTimers = () => {
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer + 1 })),
      1000
    );
    clearInterval(this.miniInterval);
    this.miniInterval = setInterval(
      () =>
        this.setState((prevState) => ({
          millisecond: prevState.millisecond + 1,
        })),
      1
    );
  };

  setProfile = () => {
    this.setState({
      playerName: this.props.username,
      playerAvatar: this.props.avatarImage,
    });
  };

  gainDistance = (speed) => {
    this.setState((prevState) => ({
      distance: prevState.distance + speed / 50,
      currentDistance: prevState.currentDistance + speed / 50,
      score: prevState.score + (prevState.distance / 1000) * speed,
    }));
    if (this.state.maxDistance < this.state.currentDistance) {
      this.setState({ maxDistance: this.state.currentDistance });
    }
  };

  createCoins() {
    const positions = Array.from(
      { length: 2000 },
      () => Math.random() * 500000
    );

    return positions.map((position) => {
      let coin = new Coin();
      coin.position = position;
      return coin;
    });
  }

  createPalmTreePositions() {
    let positions = Array.from({ length: 80 }, () => Math.random() * 1000);
    return positions;
  }

  saveScore = () => {
    const adapter = new JSONAPIAdapter(
      "https://desert-driver-api.herokuapp.com/api/v1/"
    );
    const body = {
      points: this.state.coins * this.state.maxDistance - this.state.timer,
      max_distance: parseInt(this.state.maxDistance),
      user_number: this.props.userId,
      username: this.props.username,
    };
    adapter.post("scores", body).then(this.props.updateScores);
  };

  game = () => {
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    const ground = new Ground();
    const player = new Player(canvas, this.props.avatarImage);
    const k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };
    let lastLostLife = false;
    let isRunning = false;
    let lifeOver = false;
    let playing = true;
    let speed = 0;
    let t = 0;
    let flipping = false;
    let flipCount = 0;
    let flipDirection;

    this.setState({ gameOn: true });
    this.setProfile();

    const loseLives = () => {
      this.setState((prevState) => ({
        lives: prevState.lives - 1,
        currentDistance: 0,
      }));
      lifeOver = true;
      this.game();
      return;
    };
    const lastLife = () => {
      if (lastLostLife === false) {
        lastLostLife = true;
        this.props.musicFadeOut();
        this.saveScore();
        return;
      }
    };

    this.draw = function () {
      let p1 = canvas.height - ground.getY(t + player.x) * 0.25;
      let p2 = canvas.height - ground.getY(t + 5 + player.x) * 0.25;

      let grounded = 0;
      if (p1 - 15 > player.y) {
        player.ySpeed += 0.1;
      } else {
        player.ySpeed -= player.y - (p1 - 15);
        player.y = p1 - 15;
        grounded = 1;
      }

      //LOSING CONDITION
      if (player.rot < -2 && grounded) {
        if (this.state.lives > 1) {
          loseLives();
        } else {
          lastLife();
          clearInterval(this.interval);
          let totalScore =
            this.state.coins * this.state.maxDistance - this.state.timer;
          this.setState({
            lives: 0,
            gameOn: false,
            score: totalScore.toFixed(2),
          });
          lifeOver = true;
        }
      }

      //FLIP TRIGGER
      if (!grounded && playing) {
        if (Math.abs(player.rot) > 3.1) {
          flipDirection = player.rot;
          flipping = true;
        }
        if (flipping && Math.round(Math.abs(player.rot)) === 0) {
          this.setState((state) => ({ flipCount: state.flipCount + 1 }));
          flipCount += 1;
          flipDirection = 0;
          flipping = false;
        }
      }
      if (!flipping && grounded) {
        if (this.state.bestFlip < flipCount * 360) {
          this.setState({ bestFlip: flipCount * 360 });
        }
        flipCount = 0;
      }

      if (!playing || (grounded && Math.abs(player.rot) > Math.PI * 0.5)) {
        playing = false;
        player.rSpeed = 5;
        k.ArrowUp = 1;
        player.x -= speed * 5;
      }

      //AVATAR ADJUST TO ENVIRONMENT
      let angle = Math.atan2(p2 - 15 - player.y, player.x + 5 - player.x);
      player.y += player.ySpeed;

      if (grounded && playing) {
        player.rot -= (player.rot - angle) * 0.5;
        player.rSpeed = player.rSpeed - (angle - player.rot);
      }

      //LEFT & RIGHT KEY SETTINGS
      player.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.08;
      player.rot -= player.rSpeed * 0.1;
      if (player.rot > Math.PI) player.rot = -Math.PI;
      if (player.rot < -Math.PI) player.rot = Math.PI;
      context.save();
      context.translate(player.x, player.y);
      context.rotate(player.rot);

      //AVATAR SIZE AND SCREEN POSITION
      context.drawImage(player.movingImage, -19, -19, 40, 32);
      context.restore();
    };

    //LOOP
    const loop = () => {
      if (lifeOver && this.state.lives > 0) {
        return;
      }
      if (this.state.millisecond > 0) {
        clearInterval(this.countDown);
        speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.007;
      }
      t += 7 * speed;
      if (speed.toFixed(2) > 0.05 && this.state.lives > 0) {
        this.gainDistance(speed);
      }

      if (speed.toFixed(2) > 0.05 && !isRunning) {
        isRunning = true;
      }

      if (speed.toFixed(2) < 0.05) {
        player.stopAnimation();
        isRunning = false;
      }

      //NIGHT SKY BACKGROUND
      if (this.state.stage === "Night Sky Stage") {
        const gradient = context.createLinearGradient(
          100 - this.state.distance / 10,
          100 - this.state.distance,
          100 - this.state.distance / 10,
          800 + this.state.distance
        );
        gradient.addColorStop(0, "midnightblue");
        gradient.addColorStop(1, "thistle");
        context.fillStyle = gradient;
      }
      //DESERT HEAT BACKGROUND
      if (this.state.stage === "Desert Heat Stage") {
        context.fillStyle = "rgb(245, 186, 83)";
      }

      //*************************DON'T COMMENT**************************//
      context.fillRect(0, 0, canvas.width, canvas.height * 2);
      context.fillStyle = "rgb(31, 29, 29)";
      context.beginPath();
      //*************************DON'T COMMENT**************************//

      //************************NIGHT STAGE********************************//
      if (this.state.stage === "Night Sky Stage") {
        let nightSky = new NightSky();
        nightSky.drawStage(
          canvas,
          context,
          this.state.distance,
          this.state.millisecond
        );
      }
      //************************NIGHT STAGE********************************//

      //************************DESERT HEAT STAGE********************************//
      if (this.state.stage === "Desert Heat Stage") {
        let desertHeat = new DesertHeat();
        desertHeat.drawStage(
          canvas,
          context,
          ground,
          this.state.distance,
          this.palmTreePositions,
          t,
          this.state.timer
        );
      }
      //************************DESERT HEAT STAGE********************************//

      this.draw();
      this.animationID = requestAnimationFrame(loop);
      const playerCoordinates = {};
      playerCoordinates.x = Math.round(player.x);
      playerCoordinates.y = Math.round(player.y);

      //RENDER COINS
      this.coins.forEach((coin) => {
        coin.x = coin.position + this.state.lives * 100 - t + canvas.width / 2;
        coin.y = canvas.height - ground.getY(t + coin.x) * 0.25 - 38;
        context.drawImage(coin.img, coin.x, coin.y, 26, 26);
      });

      //PICKUP COINS
      const shouldPickUpCoin = (coin) => {
        return (
          Math.abs(coin.x - playerCoordinates.x) < 5 &&
          Math.abs(coin.y - playerCoordinates.y) < 28
        );
      };
      this.coins.forEach((coin) => {
        if (shouldPickUpCoin(coin) && this.state.lives > 0) {
          this.props.coinAudio();
        }
      });

      this.coins = this.coins.filter((coin) => !shouldPickUpCoin(coin));

      //COUNT COINS
      if (this.state.lives > 0) {
        this.setState({ coins: 2000 - this.coins.length });
      }

      context.moveTo(0, canvas.height);
      for (let i = 0; i < canvas.width; i++) {
        context.lineTo(i, canvas.height - ground.getY(t + i) * 0.25);
      }
      context.lineTo(canvas.width, canvas.height);
      context.fill();
    };

    const pauseHandler = () => {
      if (this.state.pauseGame) {
        requestAnimationFrame(loop);
        this.startTimers();
      } else {
        cancelAnimationFrame(this.animationID);
        clearInterval(this.interval);
        clearInterval(this.miniInterval);
      }
      updatePauseState();
    };

    const updatePauseState = () => {
      this.setState((state) => ({
        pauseGame: !state.pauseGame,
      }));
    };

    const resumeButton = document.getElementById("resume-button");

    resumeButton.addEventListener("click", (event) => {
      pauseHandler();
      resumeButton.blur();
    });

    onkeydown = (d) => {
      if (this.state.lives > 0) {
        if (!this.state.pauseGame) {
          if (d.key === "ArrowUp") {
            this.setState({ ArrowUp: true });
          } else if (d.key === "ArrowDown") {
            this.setState({ ArrowDown: true });
          } else if (d.key === "ArrowLeft") {
            this.setState({ ArrowLeft: true });
          } else if (d.key === "ArrowRight") {
            this.setState({ ArrowRight: true });
          }
        }
        if (this.state.millisecond > 0) {
          if (d.key === " ") {
            pauseHandler(loop);
          }
        }
        return (k[d.key] = 1);
      }
    };
    onkeyup = (d) => {
      if (this.state.lives > 0) {
        if (d.key === "ArrowUp") {
          this.setState({ ArrowUp: false });
        } else if (d.key === "ArrowDown") {
          this.setState({ ArrowDown: false });
        } else if (d.key === "ArrowLeft") {
          this.setState({ ArrowLeft: false });
        } else if (d.key === "ArrowRight") {
          this.setState({ ArrowRight: false });
        }
        return (k[d.key] = 0);
      }
    };
    loop();
  };

  render() {
    return (
      <div className="big-container">
        <div id="container">
          <div
            className={this.state.pauseGame ? "pause-screen" : "resume-screen"}
          >
            <button
              onClick={this.pauseHandler}
              id="resume-button"
              className={
                this.state.millisecond > 0
                  ? "resume-button"
                  : "hide-resume-button"
              }
            >
              RESUME GAME
            </button>
          </div>
          <div className="canvas-container">
            <canvas
              ref={this.canvas}
              height={350}
              width={window.innerWidth}
              className="fade-in"
            />
            <div className="count-container">
              <div className="count-down">
                {this.state.countDown < 1 ? "" : this.state.countDown}
              </div>
            </div>
          </div>
          <GameStats
            bgSongInfo={this.props.bgSongInfo}
            gameSound={this.props.gameSound}
            gameVolume={this.props.gameVolume}
            bgMusicVolume={this.props.bgMusicVolume}
            musicPlaying={this.props.musicPlaying}
            stats={this.state}
            setMusicVolume={this.props.setMusicVolume}
            setGameVolume={this.props.setGameVolume}
            nextSong={this.props.nextSong}
            stopAllSounds={this.props.stopAllSounds}
            bgMusic={this.props.bgMusic}
          />
          <div className="end-game-container">
            {!this.state.gameOn ? (
              <EndGame
                backToGameMenu={this.props.backToGameMenu}
                stats={this.state}
                saveScore={this.saveScore}
                restartGame={this.restartGame}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
