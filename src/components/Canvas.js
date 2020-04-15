import JSONAPIAdapter from '../JSONAPIAdapter'
import React, { Component } from 'react'
import GameStats from './GameStats'
import Player from './Player'
import Ground from './Ground'
import Egypt from './Egypt'
import Coin from './Coin'
import EndGame from './EndGame'
import NightSky from './NightSky'
import '../Canvas.css'

class Canvas extends Component {

  state = {
    lives: 10,
    coins: 0,
    score: 0,
    distance: 0,
    timer: 0, 
    millisecond: 0,
    playerName: null,
    playerAvatar: null, 
    moving: null, 
    rotating: null, 
    gameOn: true
  }

  canvas = React.createRef()
  coins = this.createCoins()
  palmTreePositions = this.createPalmTreePositions()
  interval = null

  componentDidMount() {
    this.game()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  restartGame = () => {
    this.coins = this.createCoins()
    this.setState({
      lives: 10, 
      coins: 0,
      score: 0,
      distance: 0,
      timer: 0,
      moving: null, 
      rotating: null, 
      gameOn: true
      
    }, this.game())
  }

  startTimer = () => {
    this.interval = setInterval (() => this.setState((prevState) => ({timer: prevState.timer + 1})), 1000)
    this.miniInterval = setInterval(() => this.setState((prevState) => ({millisecond: prevState.millisecond + 1})), 1)
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

  createCoins() {
    const positions = Array.from({ length: 2000 }, () => Math.random() * 100000)
    
    return positions.map(position => {
      let coin = new Coin() 
      coin.position = position
      return coin  
    })
  }

  createPalmTreePositions() {
    let positions = Array.from({ length: 40}, () => (Math.random() * 1000))
    return positions
  }

  game = () => {
    const canvas = this.canvas.current
    const context = canvas.getContext("2d")
    const ground = new Ground() 
    const player = new Player(canvas)
    let t = 0
    let speed = 0
    let isRunning = false
    let lifeOver = false
    let playing = true
    let k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};

    this.setState({gameOn: true})
    this.setProfile(player)

    if (this.state.timer === 0) {
      this.startTimer()
    }

    const loseLives = () => {
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
      
      //LOSING CONDITION
      if (player.rot < -2 && grounded){
        if (this.state.lives > 1) {
          loseLives()
        } else {
          let totalScore = (this.state.coins * this.state.distance) - this.state.timer
          this.setState({
            lives: 0, 
            gameOn: false, 
            score: (totalScore).toFixed(2)
          })
          // saveScore()
          clearInterval(this.interval)
          lifeOver = true
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

      if (lifeOver && this.state.lives > 0) {
        return ;
      }
      speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.007;
      t += 6 * speed;
      if (speed.toFixed(2) > 0.05 && this.state.lives > 0) {
        this.gainScoreAndDistance(speed)
      }
      
      if (speed.toFixed(2) > 0.05 && !isRunning){
        player.startAnimation()
        isRunning = true
      }

      if (speed.toFixed(2) < 0.05){
        player.stopAnimation()
        isRunning = false
      }

      //NIGHTSKY BACKGROUND
      // const gradient = context.createLinearGradient(((100)-(this.state.distance/10)), (100-this.state.distance), (100-(this.state.distance/10)), (800+this.state.distance))
      // gradient.addColorStop(0, "midnightblue");
      // gradient.addColorStop(1, "thistle");
      // context.fillStyle = gradient
      
      //EGYPT BACKGROUND
      context.fillStyle = 'rgb(245, 186, 83)'
    
      //******************GREY FLOOR DON'T COMMENT**************************//
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgb(39, 44, 44)";
      context.beginPath();
      //******************GREY FLOOR DON'T COMMENT**************************//
      
      
      //************************NIGHT STAGE********************************//
      // let nightSky = new NightSky()
      // nightSky.drawStage(canvas, context, this.state.distance, this.state.millisecond)
      //************************NIGHT STAGE********************************//
      
      //************************EGYPT STAGE********************************//
      let egypt = new Egypt()
      egypt.drawStage(canvas, context, ground, this.state.distance, this.palmTreePositions, t, this.state.timer)
      //************************EGYPT STAGE********************************//
      
      this.draw();
      requestAnimationFrame(loop);
      const playerCoordinates = {}
      playerCoordinates.x = Math.round(player.x)
      playerCoordinates.y = Math.round(player.y)
      // console.log(this.state.millisecond)

      //RENDER COINS
      this.coins.forEach(coin => {
        coin.x = ((coin.position + (this.state.lives * 100)) - t) + (canvas.width/2)
        coin.y = (canvas.height - ground.getY(t + coin.x) * 0.25) - 38
        context.drawImage(coin.img, coin.x, coin.y, 26, 26)
      })
      
      //PICKUP COINS
      const shouldPickUpCoin = (coin) => {
        return Math.abs(coin.x - playerCoordinates.x) < 5 && Math.abs(coin.y - playerCoordinates.y) < 28
      }
      this.coins = this.coins.filter(coin => !shouldPickUpCoin(coin))

      //COUNT COINS
      if (this.state.lives > 0) {
        this.setState(({coins: 2000 - this.coins.length})) 
      }

      context.moveTo(0, canvas.height);
      for (let i=0; i < canvas.width; i++) {
        context.lineTo(i, canvas.height - ground.getY(t + i) * 0.25);
      }
      context.lineTo(canvas.width, canvas.height);
      context.fill();
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
        {!this.state.gameOn ? <EndGame stats={this.state} restartGame={this.restartGame}/> : null}
      </div>
    )
  }

}

export default Canvas