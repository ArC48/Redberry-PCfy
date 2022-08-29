import React from 'react'
import './input.css'
import CheckMark from '../assets/Checkmark'

function Input(props) {
  return (
    <div 
    className={'input-container ' + props.className}
    >
        <label className='label'>{props.label}</label>
        <input
            placeholder={props.placeholder}
            value={props.value}
            className='input-class'
            disabled={false}
        />
        <span>
            <CheckMark />
        </span>
        <p className='smol'
        >
            {props.requirement}
        </p>
    </div>
  )
}

export default Input