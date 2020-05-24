import Images from "../../asset-libraries/Images";

class Pyramid {
  constructor(canvas, distance) {
    this.img = new Image();
    this.img.src = Images.pyramid;
    this.x = canvas.width - distance * 10;
  }
}

export default Pyramid;
