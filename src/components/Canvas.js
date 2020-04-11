import React, { Component, useRef } from 'react'
import GameStats from './GameStats'
import Player from './Player'
import '../Canvas.css'

class Canvas extends Component {

  state = {
    lives: 10,
    score: 0,
    distance: 0,
    highScore: 0, 
    timer: 0,
    playerAvatar: null
  }

  componentDidMount() {
    this.game()
  }

  game = () => {
    //CANVAS START
    const canvas = this.refs.canvas
    const context = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = 350;
    canvas.style["border-bottom"] = "100px solid rgb(45, 43, 39)";


    //NOISE START
    let val
    let perm = [];

    let lerp = (a,b,t) => a += (b-a) * (1-Math.cos(t*Math.PI))/2;

    while (perm.length < 255){
      while (perm.includes(val = Math.floor(Math.random()*255)));
      perm.push(val)
    }
    
    const noise = noiseX => {
      noiseX = noiseX * 0.01 % 255;
      return lerp(perm[Math.floor(noiseX)], perm[Math.ceil(noiseX)], noiseX - Math.floor(noiseX));
    }
 

    //TIMER
    const setTimer = () => {
      let seconds = setInterval (() => this.setState((prevState) => ({timer: prevState.timer += 1})), 1000)
    }
    setTimer();

    //MAIN AVATAR PHOTO
    const setAvatar = () => {
      this.setState({playerAvatar: player.frontImage.src})
    }

    //LOSING LIVES
    const loseLives = () => {
      this.setState({lives: this.state.lives - 1})
      lifeOver = true
      this.game()
      return ;
    }

    //INCREASE DISTANCE
    const gainDistance = (speed) => {
      this.setState({
        distance: this.state.distance += (speed / 50)
      })
    }

    //INCREASE SCORE
    const gainScore = (speed) => {
      this.setState((prevState) => ({score: prevState.score + ((this.state.distance / 1000) * speed)}))
    }

    //AVATAR CREATION
    let lifeOver = false
    let player = new Player(canvas)
    setAvatar()
    
    this.draw = function() {

      let sun = new Image()
      sun.src = "desert-stage-images/sun.png"
      let sunPosition = (canvas.width - 100) - (this.state.distance * 4)
      context.drawImage(sun, sunPosition, 40, 140, 140)

      if (lifeOver) {
        return ;
      }

      //CACTUS JACK!
      const makeCacti = () => {
        let cactus = new Image()
        cactus.src = "desert-stage-images/cactus.png"
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+500), 312, 33, 33)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+5492), 320, 28, 28)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+11100), 318, 31, 31)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+15000), 305, 33, 33)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+20008), 321, 26, 26)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+25003), 316, 30, 30)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+30000), 309, 24, 24)
        context.drawImage(cactus, -t+(this.state.lives*this.state.score+9800), 317, 33, 33)
      }
      makeCacti()


      let p1 = canvas.height - noise(t + player.x) * 0.25;
      let p2 = canvas.height - noise(t+5 + player.x) * 0.25;
      
      let grounded = 0
      if (p1-15 > player.y) {
        player.ySpeed += 0.1;
      } else {
        player.ySpeed -= player.y - (p1-15)
        player.y = p1 - 15;
        grounded = 1
      }

      //LOSING FUNCTION
      if (player.rot < -2 && grounded){
        loseLives()
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
      
      
      context.drawImage(player.img, -19, -19, 29, 35)
      context.restore(); 
    }

    

    //CANVAS LOOP
    let t = 0
    let speed = 0
    let playing = true
    let k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};
    let isRunning = false

    const loop = () => {
      if (lifeOver) {
        return ;
      }
      speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.007;
      t += 6 * speed;
      if (speed.toFixed(2) > 0.05) {
        gainDistance(speed)
        gainScore(speed)
      }

      if (speed.toFixed(2) > 0.05 && !isRunning){
        player.startAnimation()
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
      const makePyramids = () => {
        let pyramid = new Image() 
        pyramid.src = "desert-stage-images/pyramid.png"
        let pyramidPosition = canvas.width - (this.state.distance * 10)
        let pyramidSize = 600
        context.drawImage(pyramid, pyramidPosition, 10, pyramidSize, pyramidSize)
      }
      makePyramids()

      const makePalmTrees = () => {
        let palmTree = new Image()
        palmTree.src = "desert-stage-images/palm-trees.png"
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+40000), 250, -80, 80)
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+4400), 273, -80, 80)
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+8800), 234, 80, 80)
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+12000), 246, 80, 80)
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+18000), 258, 80, 80)
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+24000), 254, 80, 80)
        context.drawImage(palmTree,  -t+(this.state.lives*this.state.score+32000), 241, 80, 80)
      }
      makePalmTrees()

      context.moveTo(0, canvas.height);

      for (let i=0; i < canvas.width; i++)
      context.lineTo(i, canvas.height - noise(t + i) * 0.25);

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
        <canvas ref="canvas" className="canvas"/>
        <GameStats stats={this.state}/>
      </div>
    )
  }

}

export default Canvas