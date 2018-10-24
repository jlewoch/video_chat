import React from 'react'
import Toggle from '../../../shared_components/toggle_button/Toggle'
const BottomControls = ({
  toggleVideo,
  showVideo,
  toggleChat,
  chatEnabled,
  audioEnabled,
  toggleAudio
}) => {
  return (
    <div className='controls'>
      <div className='control-section'>
        <h4>Share Camera</h4>
        <Toggle clickHandler={toggleVideo} state={showVideo} />

      </div>
      <div className='control-section'>
        <h4
          onClick={toggleAudio}
          className={`control-section ${audioEnabled ? 'enabled' : 'disabled'}`}
        >
          Mute
        </h4>

      </div>
      <div
        onClick={toggleChat}
        className={`control-section ${chatEnabled ? 'enabled' : 'disabled'}`}
      >
        <h4>Chat</h4>

      </div>

    </div>
  )
}

export default BottomControls
