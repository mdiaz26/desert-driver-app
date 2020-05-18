class Player {
  constructor(canvas, avatarImage) {
    this.movingImage = new Image();
    this.movingImage.src = avatarImage;
    this.movement = null;
    this.x = canvas.width / 2;
    this.y = 0;
    this.rot = 0;
    this.name = "";
    this.ySpeed = 0;
    this.rSpeed = 0;
  }

  stopAnimation = () => {
    clearInterval(this.movement);
  };
}

export default Player;
