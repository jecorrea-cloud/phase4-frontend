import Box from '@material-ui/core/Box';
import React, { Component } from "react";
import Entry from "./Entry";
import NewEntryForm from "./NewEntryForm";

export default class ProfileContainer extends Component {

  handleClick = () => {this.props.handleLogout()}

  render() {
    return (
      <div>
        <h2>Hi {this.props.username}!</h2>

        <div className="style-box">
        <NewEntryForm addEntry={this.props.addEntry} token={this.props.token} />
        </div>

        {this.props.entries.map((entry) => (
          <Entry key={entry.id} entry={entry} updateEntry={this.props.updateEntry} deleteEntryFromState={this.props.deleteEntryFromState} token={this.props.token}/>
        ))}

        <button onClick={this.handleClick}>Sign Out</button>
      </div>
    );
  }
}
