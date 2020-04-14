import PalmTree from './PalmTree.js'
import Sun from './Sun'
import Pyramid from './Pyramid'

class Egypt {
 
  drawStage(canvas, context, ground, distance, palmTreePositions, t, timer) {
    //SUN
    const sun = new Sun(canvas, distance)
    context.drawImage(sun.img, sun.x, sun.y, sun.size, sun.size)
    
    //PYRAMIDS
    const pyramid = new Pyramid(canvas, distance)
    context.drawImage(pyramid.img, pyramid.x, 10, 600, 600)
    context.drawImage(pyramid.img, pyramid.x + 2000, -40, 540, 540)

    //PALM TREES
    const palmTrees = palmTreePositions.map(position => {
      let tree = new PalmTree(timer)
      tree.position = position
      tree.x = ((position * 100) - t) + (canvas.width/2)
      tree.y = (canvas.height - ground.getY(t + tree.x) * 0.25) - 290
      return tree
    })
    palmTrees.forEach(tree => {
      context.drawImage(tree.img, tree.x, tree.y, tree.size, tree.size)
    })

  }
}


export default Egypt