import Images from "../asset-libraries/Images.js";

class Coin {
  constructor() {
    this.id = null;
    this.img = new Image();
    this.img.src = Images.coin;
    this.interval = null;
    this.position = 0;
    this.x = 0;
    this.y = 0;
    this.i = 1;
  }
}

export default Coin;
