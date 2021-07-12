// import './App.css';
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import ProfileContainer from "./ProfileContainer";
import { Switch, Route, withRouter, Link } from "react-router-dom";

import React, { Component } from 'react'

class App extends Component {

  state = {
    username: "",
    password: "",
    entries: [],
    id: 0,
    token : ""
  }

  handleResponse = (resp) => {
    console.log(resp)
    if(resp.token){
      this.setState({
        username: resp.user.username,
        entries: resp.user.entries,
        token: resp.token
      })
      localStorage.token = resp.token
      this.props.history.push("/profile")
    } else {
      alert("Messed up")
    }
  }

  componentDidMount(){
    if(localStorage.token){

      fetch("http://localhost:3000/home", {
        headers: {
          "authorization": localStorage.token
        }
      })
        .then(res => res.json())
        .then(this.handleResponse)
    }
  }

  setUser = (user) => {
    console.log(user)
    this.setState({
      username: user.username,
      entries: user.entries,
      id: user.id,
      token: user.token
    } );
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login setUser={this.setUser} />
            <Link to="/signup">Not a user? Sign Up</Link>
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={this.setUser}/>
            <Link to="/login">Already a user? Log in</Link>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/profile">
            <ProfileContainer 
            username={this.state.username} 
            entries={this.state.entries} 
            token={this.state.token}/>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);