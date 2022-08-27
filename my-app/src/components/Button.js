import React from 'react'
import './button.css'

function Button(props) {
    console.log(props)
  return (
    <div>
        <button className={props.className}>
            {props.text}
        </button>
    </div>
  )
}

export default Button