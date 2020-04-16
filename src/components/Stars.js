class Stars {

  constructor(distance) {
    this.img = new Image() 
    this.img.src = "night-stage-images/stars.png"
    this.x = 0
    this.y = 0-(distance*2)
    this.width = 1920
    this.height = 1080
  }
  
}

export default Stars