import React, { Component } from 'react';
import './App.css';


class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
      }
  
    handleBack() {
      this.props.history.push("/");
    }
  
    render() {
        return (
          <div className="App">
            <header className="App-header">
              <input type="button" name="backButton" value="Back" onClick={this.handleBack} className="button" />
              <h3>404 - No Page found</h3>
            </header>
          </div>
        );
      }
    }
  
  
  
  export default NoMatch;