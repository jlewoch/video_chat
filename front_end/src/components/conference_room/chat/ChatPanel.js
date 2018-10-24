import React from 'react'
import RightSidePanel
  from '../../../shared_components/side_panel/RightSidePanel'
const ChatPanel = ({
  messages,
  chatEnabled,
  sendMessage,
  messageInput,
  inputChange,
  socket,
  name
}) => {
  function timeSpan (time) {
    const date = Date.now()
    const timelaps = date - time
    const years = Math.floor(timelaps / 31556952000)
    const months = Math.floor(timelaps / 2629746000)
    const days = Math.floor(timelaps / 86400000)
    const hours = Math.floor(timelaps / 3600000)
    const minutes = Math.floor(timelaps / 60000)
    const seconds = Math.floor(timelaps / 1000)
    const arr = [years, months, days, hours, minutes, seconds]
    let intervalname = ['year', 'month', 'day', 'hour', 'minute', 'second']
    let value = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= 1) {
        value = arr[i]
        if (value > 1) {
          intervalname = intervalname[i] + 's'
        } else {
          intervalname = intervalname[i]
        }
        break
      }
    }
    if (value === 0) {
      return 'Just Now'
    } else {
      return value + ' ' + intervalname + ' ago'
    }
  }
  return (
    <RightSidePanel state={chatEnabled}>
      <div className='chat'>
        <div className='chat-top'>
          {messages.map((message, index) => (
            <div key={index}>
              <div
                id='chat-message-container'
                className={
                  message.type === 'received' ? 'container-received' : ''
                }
              >
                <div className='chat-message-top'>
                  <div className='chat-img' />
                </div>
                <div className='chat-message-bottom'>

                  <div
                    className={`chat-message ${message.type === 'sent' ? 'sent' : 'received'}`}
                  >
                    <p className='chat-message-name'>{message.name}</p>
                    {message.message}
                  </div>
                  <p
                    className={`time-stamp ${message.type === 'received' ? 'time-stamp-received' : ''}`}
                  >
                    {timeSpan(message.time)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='chat-controls'>
          <input
            onChange={e => inputChange(e.target.value)}
            value={messageInput}
            className='chat-input'
            type='text'
          />
          <button
            onClick={() =>
              sendMessage({
                socket: socket,
                message: messageInput,
                name
              })}
            className='chat-btn'
          >
            Send
          </button>
        </div>
      </div>
    </RightSidePanel>
  )
}

export default ChatPanel
