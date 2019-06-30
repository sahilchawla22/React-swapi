import React, { Component } from 'react';
import './App.css';
import { runInThisContext } from 'vm';

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
      return (
        <div className="App">
          <header className="App-header">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input type="button" name="backButton" value="Back" onClick={this.handleBack} style={{
                fontSize: "16px",
                borderRadius: "30px",
                backgroundColor: "#4CAF50",
                border: "none",
                color: "black",
                padding: "11px 32px",
                textDecoration: "none",
                margin: "20px 20px",
                cursor: "pointer"
              }} />
              <input type="button" name="logoutButton" value="Logout" onClick={this.handleLogout} style={{
                fontSize: "16px",
                borderRadius: "30px",
                backgroundColor: "#4CAF50",
                border: "none",
                color: "black",
                padding: "11px 32px",
                textDecoration: "none",
                margin: "20px 20px",
                cursor: "pointer"
              }} />

            </div>
            <i><h1>Planet Details</h1></i>
            <div><pre>{JSON.stringify(planetDetailsObj, null, 2)}</pre></div>
          </header>
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