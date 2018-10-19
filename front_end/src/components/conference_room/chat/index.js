import { connect } from 'react-redux'
import ChatPanelDisaply from './ChatPanel'
import { sendMessage } from '../../../store/room/actions'

const mapStateToProps = state => ({
  messages: state.room.messages,
  users: state.room.users,
  chatEnabled: state.room.chatEnabled
})
const mapDispatchToProps = dispatch => ({
  sendMessage: () => dispatch(sendMessage())
})

export const ChatPanel = connect(mapStateToProps, mapDispatchToProps)(
  ChatPanelDisaply
)
