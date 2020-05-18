import Moon from "./night-sky/Moon.js";
import Stars from "./night-sky/Stars.js";
import Plane from "./night-sky/Plane.js";

class NightSky {
  drawStage(canvas, context, distance, millisecond) {
    //STARS
    const stars = new Stars(distance);
    context.drawImage(stars.img, stars.x, stars.y, stars.width, stars.height);

    //MOON
    const moon = new Moon(canvas, distance);
    context.drawImage(moon.img, moon.x, moon.y, moon.size, moon.size);

    //PLANES
    let planes = [];
    for (let i = 0; i < 100; i++) {
      let plane = new Plane(canvas, millisecond);
      plane.x += i * (canvas.width + 100);
      plane.y -= i * 60;
      planes.push(plane);
    }
    planes = planes.filter(
      (plane) => plane.x > -100 && plane.x < canvas.width + 100
    );
    planes.forEach((plane) => {
      context.drawImage(plane.img, plane.x, plane.y, plane.width, plane.height);
    });
  }
}

export default NightSky;
