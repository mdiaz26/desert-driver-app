import React from 'react';
import './App.css';
import {Navbar, Login, SignUp, Profile} from './components'
import Leaderboard from './containers/Leaderboard'
import GameContainer from './containers/GameContainer'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/leaderboard" component={Leaderboard}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/" component={GameContainer}/>
      </Switch>
    </div>
  );
}

export default App;
