import React from 'react'
import './side_pannel.css'
const RightSidePanel = ({ children, state }) => {
  return (
    <div id='panel' className={state ? 'ropened' : 'rclosed'}>
      {children}
    </div>
  )
}

export default RightSidePanel
