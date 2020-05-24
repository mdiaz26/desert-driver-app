import Images from "../../asset-libraries/Images.js";

class Stars {
  constructor(distance) {
    this.img = new Image();
    this.img.src = Images.stars;
    this.x = 0;
    this.y = 0 - distance * 2;
    this.width = 1920;
    this.height = 1080;
  }
}

export default Stars;
