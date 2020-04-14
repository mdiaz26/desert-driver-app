class Ground {

  constructor() {
    let set = new Set()
    
    while (set.size < 255) {
      set.add(Math.floor(Math.random()*255))
    }

    this.perm = Array.from(set)
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

