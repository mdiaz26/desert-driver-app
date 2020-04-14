class Egypt {


  constructor(context, sun, pyramid, palmTree) {
    this.context = context
    this.sun = sun
    this.pyramid = pyramid
    this.palmTree = palmTree
  }

  drawStage = () => {
    //SUN
    this.context.drawImage(this.sun.img, this.sun.x, this.sun.y, this.sun.size, this.sun.size)
    
    //PYRAMIDS
    this.context.drawImage(this.pyramid.img, this.pyramid.x, 10, 600, 600)
    this.context.drawImage(this.pyramid.img, this.pyramid.x + 2000, -40, 540, 540)

    //PALM TREES
    for (let i=0; i < this.palmTree.positions.length; i++){
      this.palmTree.positions[i] += this.palmTree.distance
      this.palmTree.x = ((this.palmTree.positions[i] + (this.palmTree.lives * 100)) - this.palmTree.t) + (this.palmTree.canvas.width/2)
      this.palmTree.y = (this.palmTree.canvas.height - this.palmTree.ground.getY(this.palmTree.t + this.palmTree.x) * 0.25) - 300
      this.context.drawImage(this.palmTree.img, this.palmTree.x, this.palmTree.y, this.palmTree.size, this.palmTree.size)
    }
  }
  


}


export default Egypt