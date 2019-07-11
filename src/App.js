import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Search from './Search';
import NoMatch from './NoMatch';
import PlanetDetails from './PlanetDetails'


class App extends Component{
  render(){
    return(
    <Router>
      <div>
        <Switch>
        <Route exact path="/" exact component = {Login}/>
        <Route exact path="/search" component = {Search}/>
        <Route exact path="/planetDetails" component = {PlanetDetails}/>
        <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
