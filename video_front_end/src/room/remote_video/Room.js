import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import {
  toggleVideo,
  setLocalStream,
  setRemoteStream
} from '../../store/media/actions'
import Test from './Test'
let connections = {}
class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      members: []
    }
    this.socket = io.connect('http://localhost:9000')
  }

  toggle = () => {
    this.props.localStream.getVideoTracks()[0].enabled = !this.props.showVideo
    this.props.toggleVideo()
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
        this.socket.emit('candidate', {
          mlineindex: e.candidate.sdpMLineIndex,
          candidate: e.candidate.candidate
        })
      }
    }
    connections[id].pc.onaddstream = e => {
      this.setState({
        members: [...this.state.members, <Test key={id} stream={e.stream} />]
      })
    }
  }
  setupLocalStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.props.setLocalStream(stream)
        this.local.srcObject = this.props.localStream
      })
      .catch(console.log)
  }

  setupSockets = () => {
    this.socket.on('offer', (offer, fromId) => {
      this.setupPc(fromId)
      console.log('offer recieved')
      // set remote description and answer
      connections[fromId].pc.setRemoteDescription(offer)
      connections[fromId].pc
        .createAnswer()
        .then(data => connections[fromId].pc.setLocalDescription(data))
        .then(data =>
          this.socket.emit(
            'answer',
            connections[fromId].pc.localDescription,
            fromId
          )
        )
        .catch(console.log)
    })
    this.socket.on('answer', (answer, fromId) => {
      console.log('answer recieved')
      connections[fromId].pc.setRemoteDescription(answer)
    })
    this.socket.on('candidate', (candidate, fromId) => {
      connections[fromId].pc.addIceCandidate(
        new RTCIceCandidate({
          sdpMLineIndex: candidate.mlineindex,
          candidate: candidate.candidate
        })
      )
    })

    this.socket.on('joined', joinedId => {
      this.setupPc(joinedId)
      connections[joinedId].pc
        .createOffer()
        .then(data => connections[joinedId].pc.setLocalDescription(data))
        .then(data =>
          this.socket.emit(
            'offer',
            connections[joinedId].pc.localDescription,
            joinedId
          )
        )
        .catch(console.log)
    })
    this.socket.on('userleft', leftId=>{
      const members = this.state.members.filter(member=> member.key !== leftId)
      console.log(members)
      this.setState({members});
    })
  }
  start = () => {
    this.setupLocalStream()
    this.setupSockets()
  }

  componentDidMount () {
    this.start()
    setTimeout(() => this.socket.emit('joined', this.socket.id), 1000)
  }

  render () {
    return (
      <div style={{ display: 'flex' }}>
        <video
          style={{ height: '200px', width: '200px' }}
          ref={el => (this.local = el)}
          autoPlay
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.members.map(item => item)}
        </div>
        <button onClick={this.call}>call</button>
        <button onClick={this.toggle}>toggle</button>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  showVideo: state.media.showVideo,
  remoteStream: state.media.remoteStream,
  localStream: state.media.localStream
})
const mapDispatchToProps = dispatch => ({
  toggleVideo: () => dispatch(toggleVideo()),
  setLocalStream: e => dispatch(setLocalStream(e)),
  setRemoteStream: e => dispatch(setRemoteStream(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
