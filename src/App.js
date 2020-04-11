import React from 'react';
import './App.css';
import JSONAPIAdapter from './JSONAPIAdapter'
import {Navbar, Login, SignUp, Profile} from './components'
import Leaderboard from './containers/Leaderboard'
import GameContainer from './containers/GameContainer'
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {
  
  state = {
    users: [],
    scores: [],
    userId: "",
    username: ""
  }

  componentDidMount(){
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    adapter.getAll('scores')
    .then(scores => this.setState({scores}))
    
    adapter.getAll('users')
    .then(users => this.setState({users}))
  }

  setUser = (userObj) => {
    this.setState({userId: userObj.id, username: userObj.username})
  }

  signOut = () => {
    this.setState({userId: ""})
  }

  updateScores = (scoreObj) => {
    console.log(scoreObj)
    this.setState(prevState => ({scores: [prevState, scoreObj]}))
  }
  
  render(){
    return (
      <div className="App">
        <Navbar userId={this.state.userId} signOut={this.signOut}/>
        <Switch>
          <Route path="/login" render={() => <Login users={this.state.users} setUser={this.setUser}/>}/>
          <Route path="/signup" render={() => <SignUp users={this.state.users}/>}/>
          <Route path="/leaderboard" render={() => <Leaderboard scores={this.state.scores} users={this.state.users}/>}/>
          <Route path="/users/:id" render={(routerProps) => <Profile {...routerProps} scores={this.state.scores} userId={this.state.userId}/>}/>
          <Route path="/" render={() => <GameContainer userId={this.state.userId} username={this.state.username} updateScores={this.updateScores}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;
