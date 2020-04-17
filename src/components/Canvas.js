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
    lives: 1,
    coins: 0,
    score: 0,
    distance: 0,
    maxDistance: 0,
    currentDistance: 0,
    timer: 0, 
    millisecond: 0,
    playerName: null,
    playerAvatar: null,  
    gameOn: true, 
    stage: this.props.stage,
    countDown: 3
  }

  canvas = React.createRef()
  coins = this.createCoins()
  palmTreePositions = this.createPalmTreePositions()
  interval = null
  miniInterval = null
  animationID = null
  countDown = null

  componentDidMount() {
    this.game()
    setTimeout(() => {
      this.startTimers()
    }, 3000)
    this.countDown = setInterval(() => {
      this.setState((prevState) => ({countDown: prevState.countDown -1}))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.miniInterval)
    cancelAnimationFrame(this.animationID)
  }

  restartGame = () => {
    
    this.coins = this.createCoins()
    this.setState({
      lives: 1, 
      coins: 0,
      score: 0,
      distance: 0,
      maxDistance: 0,
      currentDistance: 0,
      timer: 0,
      millisecond: 0,
      gameOn: true,
      countDown: 3
      
    }, this.componentDidMount())

  }

  startTimers = () => {
    this.interval = setInterval (() => this.setState((prevState) => ({timer: prevState.timer + 1})), 1000)
    this.miniInterval = setInterval(() => this.setState((prevState) => ({millisecond: prevState.millisecond + 1})), 1)
    
  }

  setProfile = () => {
    this.setState({
      playerName: this.props.username,
      playerAvatar: this.props.avatarImage 
    })
  }

  gainDistance = (speed) => {
    this.setState((prevState) => ({
      distance: prevState.distance + (speed / 50),
      currentDistance: prevState.currentDistance + (speed / 50),
      score: prevState.score + ((prevState.distance / 1000) * speed)
    }))
    if (this.state.maxDistance < this.state.currentDistance) {
      this.setState({maxDistance: this.state.currentDistance})
    }
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
    let positions = Array.from({ length: 80}, () => (Math.random() * 1000))
    return positions
  }

  saveScore = () => {
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

  game = () => {
    
    const canvas = this.canvas.current
    const context = canvas.getContext("2d")
    const ground = new Ground() 
    const player = new Player(canvas, this.props.avatarImage)
    const k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};
    let isRunning = false
    let lifeOver = false
    let playing = true
    let speed = 0
    let t = 0
      
    this.setState({gameOn: true})
    this.setProfile()

    const loseLives = () => {
      this.setState((prevState) => ({lives: prevState.lives - 1, currentDistance: 0}))
      lifeOver = true
      this.game()
      return ;
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
          clearInterval(this.miniInterval)
          clearInterval(this.interval)
          let totalScore = (this.state.coins * this.state.maxDistance) - this.state.timer
          this.setState({
            lives: 0, 
            gameOn: false, 
            score: (totalScore).toFixed(2)
          })
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
      context.drawImage(player.movingImage, -21, -21, 40, 34)
      context.restore(); 
    }
    
    //LOOP
    const loop = () => {
      if (lifeOver && this.state.lives > 0) {
        return ;
      }
      if (this.state.millisecond > 0) {
        clearInterval(this.countDown) 
        speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.007;
      }
      t += 6 * speed;
      if (speed.toFixed(2) > 0.05 && this.state.lives > 0) {
        this.gainDistance(speed)
      }
      
      if (speed.toFixed(2) > 0.05 && !isRunning){
        player.startAnimation()
        isRunning = true
      }

      if (speed.toFixed(2) < 0.05){
        player.stopAnimation()
        isRunning = false
      }
      
      //NIGHT SKY BACKGROUND
      if(this.state.stage === "Night Sky Stage"){
        const gradient = context.createLinearGradient(((100)-(this.state.distance/10)), (100-this.state.distance), (100-(this.state.distance/10)), (800+this.state.distance))
        gradient.addColorStop(0, "midnightblue");
        gradient.addColorStop(1, "thistle");
        context.fillStyle = gradient
      }
      //DESERT HEAT BACKGROUND
      if(this.state.stage === "Desert Heat Stage"){
        context.fillStyle = 'rgb(245, 186, 83)'
      }
      
      //*************************DON'T COMMENT**************************//
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgb(39, 44, 44)";
      context.beginPath();
      //*************************DON'T COMMENT**************************//
      
    //************************NIGHT STAGE********************************//
      if(this.state.stage === "Night Sky Stage"){
        let nightSky = new NightSky()
        nightSky.drawStage(canvas, context, this.state.distance, this.state.millisecond)
      }
    //************************NIGHT STAGE********************************//
      
    //************************EGYPT STAGE********************************//
      if(this.state.stage === "Desert Heat Stage"){
        let egypt = new Egypt()
        egypt.drawStage(canvas, context, ground, this.state.distance, this.palmTreePositions, t, this.state.timer)
      }
    //************************EGYPT STAGE********************************//
        
    
      
      this.draw();
      this.animationID = requestAnimationFrame(loop);
      const playerCoordinates = {}
      playerCoordinates.x = Math.round(player.x)
      playerCoordinates.y = Math.round(player.y)

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
      <div id="container">
        <canvas ref={this.canvas} height={350} width={window.innerWidth} className="fade-in"/>
        <div className="count-container">
    <div id="count-down">{this.state.countDown < 1 ? "" : this.state.countDown}</div>
        </div>
        <GameStats stats={this.state}/>
        {!this.state.gameOn ? <EndGame backToGameMenu={this.props.backToGameMenu} stats={this.state} saveScore={this.saveScore} restartGame={this.restartGame}/> : null}
      </div>
    )
  }

}

export default Canvas