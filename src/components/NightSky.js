import Moon from './Moon.js'
import Stars from './Stars.js'
import Plane from './Plane.js'



class NightSky {
 
  drawStage(canvas, context, distance, millisecond) {
    //MOON
    const moon = new Moon(canvas, distance)
    context.drawImage(moon.img, moon.x, moon.y, moon.size, moon.size)
    
    //STARS
    const stars = new Stars(distance)
    context.drawImage(stars.img, stars.x, stars.y, stars.width, stars.height)

    //PLANES
    let planes = []
    for (let i=0; i < 100; i++){
      let plane = new Plane(canvas, millisecond)
      plane.x += (i * (canvas.width + 100))
      plane.y -= (i*100)
      planes.push(plane)
    }
    planes = planes.filter(plane => plane.x > -100 && plane.x < canvas.width + 100)
    planes.forEach(plane => {
      context.drawImage(plane.img, plane.x, plane.y, plane.width, plane.height)
    })
  }
}


export default NightSky