import React, { Component } from "react";

export default class NewEntryForm extends Component {
  state = {
    description: "",
    // favorited: false,
    // private: true,
  };


  handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/entries", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": this.props.token
            },
            body: JSON.stringify({
              description: this.state.description
            })
        })
        .then(res => res.json())
        .then((entry) => {
            if(entry.id){
            this.props.addEntry(entry)
      }
    })
  }
    
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={this.state.description}
          onChange={this.handleInput}
        />
        <input type="submit" value="Create new Entry" />
      </form>
      );
  }

}


