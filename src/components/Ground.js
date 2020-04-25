class Ground {

  constructor() {
    let array = []
    while (array.length < 10000) {
      let newValue = Math.floor(Math.random() * 255)
      array.push(newValue)
    }
    this.perm = array
  }

  getY(x) {
    const index = x * 0.01 % 255;
    const a = this.perm[Math.floor(index)]
    const b = this.perm[Math.ceil(index)]
    const t = index - Math.floor(index)
    const curve = a + (b-a) * (1-Math.cos(t*Math.PI))/2;

    return curve
  }
  

}

export default Ground

