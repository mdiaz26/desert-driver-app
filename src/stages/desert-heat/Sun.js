class Sun {
  constructor(canvas, distance) {
    this.img = new Image();
    this.img.src = "desert-stage-images/sun.png";
    this.x = canvas.width - 50 - distance * 4;
    this.y = 40;
    this.size = 140;
  }
}

export default Sun;
