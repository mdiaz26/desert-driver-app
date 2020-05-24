import Images from "../../asset-libraries/Images";
class Moon {
  constructor(canvas, distance) {
    this.img = new Image();
    this.img.src = Images.moon;
    this.size = 500 + distance;
    this.x = canvas.width / 2 - this.size / 2;
    this.y = 260 - distance * 2;
  }
}

export default Moon;
