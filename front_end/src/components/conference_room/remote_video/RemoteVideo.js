import React, { Component } from 'react'

class RemoteVideo extends Component {
  componentDidMount () {
    this.remote.srcObject = this.props.stream
  }

  render () {
    return (
      <video
        className={`video ${this.props.full ? 'fill-screen' : ''}`}
        ref={el => (this.remote = el)}
        autoPlay
      />
    )
  }
}

export default RemoteVideo
