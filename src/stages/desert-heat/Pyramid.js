class Pyramid {
  constructor(canvas, distance) {
    this.img = new Image();
    this.img.src = "desert-stage-images/pyramid.png";
    this.x = canvas.width - distance * 10;
  }
}

export default Pyramid;
