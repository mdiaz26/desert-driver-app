import Images from "../../asset-libraries/Images";

class PalmTree {
  constructor(timer) {
    this.img = new Image();
    this.img.src = Images.palmTree;
    this.size = 380 + timer;
    this.x = 0;
    this.y = 0;
  }
}

export default PalmTree;
