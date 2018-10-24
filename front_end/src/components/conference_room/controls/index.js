import { connect } from 'react-redux'
import BottomControlsDisaplay from './BottomControls'
import { toggleVideo, toggleAudio } from '../../../store/media/actions'
import { toggleChat } from '../../../store/room/actions'
import './bottom_controls.css'

const mapStateToProps = state => ({
  showVideo: state.media.showVideo,
  chatEnabled: state.room.chatEnabled,
  audioEnabled: state.media.shareMic
})
const mapDispatchToProps = dispatch => ({
  toggleVideo: () => dispatch(toggleVideo()),
  toggleChat: () => dispatch(toggleChat()),
  toggleAudio: () => dispatch(toggleAudio())
})

export const BottomControls = connect(mapStateToProps, mapDispatchToProps)(
  BottomControlsDisaplay
)
