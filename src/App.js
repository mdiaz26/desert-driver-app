import React from 'react';
import './App.css';
import {Navbar, Login, SignUp} from './components'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </Switch>
    </div>
  );
}

export default App;
