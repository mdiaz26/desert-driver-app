class PalmTree {

  constructor(canvas, ground, distance, lives, timer, t) {
    this.canvas = canvas
    this.ground = ground 
    this.distance = distance 
    this.lives = lives 
    this.t = t
    this.img = new Image() 
    this.img.src = "desert-stage-images/palm-tree.png"
    this.size = 380 + timer
    this.positions = [1200, 3800, 7400, 7480, 9800, 14000, 19065, 19500, 19580, 26345, 31568, 37842]
    this.x = 0
    this.y = 0
    
  }

}

export default PalmTree