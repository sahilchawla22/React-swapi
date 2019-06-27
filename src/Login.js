import React,{Component} from 'react';
import './App.css';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        userName : "",
        password : "",
        redirect: false
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    fetch('https://swapi.co/api/people/?search='+this.state.userName+'&format=json')
    .then(responseJson => responseJson.json())
    .then(result => {
      result = result.results.filter(item => item.name === this.state.userName && item.birth_year === this.state.password);
  
      if(result.length > 0)
      {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userName', this.state.userName);
        localStorage.setItem('location', "search");
        this.props.history.push("search");
      }
       
      else
        alert('Please Enter Correct Username/Password');
  });
  }
  
    handleChange(event,type) {
      this.setState({[type]:event.target.value});
    }

    render()
    {
      if(localStorage.getItem('location') == "search" || localStorage.getItem('location') == "planetDetails")
      {
        console.log("Mere wala",localStorage.getItem('loggedIn'));
        console.log(localStorage.getItem('userName'));
        localStorage.setItem('loggedIn', true);
        this.props.history.push("search");
      }
      else
      {
        localStorage.removeItem('loggedIn');
        console.log("Called else");
      }
      
      return(
          <div className="App">
            <header className="App-header">
              <h1>Login</h1>
              <form>
                <div>Username : <input type="text" name="userName" value= {this.state.userName} onChange = { e => this.handleChange(e,"userName")}/></div>
                <div>Password : <input type="password" name="password" value={this.state.password} onChange = {e => this.handleChange(e,"password")}/></div>
                <div><input type="submit" name="submitButton" value="Submit" onClick = {this.handleSubmit}/></div> 
              </form>
            </header>
          </div>
        );
    }
  }
  

  export default Login;