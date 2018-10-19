import React, { Component } from 'react'

class RemoteVideo extends Component {
  componentDidMount () {
    this.remote.srcObject = this.props.stream
  }

  render () {
    return (
      <div className={'video'}>
        <video ref={el => (this.remote = el)} autoPlay />
      </div>
    )
  }
}

export default RemoteVideo
