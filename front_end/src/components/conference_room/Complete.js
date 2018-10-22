import React, { Component } from 'react'
import Container from './Container'
import io from 'socket.io-client'
import Room from './Room'
class Complete extends Component {
  constructor (props) {
    super(props)
    this.getMedia = navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .catch(console.log)
    this.socket = io.connect('http://localhost:9000')
  }

  render () {
    return (
      <Room
        ref={el => (this.room = el)}
        getMedia={this.getMedia}
        socket={this.socket}
      />
    )
  }
}

export default Complete
