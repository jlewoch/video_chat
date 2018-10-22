import React, { Component } from 'react'

class RoomSelection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      validRoom: false,
      inputValue: '',
      rooms: ['Rooms Loading']
    }
  }

  changeHandler = e => {
    this.setState({
      inputValue: e.target.value,
      validRoom: RegExp(/^\d+$/).test(e.target.value)
    })
  }
  requestRooms = () => {}

  setupSocket = () => {}
  componentDidMount () {
    this.setupSocket()
  }
  render () {
    return (
      <div className='selection-container'>
        <h1 className='title'>Welcome To Candidate Conferences</h1>
        <div className='selection-box'>

          <input
            onChange={this.changeHandler}
            value={this.state.inputValue}
            pattern={/\d/}
            required
            className='inputstyle'
            type='text'
          />
          <span className='floating-label'>Enter Conference Number</span>
          <select name='' id=''>
            {this.state.rooms.map(room => <option>{room}</option>)}
          </select>
          <button onClick={this.requestRooms} className='buttonstyle'>
            Join
          </button>
        </div>

      </div>
    )
  }
}

export default RoomSelection
