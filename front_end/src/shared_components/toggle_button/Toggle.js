import React from 'react'
import './toggle.css'

const Toggle = ({state, clickHandler}) => {
  return (
    <div onClick={clickHandler}  id='toggle' className={state ? 'enabled-bg' : 'disabled-bg'}>
      <div id='toggle-btn' className={state ? 'enabled-btn' : 'disabled-btn'} />
    </div>
  )
}

export default Toggle
