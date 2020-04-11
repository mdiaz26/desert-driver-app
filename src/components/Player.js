class Player {

  constructor(canvas) {
    this.x = canvas.width/2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.rSpeed = 0
    this.img = new Image();
    this.img.src = `caveman/running01.png`
    this.frontImage = new Image();
    this.frontImage.src = `caveman/cavemanFront.png`
    this.movement = null
  }
  
  startAnimation = () => {
    let i = 1
    this.movement = setInterval(() => this.img.src = `caveman/running0${i<8 ? i+=1 : i=1}.png`, 125)
  }

  stopAnimation = () => {
    clearInterval(this.movement)
    this.img.src = `caveman/running01.png`
  }

}

export default Player

