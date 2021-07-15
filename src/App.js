import './App.css';
import ProfileContainer from "./components/ProfileContainer";
import Form from "./components/Form";
import NavBar from "./components/NavBar";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import React, { Component } from "react";

class App extends Component {
  state = {
    id: 0,
    username: "",
    entries: [],
    token: "",
  };

  componentDidMount = () => {
    console.log("Hello!");
    if (localStorage.token) {
      console.log("Hello again!");
      fetch("http://localhost:3000/me", {
        headers: {
          authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then(this.handleResponse);
    }
  };

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted");

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    })
      .then((res) => res.json())
      .then(this.handleResponse);
  };

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted");

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    })
      .then((res) => res.json())
      .then(this.handleResponse);
  };

  handleResponse = (res) => {
    console.log(res);
    if (res.token) {
      this.setState({
        id: res.user.id,
        username: res.user.username,
        entries: res.user.entries,
        token: res.token,
      });
      localStorage.token = res.token;
      this.props.history.push("/profile");
    } else {
      alert("Messed up");
    }
  };

  handleLogout = () => {
    localStorage.clear()
    this.setState({
        id: 0,
        username: "",
        entries: [],
        token: "",

    })
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === "/login") {
      return (
        <Form formName="Login Form" handleSubmit={this.handleLoginSubmit} />
      );
    } else if (routerProps.location.pathname === "/register") {
      return (
        <Form
          formName="Register Form"
          handleSubmit={this.handleRegisterSubmit}
        />
      );
    }
  };

  deleteEntryFromState = (entry) => {
    let newArrayOfEntries = this.state.entries.filter((entryObj) => {
      return entryObj.id !== entry.id;
    });

    this.setState({
      entries: newArrayOfEntries,
    });
  };

  addEntry = (entry) => {
    this.setState({ entries: [...this.state.entries, entry] });
  };

  updateEntry = (updatedEntry) => {
    let updatingEntries = this.state.entries.map((entry) => {
      if (entry.id === updatedEntry.id) {
        return updatedEntry;
      } else {
        return entry;
      }
    });
    this.setState({entries: updatingEntries})
  };

  renderProfile = () => {
    if (this.state.token) {
      return (
        <ProfileContainer
          username={this.state.username}
          entries={this.state.entries}
          addEntry={this.addEntry}
          deleteEntryFromState={this.deleteEntryFromState}
          updateEntry={this.updateEntry}
          token={this.state.token}
          handleLogout={this.handleLogout}
        />
      );
    } else { 
      return <Redirect to="/login" />
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="page-container">
        <NavBar />
        <Switch>
          <Route path="/login" render={this.renderForm}></Route>
          <Route path="/register" render={this.renderForm}></Route>
          <Route path="/profile" render={this.renderProfile}></Route>
        </Switch>
      </div>
      </div>
    );
  }
}

export default withRouter(App);
