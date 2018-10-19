import React, { Component } from 'react'

class RoomSelection extends Component {
  render () {
    return (
      <div className='selection-container'>
      <h1 className='title'>Welcome To Candidate Conferences</h1>
        <div className='selection-box'>
          <input pattern={/\d/} className='inputstyle' type='text' />
          <span className='floating-label'>Enter Conference Number</span>
          <button className='buttonstyle'>Join</button>
        </div>

      </div>
    )
  }
}

export default RoomSelection
