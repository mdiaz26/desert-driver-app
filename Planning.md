GOALS:

mike-and-lou-present-game

removed from scripts in package json file for upload to heroku
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"




NEW DEPENDENCIES:
  npm install react-resize-observer
  npm install react-spring
  npm install react-scripts
  npm i -g npm 
  npm i -- save lodash





APRIL 15 NOTES:
  √ when new user is created an error occurs:
    "cannot read property image of undefined"
      App line 34 'setUser' function
  However, i can log in with newly created credentials

  √ let's update the scores table to show Max distance instead of distance
  √ in ProfileContainer, can we create a method to retrieve the user's max distance? lets pass the return value down to Profile.js as a prop for display
  * lets talk about distance vs max distance
  √ can we fix the validation so that logging in is not case sensitive? we can probably run .toLowerCase() on everything
  * Signout button should redirect user to Login screen until we have a home page
  






APRIL 14TH UPDATES:
* 2000 Coins added
* Coins counter
* Score is now calculated at the end
    - Coins x Distance - Timer = Score
* Props passed down to EndGame component (Canvas state)
* End of Lives leads to EndGame Component
    - Lets confirm the window refresh mechanism when "PLAY AGAIN" button is selected
* Today we can focus on 


Restructure folders:
  components(canvas, game stats, etc...)
  containers
  standard classes(player, sun, etc...)

PLAY LINK ON NAV leads to game container:



Create a Stage class:
  EGYPT:
    daytime/sunny
    background color:
    landmarks: pyramids
    stage props: palm trees, camels, sun
  PARIS:
    night time
    background color: dark (navy) blue
    landmarks: eiffel tower
    stage props: fireworks, street lamps, moon
  THE BRONX:
    afternoon / blue sky
    background color: sky blue
    landmarks: Yankee Stadium, bronx zoo
    stage props: subway, 4 train running, graffiti, buildings


End Game function:



extract Palm Trees
extract coins

