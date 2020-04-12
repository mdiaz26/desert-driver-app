class Coin {

  constructor(canvas) {
    this.x = canvas.width/1.5;
    this.y = 0;
    this.img = new Image();
    this.i = 1
    this.img.src = `coin/coin1.png`
    this.movement = null
  }
  
  startAnimation = () => {
    let i = 1
    setInterval(() => this.img.src = `coin/coin${i<12 ? i+=1 : i=1}.png`, 125)
  }

  // stopAnimation = () => {
  //   clearInterval(this.movement)
  //   this.img.src = `coin/coin1.png`
  // }

}

export default Coin

