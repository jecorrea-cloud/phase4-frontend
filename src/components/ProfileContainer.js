import React, { Component } from "react";
import EntryContainer from "./EntryContainer"

export default class ProfileContainer extends Component {

render() {
    return (
        <div>
            <h2>{this.props.username}&apos;s Profile</h2>
            <ol>
            {this.props.entries.map(entry => <EntryContainer key={entry.id} entry={entry} token={this.props.token}/>)}
            </ol> 
        </div>
    )
}
}

