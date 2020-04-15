class Player {

  constructor(canvas) {
    this.name = "Cain Firstman"
    this.movingImage = new Image();
    this.movingImage.src = `caveman/running01.png`
    this.profileImageSource = `caveman/cavemanFront.png`
    this.x = canvas.width/2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.rSpeed = 0
    this.movement = null
  }
  
  startAnimation = () => {
// let i = 1
    // this.movement = setInterval(() => this.movingImage.src = `caveman/running0${i<8 ? i+=1 : i=1}.png`, 125)
    this.movement = `caveman/running01.png`
  }

  stopAnimation = () => {
    clearInterval(this.movement)
    this.movingImage.src = `caveman/running01.png`
  }

}

export default Player

