import PalmTree from "./desert-heat/PalmTree.js";
import Sun from "./desert-heat/Sun";
import Pyramid from "./desert-heat/Pyramid";

class DesertHeat {
  drawStage(canvas, context, ground, distance, palmTreePositions, t, timer) {
    //SUN
    const sun = new Sun(canvas, distance);
    if (sun.x > -sun.size)
      context.drawImage(sun.img, sun.x, sun.y, sun.size, sun.size);

    //PYRAMIDS
    const pyramid = new Pyramid(canvas, distance);
    context.drawImage(pyramid.img, pyramid.x, 10, 600, 600);
    context.drawImage(pyramid.img, pyramid.x + 2000, -40, 540, 540);

    //PALM TREES
    let palmTrees = palmTreePositions.map((position) => {
      let tree = new PalmTree(timer);
      tree.position = position;
      tree.x = position * 100 - t + canvas.width / 2;
      tree.y = canvas.height - ground.getY(t + tree.x) * 0.25 - 290;
      return tree;
    });
    palmTrees = palmTrees.filter(
      (tree) => tree.x > -tree.size && tree.x < canvas.width
    );
    palmTrees.forEach((tree) => {
      context.drawImage(tree.img, tree.x, tree.y, tree.size, tree.size);
    });
  }
}

export default DesertHeat;
