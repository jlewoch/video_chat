import React, { Component } from 'react'
import io from 'socket.io-client'
import { VideoSection } from './video_section'
import { BottomControls } from './controls'
class ConferenceRoom extends Component {
  constructor (props) {
    super(props)
    this.getMedia = navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .catch(console.log)
    this.socket = io.connect('http://localhost:9000')
  }

  render () {
    return (
      <div className='conference-room'>
        <VideoSection
          ref={el => (this.room = el)}
          getMedia={this.getMedia}
          socket={this.socket}
        />
        <BottomControls />
      </div>
    )
  }
}

export default ConferenceRoom
