import "../styles/Login.css";
import React from "react";
import { Redirect } from "react-router-dom";
import Images from "../asset-libraries/Images";
import Ground from "../helpers/Ground";
import Player from "../stages/Player";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    redirectToGame: false,
    entered: false,
    flashing: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  canvas = React.createRef();
  animationID = null;

  componentDidMount() {
    this.gameDemo();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationID);
  }

  gameDemo = () => {
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    const ground = new Ground();
    const player = new Player(canvas, this.props.avatarImage);
    const k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };
    let isRunning = false;
    let lifeOver = false;
    let playing = true;
    let speed = 0;
    let t = 0;

    const loseDemoLife = () => {
      lifeOver = true;
      this.gameDemo();
      return;
    };

    this.draw = function () {
      let p1 = canvas.height - ground.getY(t + player.x) * 0.25;
      let p2 = canvas.height - ground.getY(t + 5 + player.x) * 0.25;

      let grounded = 0;
      if (p1 - 15 > player.y) {
        player.ySpeed += 0.1;
      } else {
        player.ySpeed -= player.y - (p1 - 15);
        player.y = p1 - 15;
        grounded = 1;
      }

      //LOSING CONDITION
      if (player.rot < -2 && grounded) {
        loseDemoLife();
        lifeOver = true;
      }
      if (!playing || (grounded && Math.abs(player.rot) > Math.PI * 0.5)) {
        playing = false;
        player.rSpeed = 5;
        k.ArrowUp = 1;
        player.x -= speed * 5;
      }

      //AVATAR ADJUST TO ENVIRONMENT
      let angle = Math.atan2(p2 - 15 - player.y, player.x + 5 - player.x);
      player.y += player.ySpeed;

      if (grounded && playing) {
        player.rot -= (player.rot - angle) * 0.5;
        player.rSpeed = player.rSpeed - (angle - player.rot);
      }

      //LEFT & RIGHT KEY SETTINGS
      if (player.rSpeed < 1.7) {
        player.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.07;
      }
      if (player.rSpeed > 1.7) {
        player.rSpeed = 1.6;
      }
      player.rot -= player.rSpeed * 0.1;
      if (player.rot > Math.PI) player.rot = -Math.PI;
      if (player.rot < -Math.PI) player.rot = Math.PI;
      context.save();
      context.translate(player.x, player.y);
      context.rotate(player.rot);

      //AVATAR SIZE AND SCREEN POSITION
      context.drawImage(player.movingImage, -19.5, -19.5, 36, 32);
      context.restore();
    };
    //LOOP
    const loop = () => {
      if (lifeOver) {
        return;
      }
      speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.007;
      t += 7 * speed;

      if (speed.toFixed(2) > 0.05 && !isRunning) {
        isRunning = true;
      }

      if (speed.toFixed(2) < 0.05) {
        player.stopAnimation();
        isRunning = false;
      }

      context.fillStyle = "rgb(143, 181, 219)";

      context.fillRect(0, 0, canvas.width, canvas.height * 2);
      context.fillStyle = "rgb(15, 15, 15)";
      context.beginPath();

      this.draw();
      this.animationID = requestAnimationFrame(loop);
      const playerCoordinates = {};
      playerCoordinates.x = Math.round(player.x);
      playerCoordinates.y = Math.round(player.y);

      context.moveTo(0, canvas.height);
      for (let i = 0; i < canvas.width; i++) {
        context.lineTo(i, canvas.height - ground.getY(t + i) * 0.25);
      }
      context.lineTo(canvas.width, canvas.height);
      context.fill();

      onkeydown = (d) => {
        if (d.key === "ArrowUp") {
          this.setState({ ArrowUp: true });
        } else if (d.key === "ArrowDown") {
          this.setState({ ArrowDown: true });
        } else if (d.key === "ArrowLeft") {
          this.setState({ ArrowLeft: true });
        } else if (d.key === "ArrowRight") {
          this.setState({ ArrowRight: true });
        }

        return (k[d.key] = 1);
      };
      onkeyup = (d) => {
        if (d.key === "ArrowUp") {
          this.setState({ ArrowUp: false });
        } else if (d.key === "ArrowDown") {
          this.setState({ ArrowDown: false });
        } else if (d.key === "ArrowLeft") {
          this.setState({ ArrowLeft: false });
        } else if (d.key === "ArrowRight") {
          this.setState({ ArrowRight: false });
        }
        return (k[d.key] = 0);
      };
    };
    loop();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  findUser = (username) => {
    return this.props.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userObj = this.findUser(this.state.username);
    if (userObj) {
      if (this.state.password === userObj.password) {
        this.props.setUser(userObj, userObj.avatar.id);
        this.setState({ redirectToGame: true });
      } else if (this.state.password !== userObj.password) {
        alert("incorrect password");
        this.setState({ password: "" });
      }
    } else {
      alert(
        "that username has not been found in our database. Try signing up for a new account!"
      );
      this.setState({ username: "", password: "" });
    }
  };

  enterSite = () => {
    this.props.startThemeSong();
    this.props.hideFooterMusic();
    this.setState({
      entered: true,
      flashing: false,
    });
    setTimeout(() => {
      this.setState({ flashing: false });
    }, 5583);
    let flashing = setInterval(() => {
      this.setState((state) => ({
        flashing: !state.flashing,
      }));
    }, 483);
    setTimeout(() => clearInterval(flashing), 4500);
    document.querySelector(".input-field").focus();
  };

  render() {
    const redirectToGame = this.state.redirectToGame;
    if (redirectToGame) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="about-and-logo">
          <div className={this.props.showAbout ? "show-about" : "hide-about"}>
            <div className="about-box">
              <div className="scroll-box">
                <section id="about-section">
                  <span className="about-headings">ABOUT</span>
                  <div>
                    <p className="divider">
                      __________________________________________________
                    </p>
                    <h5 className="sub-headings">WELCOME</h5>
                    <p>
                      Welcome to Desert Driver. We are excited to share
                      information about this game's creation and the vision for
                      its future. What started as a school project is now an
                      on-going collaboration between the game's creators and
                      their mentors. Please read along for an in-depth look into
                      Desert Driver and the goals we are setting for it.
                    </p>
                    <p className="divider">
                      __________________________________________________
                    </p>
                    <h5 className="sub-headings">TECH STACK</h5>
                    <p>
                      The current version of this game is running{" "}
                      <strong class="strong">React.js</strong> on the frontend.
                      There's an <strong class="strong">HTML 5 Canvas</strong>{" "}
                      that is rendering the game's action. The physics, general
                      movement and game surface are generated through a series
                      of <strong class="strong">Javascript</strong> functions
                      that were carefully crafted to promote optimal
                      performance. We are keeping track of user information and
                      game progress via a{" "}
                      <strong class="strong">
                        PostgreSQL-powered database
                      </strong>{" "}
                      and routing that data through our{" "}
                      <strong class="strong">Ruby on Rails</strong>{" "}
                      infrastructure. The bulk of the styling is handled by{" "}
                      <strong class="strong">CSS</strong> with some minor
                      additional <strong class="strong">Bootstrap</strong>{" "}
                      component. We customized the publicly sourced images using{" "}
                      <strong class="strong">Adobe Photoshop</strong> in order
                      to achieve visual consistency. Our database and routes are
                      live thanks to <strong class="strong">Heroku's</strong>{" "}
                      web services while <strong class="strong">Netlify</strong>{" "}
                      provides us a public access URL.
                      <br />
                      The Github repositories can be accessed here:{" "}
                      <a
                        href="https://github.com/mdiaz26/running-game-api"
                        className="about-links"
                        target="_blank"
                      >
                        Backend
                      </a>{" "}
                      |{" "}
                      <a
                        href="https://github.com/mdiaz26/running-game-app"
                        className="about-links"
                        target="_blank"
                      >
                        Frontend
                      </a>
                    </p>
                    <p className="divider">
                      __________________________________________________
                    </p>
                    <h5 className="sub-headings">FUTURE GOALS</h5>
                    The vision for this project has proven to be one evolves
                    with each new branch commit. Some of the more notable goals
                    include:
                    <ul className="about-lists">
                      <li>
                        <strong className="strong">Jump Action</strong>: The
                        game's current version does not have a deliberate jump
                        action. Instead a vehicle becomes airborne upon gaining
                        enough speed when propelled off the surface's hills.
                        Creating a jump mechanism would open up potential for
                        new styles of gameplay and would be a great segue into
                        the next goal...
                      </li>
                      <li>
                        <strong className="strong">Projectiles</strong>: Imagine
                        a "Super Mario Bros"-esque fireball shooting from the
                        right side of the screen against the user's vehicle.
                        This would require jumping and/or the ability to dodge
                        the new danger.{" "}
                      </li>
                      <li>
                        <strong className="strong">Bug On 79 Fix</strong>: If
                        you've played the game for more than a couple of
                        minutes, it's possible you've come across the Bug On 79.
                        Aptly named by one of the game's most avid testers
                        (Lou's 7-year-old nephew Julian), this is a looping
                        glitch that occurs at the 79th unit of distance where
                        the surface seems to "break" and becomes uneven,
                        creating an impossibly sharp speed bump. Driving
                        straight into it will more times than not result in a
                        life lost.{" "}
                      </li>
                      <li>
                        <strong className="strong">
                          Third Stage & Hidden Stage
                        </strong>
                        : This is the type of goal that will persist no matter
                        how many stages are created, but of course, one step at
                        a time. Here's some inspiration that will likely seep
                        its way into stage 3:{" "}
                        <a
                          href="https://www.youtube.com/watch?v=DgG9us3QkTE"
                          target="_blank"
                          className="about-links"
                        >
                          Hill Climbing Racing Game
                        </a>{" "}
                      </li>
                      <li>
                        <strong className="strong">Mobile Compatibility</strong>
                        : Making a React Native version of this game would be a
                        lengthy project but certain high on our list of goals.
                        Some avenues to explore React Native Game Engine for
                        continuous image rendering and Matter.JS for physics
                        capabilities.{" "}
                      </li>
                    </ul>
                    <p>
                      We want to hear your suggestions. If there are any ideas
                      you'd like to contribute you can either create a pull
                      request on Github or reach out directly{" "}
                      <a
                        href="mailto:DesertDriverGame@gmail.com"
                        target="_blank"
                        className="about-links"
                      >
                        DesertDriverGame@gmail.com
                      </a>
                      .
                    </p>
                  </div>
                </section>
                <br />
                <p className="divider">
                  ___________________________________________________________________________________________
                </p>
                <section id="instructions-section">
                  <span className="about-headings">INSTRUCTIONS</span>
                  <p className="divider">
                    __________________________________________________
                  </p>
                  <h5 className="sub-headings">CREATE AN ACCOUNT</h5>
                  <ol className="about-lists">
                    <li>
                      To create an account go to the Sign-Up screen by clicking
                      'Sign-Up' on the upper-right hand corner.
                    </li>
                    <li>Choose a Driver to play with.</li>
                    <li>
                      Create a Username and Password. Confirm your password and
                      click 'Submit'.
                    </li>
                    <li>
                      Once logged in, click the 'Play' link on the navigation
                      bar at the top of the page.
                    </li>
                    <li>
                      This will lead you to the Stage Selection screen. Click
                      the stage you would like to play to initiate the game.
                    </li>
                    <li>Use your keyboard to play the game.</li>
                  </ol>
                  <p className="divider">
                    __________________________________________________
                  </p>

                  <h5 className="sub-headings">GAME OBJECTIVE</h5>
                  <p>
                    The object of the game is simple. Collect coins, travel long
                    distances and execute amazing flips. It's better to
                    successfully land a few complex flips than to accumulate
                    many simple 360° flips. In short, prioritize quality over
                    quantity. Do NOT land upside-down. Do NOT land your
                    vehicle's front or its back. Right-side up is the only way
                    to land to avoid losing a life. At the start of each game
                    you will have 3 lives as well as 2 stages to choose from.
                    Whichever stage you choose, do NOT go slow. Time is ticking
                    and each second reduces your total score.
                  </p>
                </section>
                <p className="divider">
                  __________________________________________________
                </p>
                <h5 className="sub-headings">HOW TO PLAY</h5>
                <div className="about-canvas-container">
                  <canvas
                    ref={this.canvas}
                    height={250}
                    width={1000}
                    className="about-canvas"
                  ></canvas>
                </div>
                <br />
                <div className="instructions-container about-instructions">
                  <div className="keypad-container about-keypad">
                    <div className="arrow-box-top">
                      <img
                        src={Images.up}
                        alt="Up Arrow"
                        className={this.state.ArrowUp ? "light-up" : "dim"}
                      />
                    </div>
                    <div className="arrow-box-bottom">
                      <img
                        src={Images.left}
                        alt="Left Arrow"
                        className={this.state.ArrowLeft ? "light-up" : "dim"}
                      />
                      <img
                        src={Images.down}
                        alt="Down Arrow"
                        className={this.state.ArrowDown ? "light-up" : "dim"}
                      />
                      <img
                        src={Images.right}
                        alt="Right Arrow"
                        className={this.state.ArrowRight ? "light-up" : "dim"}
                      />
                    </div>
                  </div>
                  <div className="about-keys-explained">
                    <p className="about-instructions-entry">
                      Use your keyboard
                    </p>
                    <p>
                      <img
                        src={Images.up}
                        className="instructions-photo-up"
                        alt="Up Arrow"
                      />{" "}
                      To drive {" AND "}{" "}
                      <img
                        src={Images.down}
                        className="instructions-photo-up"
                        alt="Down Arrow"
                      />{" "}
                      To reverse
                    </p>
                    <p>
                      <img
                        src={Images.left}
                        className="instructions-photo-left"
                        alt="Left Arrow"
                      />{" "}
                      {" or "}
                      <img
                        src={Images.right}
                        alt="Right Arrow"
                        className="instructions-photo-right"
                      />
                      to swing the rotation
                    </p>
                  </div>
                </div>
                <p className="divider">
                  ___________________________________________________________________________________________
                </p>
                <section id="credits-section">
                  <span className="about-headings">CREDITS</span>
                  <p className="divider">
                    __________________________________________________
                  </p>
                  <h5 className="sub-headings">DEVELOPERS</h5>
                  <table align="center">
                    <tr id="image-table">
                      <a
                        href="https://www.linkedin.com/in/alejoluis/"
                        target="_blank"
                        className="about-links"
                      >
                        <th className="team-photos-container">
                          <img
                            className="team-photos"
                            width="100px"
                            height="100px"
                            src={Images.lou}
                          />
                          <span className="team-photo-names">Luis Alejo</span>
                        </th>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/mikediaz006/"
                        target="_blank"
                        className="about-links"
                      >
                        <th className="team-photos-container">
                          <img
                            className="team-photos"
                            width="100px"
                            height="100px"
                            src={Images.mike}
                          />
                          <span className="team-photo-names">Michael Diaz</span>
                        </th>
                      </a>
                    </tr>
                  </table>
                  <br />

                  <p className="divider">
                    __________________________________________________
                  </p>
                  <h5 className="sub-headings">MUSIC SAMPLES</h5>
                  <p>
                    We do not own licenses for any of the Music sampled in this
                    game. Please support the work of these artists by following
                    the links below or enjoy them all in this{" "}
                    <a
                      href="https://open.spotify.com/playlist/3kGdFkUcB5rtQ4pITay3tT?si=W2-fIL7KRG-AXP9VHF0dFg"
                      className="about-links"
                      target="_blank"
                    >
                      Spotify Playlist
                    </a>
                    :
                  </p>
                  <div className="about-songs-container">
                    <ul className="about-lists">
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/275qMus6giB04ILrWdBaN9?si=vekttmjuRF6HSUQ2njd2Fw"
                          className="about-links"
                          target="_blank"
                        >
                          5ive
                        </a>
                        " by MRR-ADM
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/1EFPehJv13my9zvLFzGE8Z?si=xavgMtPKQoitu_-KjWSBHQ"
                          className="about-links"
                          target="_blank"
                        >
                          Ecdysis
                        </a>
                        " by Flume
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/0ylsZHLhKUlTwpIcs4Y4CG?si=SkBICXrrTyevrcw6T3fIlg"
                          className="about-links"
                          target="_blank"
                        >
                          End Of The World ft. Blu
                        </a>
                        " by Nottz
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/40XVgYlIzqv4cndzgam9uW?si=BhBPnEuhQR-bzk9tuhG-JA"
                          className="about-links"
                          target="_blank"
                        >
                          Eternal Now
                        </a>
                        " by LSDREAM and Champagne Drip
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/7tBa1miuCyMBRAT3n3MEU2?si=ImNo8PFwR-a0VGunRPsGyw"
                          className="about-links"
                          target="_blank"
                        >
                          Fubar
                        </a>
                        " by Tsuruda
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/51LCWDbrIQWR2658tnvIBM?si=Qu3XCJ_EQWGUGQhhxBltLA"
                          className="about-links"
                          target="_blank"
                        >
                          Ghost
                        </a>
                        " by Tsuruda
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/7jefHw7FTksEOKDPV6lqLO?si=jtE39FVhQPmXTVrQX6-hNg"
                          className="about-links"
                          target="_blank"
                        >
                          Heat Wave
                        </a>
                        " by Tsuruda
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/7cPO2IPraPDlGIguekShlV?si=_8NiUXCYTt-MqCUPBvU6tw"
                          className="about-links"
                          target="_blank"
                        >
                          Jewel
                        </a>
                        " by Flume
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/0MdMnqkulXGOkYFexs9y9g?si=uFyTamXsR3uyEIJdAgFoaA"
                          className="about-links"
                          target="_blank"
                        >
                          LA Melody
                        </a>
                        " by Konx-Om-Pax
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/3X0fBUr0jUWOugmo6rGko3?si=V5PYpUTxStyFQmUM8zYUzQ"
                          className="about-links"
                          target="_blank"
                        >
                          Lemon Grass
                        </a>
                        " by MF Doom
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/6luAShpeqHTE84A4pY6Zcg?si=P5cu0P_SQle3nPLnHLqGGA"
                          className="about-links"
                          target="_blank"
                        >
                          Life Is So Beautiful
                        </a>
                        " by Sofasound
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/6bLh84TbbMalr0e2uqZamf?si=fwfDRDGhQjyGJxOnt5KM8A"
                          className="about-links"
                          target="_blank"
                        >
                          Moro Cut
                        </a>
                        " by Mad Zach and Yunis
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/4XE9Ggjr33rRGbjDHbGaTQ?si=oETHDwu2QqGplR9fJf_e0g"
                          className="about-links"
                          target="_blank"
                        >
                          Mr. Skitters
                        </a>
                        " by Medasin
                      </li>
                    </ul>
                    <ul className="about-lists">
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/035epJwRLJQLXbQ7XtPFEf?si=BzSMhLYzQI-H-YprFG6C2g"
                          className="about-links"
                          target="_blank"
                        >
                          Noth
                        </a>
                        " by Mad Zach and Yunis
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/0RZtD85ed03ARIuYLOHMWc?si=MzOJXo3lQDiFd6lRGtUZBA"
                          className="about-links"
                          target="_blank"
                        >
                          Out Here
                        </a>
                        " by Tsuruda
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/2g6XtLzKbaFSNtZ56z588v?si=o2WYiFLzSim6qTzg0m3VhQ"
                          className="about-links"
                          target="_blank"
                        >
                          Quatic
                        </a>
                        " by Botany
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/2IMeYPA1T0wwivGpvxZfET?si=CqcTUyT3SlufNa7PPeg63g"
                          className="about-links"
                          target="_blank"
                        >
                          Ruthless
                        </a>
                        " by Tsuruda
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/3kkaPg3wAVTmaEeQP4a81Y?si=POasfrUkQzq1ZtnkP6qRJw"
                          className="about-links"
                          target="_blank"
                        >
                          Still Rockin
                        </a>
                        " by Pretty Lights
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/2u3HmBPHrk3ooSdVikignW?si=UXW-n2mkQZeRkhMavP1Ckg"
                          className="about-links"
                          target="_blank"
                        >
                          Sweet Thang
                        </a>
                        " by Shuggie Otis
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/0SLH9b0nlK4larScjLxfSn?si=bPIEiNz2RPKwaJ4u-wk8ow"
                          className="about-links"
                          target="_blank"
                        >
                          Take Three
                        </a>
                        " by Jerry Folk
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/2FjbCrOGLOdghhrCRUqCm6?si=zHWPxp7yTSWVSxoaoiyVSw"
                          className="about-links"
                          target="_blank"
                        >
                          They Don't Know
                        </a>
                        " by 2Late
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/6H6SjMBqmpow1osltTbmFz?si=hiBJtsFtRKWPAJGgMM-_fw"
                          className="about-links"
                          target="_blank"
                        >
                          Vega
                        </a>
                        " by il:lo
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/70nIZ6RlNhgqxcCShFmYwf?si=z5YNMYJ8R9uyAteZDnkAeA"
                          className="about-links"
                          target="_blank"
                        >
                          Vultures
                        </a>
                        " by Chee
                      </li>
                      <li>
                        "
                        <a
                          href="https://open.spotify.com/track/3uw7dZjvRMAe30U91cSyLO?si=AryeiKU9R6e5ClD9dGhCHw"
                          className="about-links"
                          target="_blank"
                        >
                          Yeti, Set, Go
                        </a>
                        " by Polyrhythmics
                      </li>
                    </ul>
                  </div>
                  <p className="divider">
                    __________________________________________________
                  </p>
                  <h5 className="sub-headings">VOCAL SAMPLES</h5>
                  <p>
                    We do not own any of the Vocal Samples used in this game.
                    Find all these vocal samples and more at{" "}
                    <a
                      className="about-links"
                      href="http://www.therapboard.com/"
                      target="_blank"
                    >
                      The Rap Board
                    </a>
                    .
                  </p>
                  <p className="divider">
                    __________________________________________________
                  </p>
                  <h5 className="sub-headings">VISUAL INSPIRATION</h5>
                  <p>
                    The formulas to generate the game's surface were based on
                    this video:{" "}
                    <a
                      href="https://www.youtube.com/watch?v=MW8HcwHK1S0&t=524s"
                      target="_blank"
                      className="about-links"
                    >
                      Coding a Motorcycle Game in HTML
                    </a>
                  </p>

                  <br />
                  <br />
                  <br />
                </section>
              </div>
            </div>
          </div>
          <div className="logo-container">
            <img
              alt="Login Gif"
              className="logo-background"
              src={Images.loginGif}
            />
            <img
              id={
                this.props.showAbout
                  ? "logo-about"
                  : this.state.entered
                  ? "logo"
                  : "large-logo"
              }
              src={Images.logo}
              alt="Desert Heat Logo"
            />
            <div
              className={
                this.state.entered
                  ? "home-screen-buttons-container-hidden"
                  : this.props.showAbout
                  ? "home-screen-buttons-container-hidden"
                  : "home-screen-buttons-container"
              }
            >
              <button onClick={this.enterSite} className="home-screen-buttons">
                SIGN IN
              </button>
            </div>
          </div>
        </div>

        <div className="login-screen">
          <div></div>
          <div
            className={
              this.state.entered && !this.state.showAbout
                ? "login-form"
                : "login-form-hidden"
            }
          >
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="USERNAME"
                  value={this.state.username}
                  name="username"
                  autoFocus="true"
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="PASSWORD"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <input className="submit-button" type="submit" value="ENTER" />
            </form>
          </div>
          <div className="sound-warning-container">
            <span
              className={
                this.state.flashing && this.props.musicPlaying
                  ? "sound-warning"
                  : "sound-warning-hidden"
              }
            >
              WARNING: SOUND ON
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
