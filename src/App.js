import React from 'react';
import './App.css';
import {Navbar, Login, SignUp, Profile} from './components'
import Leaderboard from './containers/Leaderboard'
import GameContainer from './containers/GameContainer'
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {
  
  state = {
    users: [],
    scores: [],
    userId: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/scores')
    .then(response => response.json())
    .then(scores => this.setState({scores}))

    fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(users => this.setState({users}))
  }

  setUser = (userId) => {
    this.setState({userId})
  }

  signOut = () => {
    this.setState({userId: ""})
  }
  
  render(){
    return (
      <div className="App">
        <Navbar userId={this.state.userId} signOut={this.signOut}/>
        <Switch>
          <Route path="/login" render={() => <Login users={this.state.users} setUser={this.setUser}/>}/>
          <Route path="/signup" render={() => <SignUp users={this.state.users}/>}/>
          <Route path="/leaderboard" render={() => <Leaderboard scores={this.state.scores}/>}/>
          <Route path="/users/:id" render={(routerProps) => <Profile {...routerProps} scores={this.state.scores}/>}/>
          <Route path="/" component={GameContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
