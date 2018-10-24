import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setName } from '../../store/room/actions'
class RoomSelection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      validRoom: false,
      roomInput: ''
    }
  }

  changeHandler = e => {
    this.setState({
      roomInput: e.target.value,
      validRoom: RegExp(/^\d+$/).test(e.target.value)
    })
  }

  render () {
    const { nameInput, validRoom, roomInput } = this.state
    return (
      <div className='selection-container'>
        <h1 className='title'>Welcome To Candidate Conferences</h1>
        <div className='selection-box'>

          <input
            id='roomInput'
            onChange={this.changeHandler}
            value={roomInput}
            required
            className='inputstyle'
            type='text'
          />

          <span className='floating-label'>Enter Conference Number</span>
        </div>
        <div className='selection-box'>

          <input
            id='nameInput'
            onChange={this.props.setName}
            value={nameInput}
            required
            className='inputstyle'
            type='text'
          />

          <span className='floating-label'>Enter Your Name</span>
        </div>
        <div className='selection-controls'>

          <Link
            to={`/conference-room/${roomInput}`}
            className={`btn-style ${validRoom && this.props.name !== '' ? '' : 'disabled'}`}
          >
            Join
          </Link>

        </div>

      </div>
    )
  }
}

export default connect(
  state => ({ name: state.room.name }),
  dispatch => ({ setName: e => dispatch(setName(e.target.value)) })
)(RoomSelection)
