// import React from 'react'

class Coin {

  constructor() {
    this.id = null
    this.img = new Image();
    this.img.src = 'coin/coin1.png';
    this.interval = null;
    this.x = 0;
    this.y = 0;
    this.i = 1;
  }
  
  startAnimation = () => {
    let i = 1
    this.interval = setInterval(() => this.img.src = `coin/coin${i<12 ? i+=1 : i=1}.png`, 125)
    
  }

  stopAnimation = () => {
    // delete this.img
    this.img.src = ""
    // clearInterval(this.interval)
  }

}

export default Coin

