import React from 'react'
import './button.css'

function Button(props) {
  return (
    <div>
        <button 
        className={props.className}
        onClick={props.handleFunction}
        >
            {props.text}
        </button>
    </div>
  )
}

export default Button