import React, { Component } from 'react'

export default class Home extends Component {

//       componentDidMount(){
//     if(localStorage.this.props.token){

//       fetch("http://localhost:3000/home", {
//         headers: {
//           "authorization": localStorage.this.props.token
//         }
//       })
//         .then(res => res.json())
//         .then(getResponse=> {console.log(getResponse)})
//     }
//   }
    render() {
        return (
            <div>
                <h1>Hi user!</h1>
            </div>
        )
    }
}