import React, { Component } from 'react'

import { connect } from 'react-redux'
import RemoteVideo from './remote_video/RemoteVideo'
import './room.css'
import { BottomControls } from './controls'
import { ChatPanel } from './chat'
import { setLocalStream, toggleVideo } from '../../store/media/actions'
import { addMessage, addUser } from '../../store/room/actions'
let connections = {}
class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      members: []
    }
  }
  setupPc = id => {
    connections[id] = {}
    connections[id].name = id
    connections[id].pc = new RTCPeerConnection()
    connections[id].dc = connections[id].pc.createDataChannel(this.props.room)
    connections[id].dc.onmessage = e => {
      const message = JSON.parse(e.data)
      console.log('message on datastream', message)
    }
    connections[id].dc.onclose = () => {
      connections[id].remoteStream.getVideoTracks()[0].stop()
      console.log('The Data Channel is Closed')
    }
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
        members: [
          ...this.state.members,
          <RemoteVideo
            key={id}
            full={Object.keys(connections).length === 1}
            stream={connections[id].remoteStream}
          />
        ]
      })
    }
    connections[id].pc.ondatachannel = e => {
      connections[id].dc = e.channel

      connections[id].dc.onmessage = e => {
        var msg = JSON.parse(e.data)
        console.log('received message over data channel:' + msg)
      }

      connections[id].dc.onclose = () => {
        connections[id].remoteStream.getVideoTracks()[0].stop()
        console.log('The Data Channel is Closed')
      }
      connections[id].dc.send(
        JSON.stringify({
          peerMediaStream: {
            video: this.props.localStream.getVideoTracks()[0].enabled
          }
        })
      )
    }
  }

  setupSockets = () => {
    this.props.socket.on('connect', () => {
      this.props.getMedia.then(stream => {
        this.props.setLocalStream(stream)
        this.local.srcObject = this.props.localStream
        this.props.socket.emit('joined', this.props.roomId)
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
      console.log('answer recieved')
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
      const members = this.state.members.filter(member => member.key !== leftId)
      this.setState({ members })
    })
    this.props.socket.on('joined', message => {
      this.setupPc(message.id)
      this.props.addUser(message)
    })
    this.props.socket.on('ready', message => {
      this.sendOffer(message)
    })

    this.props.socket.on('message', (message, id) => {
      console.log(message, 'got message')
      this.props.addMessage({
        message: message.message,
        id,
        name: message.name
      })
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
      <div className='conference-room'>
        <div className='video-section'>
          <div id='remote-videos'>
            {this.state.members.map(item => item)}
            <video
              className='local-video'
              ref={el => (this.local = el)}
              autoPlay
            />
          </div>

          <ChatPanel socket={this.props.socket} />
        </div>

        <BottomControls />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  roomId: state.room.roomId,
  showVideo: state.media.showVideo,
  localStream: state.media.localStream
})
const mapDispatchToProps = dispatch => ({
  toggleVideo: () => dispatch(toggleVideo()),
  setLocalStream: e => dispatch(setLocalStream(e)),
  addUser: e => dispatch(addUser(e)),
  addMessage: e => dispatch(addMessage(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(Room)
