class Player {

  constructor(canvas, avatarImage) {
    this.name = "Cain Firstman"
    this.movingImage = new Image();
    this.movingImage.src = avatarImage
    this.x = canvas.width/2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.rSpeed = 0
    this.movement = null
  }
  
  startAnimation = () => {
    // let i = 1
    // this.movement = setInterval(() => this.movingImage.src = `caveman/running0${i<8 ? i+=1 : i=1}`, 125)
    // this.movingImage.src = `caveman/caveman.gif`
  }

  stopAnimation = () => {
    clearInterval(this.movement)
    // this.movingImage.src = ""
  }

}

export default Player

