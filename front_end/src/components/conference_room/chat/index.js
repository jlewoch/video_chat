import { connect } from 'react-redux'
import ChatPanelDisaply from './ChatPanel'
import { sendMessage, inputChange } from '../../../store/room/actions'

const mapStateToProps = state => ({
  messages: state.room.messages,
  users: state.room.users,
  chatEnabled: state.room.chatEnabled,
  messageInput: state.room.messageInput,
  name: state.room.name
})
const mapDispatchToProps = dispatch => ({
  sendMessage: e => dispatch(sendMessage(e)),
  inputChange: e => dispatch(inputChange(e))
})

export const ChatPanel = connect(mapStateToProps, mapDispatchToProps)(
  ChatPanelDisaply
)
