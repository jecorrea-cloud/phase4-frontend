import React, { Component } from 'react';

class Form extends Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {formName} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{formName}</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" autoComplete="off" 
          name="username" 
          value={this.state.username} 
          onChange={this.handleChange}
          />
        <label htmlFor="password">Password:</label>
        <input type="password" autoComplete="off" 
          name="password" 
          value={this.state.password} 
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit"/>
      </form>
    );
  }

}

export default Form;