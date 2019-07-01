import React, { Component } from 'react';
import './App.css';

const DetailsRow = ({label, value})=>{
  return(
    <div style={{display:'flex', flexDirection:'row', flex:1, width:'750px'}}>
      <div style={{display:'flex', flex:1}}>{label}</div>
      <div style={{display:'flex', flex:1}}>{value}</div>
    </div>
  )
}

class PlanetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetDetailsJson: null
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.setItem('location', "/");
    this.props.history.push("/");
  }

  handleBack() {
    this.props.history.push("search");
    localStorage.setItem('location', "search");
  }

  render() {
    if (localStorage.getItem('loggedIn') == "false" || localStorage.getItem('loggedIn') == null)
      this.props.history.push("/");

    var planetDetailsObj = this.props.location.state;
    if (planetDetailsObj != null) {
      planetDetailsObj = this.props.location.state.planetDetailsJson;
      const {
        name,rotation_period,orbital_period,climate,gravity,surface_water,population,created,url
      } = planetDetailsObj;
      const date = new Date(created);
      const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      return (
        <div className="App">
          <div className="App-header">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input type="button" name="backButton" value="Back" onClick={this.handleBack} className="button"/>
              <input type="button" name="logoutButton" value="Logout" onClick={this.handleLogout} className="button"/>
            </div>
            <i><h1>Planet Details</h1></i>
            <div style={{display:'flex', flex:1, flexDirection:'column'}}>
              <DetailsRow label={'Name'} value={name}/>
              <DetailsRow label={'Rotation Period'} value={rotation_period}/>
              <DetailsRow label={'Orbital Period'} value={orbital_period}/>
              <DetailsRow label={'Climate'} value={climate}/>
              <DetailsRow label={'Gravity'} value={gravity}/>
              <DetailsRow label={'Surface Water'} value={surface_water}/>
              <DetailsRow label={'Population'} value={population}/>
              <DetailsRow label={'Created'} value={dateString}/>
              <DetailsRow label={'Url'} value={url}/>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <input type="button" name="logoutButton" value="Logout" onClick={this.handleLogout} />
            <input type="button" name="backButton" value="Back" onClick={this.handleBack} />
            <h3>Please go back to search page and select a planet</h3>
          </header>
        </div>
      );
    }
  }
}


export default PlanetDetails;