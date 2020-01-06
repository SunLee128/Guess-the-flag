import React, { Component } from 'react'
import axios from 'axios'

class Game extends Component {

  
  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(res => {console.log(res)})
      .catch(console.warn)
  }

  render() {
    // let views = <div>Loading...</div>
    return (
      <div>
        Game 
      </div>
    )
  }
}
export default Game