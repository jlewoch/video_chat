import React, { Component } from 'react'

class RemoteVideo extends Component {
  componentDidMount () {
    this.remote.srcObject = this.props.stream
  }

  render () {
    return <video className={`video`} ref={el => (this.remote = el)} autoPlay />
  }
}

export default RemoteVideo
