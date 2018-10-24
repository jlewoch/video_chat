import React, { Component } from 'react'
import RemoteVideo from '../remote_video/RemoteVideo'
import { ChatPanel } from '../chat'

let connections = {}
class VideoSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      remoteScreens: []
    }
  }
  setupPc = id => {
    connections[id] = {}
    connections[id].name = id
    connections[id].pc = new RTCPeerConnection()

    this.props.localStream
      .getTracks()
      .forEach(track =>
        connections[id].pc.addTrack(track, this.props.localStream)
      )
    connections[id].pc.onicecandidate = e => {
      if (e.candidate) {
        this.props.socket.emit('candidate', {
          mlineindex: e.candidate.sdpMLineIndex,
          candidate: e.candidate.candidate
        })
      }
    }
    connections[id].pc.onaddstream = e => {
      connections[id].remoteStream = e.stream
      this.setState({
        remoteScreens: [
          ...this.state.remoteScreens,
          <RemoteVideo key={id} stream={connections[id].remoteStream} />
        ]
      })
    }
  }

  setupSockets = () => {
    this.props.socket.on('connect', () => {
      this.props.getMedia.then(stream => {
        this.props.setLocalStream(stream)
        this.local.srcObject = this.props.localStream
        this.props.socket.emit(
          'joined',
          this.props.match.params.RoomId,
          this.props.name
        )
      })
    })
    this.props.socket.on('offer', (offer, fromId) => {
      connections[fromId].pc.setRemoteDescription(offer)
      connections[fromId].pc
        .createAnswer()
        .then(data => connections[fromId].pc.setLocalDescription(data))
        .then(data =>
          this.props.socket.emit(
            'answer',
            connections[fromId].pc.localDescription,
            fromId
          )
        )
        .catch(console.log)
    })
    this.props.socket.on('answer', (answer, fromId) => {
      connections[fromId].pc.setRemoteDescription(answer)
    })
    this.props.socket.on('candidate', (candidate, fromId) => {
      connections[fromId].pc.addIceCandidate(
        new RTCIceCandidate({
          sdpMLineIndex: candidate.mlineindex,
          candidate: candidate.candidate
        })
      )
    })
    this.props.socket.on('users', users => {
      users.forEach(user => {
        this.setupPc(user.id)
        this.props.addUser(user)
      })
      this.props.socket.emit('ready')
    })

    this.props.socket.on('userleft', leftId => {
      const remoteScreens = this.state.remoteScreens.filter(
        member => member.key !== leftId
      )
      this.setState({ remoteScreens })
    })
    this.props.socket.on('joined', message => {
      this.setupPc(message.id)
      this.props.addUser(message)
    })
    this.props.socket.on('ready', message => {
      this.sendOffer(message)
    })

    this.props.socket.on('message', (message, id) => {
      this.props.addMessage({
        message: message.message,
        id,
        name: message.name
      })
    })
    this.props.socket.on('disconnect', () => {
      this.setState({ remoteScreens: [] })
      connections = {}
    })
  }
  sendOffer = id => {
    connections[id].pc
      .createOffer()
      .then(data => connections[id].pc.setLocalDescription(data))
      .then(data =>
        this.props.socket.emit('offer', connections[id].pc.localDescription, id)
      )
      .catch(console.log)
  }

  componentDidMount () {
    this.setupSockets()
  }

  render () {
    return (
      <div className='video-section'>
        <div id='remote-videos'>
          {this.state.remoteScreens.map(item => item)}
          <video
            className='local-video'
            ref={el => (this.local = el)}
            autoPlay
          />
        </div>

        <ChatPanel socket={this.props.socket} />

      </div>
    )
  }
}

export default VideoSection
