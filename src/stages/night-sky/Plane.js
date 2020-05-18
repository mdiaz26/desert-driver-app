class Plane {
  constructor(canvas, millisecond) {
    this.img = new Image();
    this.img.src = "night-stage-images/plane.png";
    this.x = canvas.width + 100 - millisecond / 4.5;
    this.y = 10 + millisecond / 62;
    this.width = 100;
    this.height = 45;
  }
}

export default Plane;
