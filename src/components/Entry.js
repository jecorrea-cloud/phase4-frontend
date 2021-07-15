import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { Component } from 'react'
import '../index.css'

export default class Entry extends Component {

  state ={
    description: this.props.entry.description,
    open: false
  }

  setOpen = ()=> {
    this.setState({
      open: !this.state.open
    })
  }

  handleDelete = () => {

    fetch(`http://localhost:3000/entries/${this.props.entry.id}`, {
        method: "DELETE",
        headers: {
            "authorization": this.props.token
        }
      })
      .then(res => res.json())
      .then((deletedEntry) => {
        this.props.deleteEntryFromState(deletedEntry)}) 
   }



  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/entries/${this.props.entry.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
          "authorization": this.props.token
      },
      body: JSON.stringify({
        description: this.state.description
          })
      })
    .then(res => res.json())
    .then((upToDateEntry) => {
      if(upToDateEntry.id){
        this.props.updateEntry(upToDateEntry)
  }
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="entry">
            <p>{this.props.entry.description}</p>
            
            <Popup
          trigger={
            <button style={{ padding: 5, margin: 5 }} onClick = {this.setOpen}>
              <span className="cardEditButton">Edit Entry</span>
            </button>
          }
          modal
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="description">Edit your entry:</label>
            <input
              type="text"
              autoComplete="off"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </Popup>


        <button onClick={this.handleDelete}>Delete Entry</button>
      </div>
    )
  }
}
