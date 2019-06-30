import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('https://swapi.co/api/people/?search=' + this.state.userName + '&format=json')
      .then(responseJson => responseJson.json())
      .then(result => {
        result = result.results.filter(item => item.name === this.state.userName && item.birth_year === this.state.password);

        if (result.length > 0) {
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('userName', this.state.userName);
          localStorage.setItem('location', "search");
          this.props.history.push("search");
        }

        else
          alert('Please Enter Correct Username/Password');
      });
  }

  handleChange(event, type) {
    this.setState({ [type]: event.target.value });
  }

  render() {
    if (localStorage.getItem('location') == "search" || localStorage.getItem('location') == "planetDetails") {
      console.log("Mere wala", localStorage.getItem('loggedIn'));
      console.log(localStorage.getItem('userName'));
      localStorage.setItem('loggedIn', true);
      this.props.history.push("search");
    }
    else {
      localStorage.removeItem('loggedIn');
      console.log("Called else");
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1><i>Login</i></h1>
          <form>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <i style={{ margin: "10px" }}>Username :
            <input style={{
                  marginLeft: "50px", padding: "6px 15px", boxSizing: "border-box",
                  border: "2px solid grey", borderRadius: "4px"
                }} type="text" name="userName" value={this.state.userName} onChange={e => this.handleChange(e, "userName")} />
              </i>
              <i style={{ margin: "10px" }}>
                Password :
              <input style={{
                  marginLeft: "50px", padding: "6px 15px", boxSizing: "border-box",
                  border: "2px solid grey", borderRadius: "4px"
                }} type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e, "password")} />
              </i>
            </div>
            <div style={{marginTop: "20px"}}>
              <input type="submit" name="submitButton" value="Submit" onClick={this.handleSubmit}
                style={{
                  fontSize: "16px",
                  borderRadius: "30px",
                  backgroundColor: "#4CAF50",
                  border: "none",
                  color: "white",
                  padding: "11px 32px",
                  textDecoration: "none",
                  margin: "4px 2px",
                  cursor: "pointer"
                }} />
            </div>
          </form>
        </header>
      </div>
    );
  }
}


export default Login;