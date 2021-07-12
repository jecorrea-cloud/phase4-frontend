// import './App.css';
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import { Switch, Route, withRouter, Link } from "react-router-dom";

import React, { Component } from 'react'

class App extends Component {

  state = {
    username: "",
    password: "",
    // entries: []
  }

  setUser = (user) => {
    console.log(user)
    this.setState({
      username: user.username,
      // entries: user.entries,
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
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);