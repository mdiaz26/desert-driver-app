// import React from 'react'

class Coin {

  constructor() {
    this.id = null
    this.img = new Image();
    this.img.src = 'coin/coin1.png';
    this.interval = null;
    this.x = 0;
    this.y = 0;
  }
  
  startAnimation = () => {
    let i = 1
    this.interval = setInterval(() => this.img.src = `coin/coin${i<12 ? i+=1 : i=1}.png`, 125)
    
  }

  stopAnimation = () => {
    this.img.src = ""
    clearInterval(this.interval)
  }

  produceCoins = () => {
    let allCoins = []
    let positions = [300, 1200, 1899, 2600, 3400, 4300, 5100, 6200, 8000, 9300, 13000, 20000]
    
    for (let i = 0; i< positions.length; i++) {

    }

    return allCoins 
  }

}

export default Coin

