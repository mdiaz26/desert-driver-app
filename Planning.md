GOALS:

APRIL 14TH UPDATES:
* 2000 Coins added
* Coins counter
* Score is now calculated at the end
    - Coins x Distance - Timer = Score
* Props passed down to EndGame component (Canvas state)
* End of Lives leads to EndGame Component
    - Lets confirm the window refresh mechanism when "PLAY AGAIN" button is selected


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

