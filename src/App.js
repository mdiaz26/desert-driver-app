import React from 'react';
import './App.css';
import {Navbar, Login, SignUp, Profile} from './components'
import Leaderboard from './containers/Leaderboard'
import GameContainer from './containers/GameContainer'
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {
  
  state = {
    scores: [],
    userId: 7
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/scores')
    .then(response => response.json())
    .then(scores => this.setState({scores}))
  }
  
  render(){
    return (
      <div className="App">
        <Navbar userId={this.state.userId}/>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/leaderboard" render={() => <Leaderboard scores={this.state.scores}/>}/>
          <Route path="/users/:id" component={(routerProps) => <Profile {...routerProps} scores={this.state.scores}/>}/>
          <Route path="/" component={GameContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
