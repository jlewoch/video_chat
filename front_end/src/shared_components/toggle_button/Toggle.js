import React from 'react'
import './toggle.css'

const Toggle = ({state, clickHandler}) => {
  return (
    <div id='toggle' className={state ? 'enabled-bg' : 'disabled-bg'}>
      <div id='toggle-btn' onClick={clickHandler} className={state ? 'enabled-btn' : 'disabled-btn'} />
    </div>
  )
}

export default Toggle
