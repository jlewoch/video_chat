import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import VideoSectionDisplay from './VideoSection'
import { setLocalStream, toggleVideo } from '../../../store/media/actions'
import { addMessage, addUser } from '../../../store/room/actions'
import './video_section.css'
const mapStateToProps = state => ({
  showVideo: state.media.showVideo,
  localStream: state.media.localStream,
  name: state.room.name
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleVideo: () => dispatch(toggleVideo()),
  setLocalStream: e => dispatch(setLocalStream(e)),
  addUser: e => dispatch(addUser(e)),
  addMessage: e => dispatch(addMessage(e))
})

export const VideoSection = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(VideoSectionDisplay)
)
