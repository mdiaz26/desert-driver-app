class PalmTree {

  constructor(timer) {
    this.img = new Image() 
    this.img.src = "desert-stage-images/palm-tree.png"
    this.size = 380 + timer
    this.x = 0
    this.y = 0
  }

}

export default PalmTree