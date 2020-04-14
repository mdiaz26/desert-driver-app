import JSONAPIAdapter from '../JSONAPIAdapter'
import React, { Component } from 'react'
import GameStats from './GameStats'
import Player from './Player'
import Ground from './Ground'
import Egypt from './Egypt'
import Sun from './Sun'
import Pyramid from './Pyramid'
import PalmTree from './PalmTree'
import Coin from './Coin'
import EndGame from './EndGame'
import '../Canvas.css'

class Canvas extends Component {

  state = {
    lives: 10,
    score: 0,
    distance: 0,
    highScore: 0, 
    timer: 0,
    playerName: null,
    playerAvatar: null, 
    moving: null, 
    rotating: null, 
    coins: []
  }

  canvas = React.createRef()
  interval = null

  componentDidMount() {
    this.game()
    document.addEventListener('keyup', (event) => {
      if (event.key === "ArrowUp"){
        this.setState({moving: 0})
      }
      if (event.key === "ArrowDown"){
        this.setState({moving: 0})
      }
      if (event.key === "ArrowLeft"){
        this.setState({rotating: 0})
      }
      if (event.key === "ArrowRight"){
        this.setState({rotating: 0})
      }
    })
    document.addEventListener('keydown', (event) => {
      if (event.key === "ArrowUp"){
        this.setState({moving: 1})
      }
      if (event.key === "ArrowDown"){
        this.setState({moving: -1})
      }
      if (event.key === "ArrowLeft"){
        this.setState({rotating: -1})
      }
      if (event.key === "ArrowRight"){
        this.setState({rotating: 1})
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startTimer = () => {
    this.interval = setInterval (() => this.setState((prevState) => ({timer: prevState.timer + 1})), 1000)
  }

  setProfile = (player) => {
    this.setState({
      playerName: player.name, 
      playerAvatar: player.profileImageSource, 
    })
  }

  gainScoreAndDistance = (speed) => {
    this.setState((prevState) => ({
      distance: prevState.distance + (speed / 50),
      score: prevState.score + ((prevState.distance / 1000) * speed)
    }))
  }

  makeCoin = (coin, pos, canvas, context, t, ground) => {
    coin.x = ((pos + (this.state.lives * 100)) - t) + (canvas.width/2)
    coin.y = (canvas.height - ground.getY(t + coin.x) * 0.25) - 44
    context.drawImage(coin.img, coin.x, coin.y, 30, 30)
    return coin
  }

  deleteCoin = (coin) => {
    coin.stopAnimation()
  }

  game = () => {
    //CANVAS START
    const canvas = this.canvas.current
    const context = canvas.getContext("2d")
    const ground = new Ground() 
    const player = new Player(canvas)
    const coin = new Coin()

    let t = 0
    let speed = 0
    let isRunning = false
    let lifeOver = false
    let playing = true
    let k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};

    this.setProfile(player)

    if (this.state.timer === 0) {
      this.startTimer()
    }

    const loseLives = () => {
      // if (this.state.lives === 0) {
      //   gameOver()
      // }
      this.setState((prevState) => ({lives: prevState.lives - 1}))
      lifeOver = true
      this.game()
      return ;
    }

    //SAVE SCORE
    const saveScore = () => {
      const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
      const body = {
        points: this.state.score,
        distance: this.state.distance,
        user_number: this.props.userId,
        username: this.props.username
      }
      adapter.post('scores', body)
      .then(this.props.updateScores)
    }
    
    this.draw = function() {

      if (lifeOver) {
        return ;
      }
      
      let p1 = canvas.height - ground.getY(t + player.x) * 0.25;
      let p2 = canvas.height - ground.getY(t+5 + player.x) * 0.25;
      
      let grounded = 0
      if (p1-15 > player.y) {
        player.ySpeed += 0.1;
      } else {
        player.ySpeed -= player.y - (p1-15)
        player.y = p1 - 15;
        grounded = 1
      }

      const position = 100
      const newCoin = this.makeCoin(coin, position, canvas, context, t, ground)
      const playerCoordinates = {}
      playerCoordinates["x"] = Math.round(player.x)
      playerCoordinates["y"] = Math.round(player.y)
  
      if (newCoin.x - playerCoordinates.x < 10 ) {
        console.log("got it")
        this.deleteCoin(newCoin)
      }
      // let coinPositions = [300, 1200, 1899, 2600, 3400, 4300, 5100, 6200, 8000, 9300, 13000, 20000]

      //LOSING FUNCTION
      if (player.rot < -2 && grounded){
        if (this.state.lives > 1) {
          loseLives()
        } else if (this.state.lives === 1 && this.props.userId) {
          loseLives()
          console.log("game over")
          saveScore()
        }
      }

      if (!playing || grounded && Math.abs(player.rot) > Math.PI * 0.5){
        playing = false;
        player.rSpeed = 5;
        k.ArrowUp = 1;
        player.x -= speed * 5;
      }

      //AVATAR ADJUST TO ENVIRONMENT
      let angle = Math.atan2((p2-15) - player.y, (player.x+5) - player.x);
      player.y += player.ySpeed;

      if(grounded && playing) {
        player.rot -= (player.rot - angle) * 0.5;
        player.rSpeed = player.rSpeed - (angle - player.rot);
      }
      
      //LEFT & RIGHT KEY SETTINGS  
      player.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.09
      player.rot -= player.rSpeed * 0.1 
      if(player.rot > Math.PI) player.rot = -Math.PI;
      if(player.rot < -Math.PI) player.rot = Math.PI;
      context.save();
      context.translate(player.x, player.y);
      context.rotate(player.rot)
      
      //AVATAR SIZE AND SCREEN POSITION
      context.drawImage(player.movingImage, -19, -19, 29, 35)
      context.restore(); 
    }

    //LOOP
    const loop = () => {
      if (lifeOver) {
        return ;
      }
      speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.007;
      t += 6 * speed;
      if (speed.toFixed(2) > 0.05) {
        this.gainScoreAndDistance(speed)
      }
      
      if (speed.toFixed(2) > 0.05 && !isRunning){
        player.startAnimation()
        // coin.startAnimation()
        isRunning = true
      }

      if (speed.toFixed(2) < 0.05){
        player.stopAnimation()
        isRunning = false
      }

      context.fillStyle = 'rgb(249, 200, 114)'
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "rgb(45, 43, 39)";
      context.beginPath();

      //EGYPT STAGE
      let sun = new Sun(canvas, this.state.distance)
      let pyramid = new Pyramid(canvas, this.state.distance)
      let palmTree = new PalmTree(canvas, ground, this.state.distance, this.state.lives, this.state.timer, t)
      
      let egypt = new Egypt(context, sun, pyramid, palmTree)

      egypt.drawStage()

      context.moveTo(0, canvas.height);
      for (let i=0; i < canvas.width; i++) {
        context.lineTo(i, canvas.height - ground.getY(t + i) * 0.25);
      }
      context.lineTo(canvas.width, canvas.height);
      context.fill();
    
      this.draw();
      requestAnimationFrame(loop);
    }

    onkeydown = d => k[d.key] = 1
    onkeyup = d => k[d.key] = 0

    loop();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvas} height={350} width={window.innerWidth} className="canvas"/>
        <GameStats stats={this.state}/>
      </div>
    )
  }

}

export default Canvas