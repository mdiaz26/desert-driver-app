import Images from "../../asset-libraries/Images";

class Plane {
  constructor(canvas, millisecond) {
    this.img = new Image();
    this.img.src = Images.plane;
    this.x = canvas.width + 100 - millisecond / 1.8;
    this.y = 10 + millisecond / 46;
    this.width = 100;
    this.height = 45;
  }
}

export default Plane;
