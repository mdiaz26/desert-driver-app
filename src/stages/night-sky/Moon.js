class Moon {
  constructor(canvas, distance) {
    this.img = new Image();
    this.img.src = "night-stage-images/moon.png";
    this.size = 500 + distance;
    this.x = canvas.width / 2 - this.size / 2;
    this.y = 280 - distance * 3;
  }
}

export default Moon;
