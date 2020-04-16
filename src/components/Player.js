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
<<<<<<< HEAD
    // let i = 1
    // this.movement = setInterval(() => this.movingImage.src = `caveman/running0${i<8 ? i+=1 : i=1}`, 125)
    // this.movingImage.src = `caveman/caveman.gif`
=======
// let i = 1
    // this.movement = setInterval(() => this.movingImage.src = `caveman/running0${i<8 ? i+=1 : i=1}.png`, 125)
    this.movement = `caveman/running01.png`
>>>>>>> 9dd5b3592d272c87aa9d349389dc01d8bb67eb3f
  }

  stopAnimation = () => {
    clearInterval(this.movement)
    // this.movingImage.src = ""
  }

}

export default Player

