// import './App.css';
import ProfileContainer from "./components/ProfileContainer";
import Form from "./components/Form"
import NavBar from "./components/NavBar"

import { Switch, Route, withRouter } from "react-router-dom";

import React, { Component } from 'react'

class App extends Component {

  state = {
    id: 0,
    username: "",
    entries: [],
    token: "",
  }

  componentDidMount = () =>{

    if(localStorage.token){

      fetch("http://localhost:3000/me", {
        headers: {
          "authorization": localStorage.token
        }
      })
        .then(res => res.json())
        .then(this.handleResponse)

    }

  }

  

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(res => res.json())
    .then(this.handleResponse)
  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
      .then(res => res.json())
      .then(this.handleResponse)

  }

  handleResponse = (res) => {
    console.log(res)
    if(res.token){
      this.setState({
        id: res.id,
        username: res.username,
        entries: res.entries,
        token: res.token,
      })
      this.props.history.push("/profile")
    } else {
      alert("Messed up")
    }
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form
        formName="Login Form"
        handleSubmit={this.handleLoginSubmit}
      />
    } else if (routerProps.location.pathname === "/register") {
      return <Form
        formName="Register Form"
        handleSubmit={this.handleRegisterSubmit}
      />
    }
  }

  renderProfile = () => {
    return <ProfileContainer username={this.state.username} entries={this.state.entries}/>
  }

  addEntry = (entry) =>{
      this.setState({entries: [...this.state.entries, entry]})
  }


  render (){
    console.log(this.state)
    return(
  
      <div className="App">
        <NavBar />
        <Switch>
        <Route path="/login" render={this.renderForm}>
        </Route>
        <Route path="/register" render={this.renderForm}>
          </Route>
          <Route path="/profile" render={this.renderProfile} addEntry={this.addEntry} token={this.state.token}>
          </Route>
        </Switch>

      </div>
    )
  }
}

export default withRouter(App)