import React, { Component } from "react";
import  Entry from "./Entry";
import NewEntryForm from "./NewEntryForm"

export default class ProfileContainer extends Component {

render() {
    return (
        <div>
            <h2>Hi {this.props.username}!</h2>

            {this.props.entries.map(entry => <Entry key={entry.id} entry={entry} />)}

            <NewEntryForm addEntry={this.props.addEntry} token={this.props.token} />
 
        </div>
    )
}
}

