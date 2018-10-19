import { connect } from 'react-redux'
import BottomControlsDisaplay from './BottomControls'
import { toggleVideo } from '../../../store/media/actions'
import { toggleChat } from '../../../store/room/actions'

const mapStateToProps = state => ({
  showVideo: state.media.showVideo,
  chatEnabled: state.room.chatEnabled
})
const mapDispatchToProps = dispatch => ({
  toggleVideo: () => dispatch(toggleVideo()),
  toggleChat: () => dispatch(toggleChat())
})

export const BottomControls = connect(mapStateToProps, mapDispatchToProps)(
  BottomControlsDisaplay
)
