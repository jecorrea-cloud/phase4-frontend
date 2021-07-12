import React, { Component } from "react";

export default class Login extends Component {

  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Function that authenticates user on the database
  handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((r) => r.json())
      .then((potentialUser) => {
        if (!potentialUser.error) {
          this.props.setUser(potentialUser);
        } else {
          alert(potentialUser.error);
        }
        console.log(potentialUser)
      });
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.handleChange}
          value={this.state.username}
        /><br/>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          value={this.state.password}
        /><br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}