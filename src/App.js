import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
        <Route path="/" exact component = {Login}/>
        <Route path="/search" component = {Search}/>
        <Route path="/planetDetails" component = {PlanetDetails}/>
        <Route component={NoMatch}/>
      </div>
    </Router>
    );
  }
}

export default App;
