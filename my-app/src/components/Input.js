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
            name={props.name}
            type = {props.type}
            placeholder={props.placeholder}
            value={props.value}
            className={props.inputClass}
            disabled={false}
            onInput={props.onInput}
        />
        <span>
            {/* <CheckMark /> */}
        </span>
        <p 
          className='smol'
        >
            {props.requirements}
        </p>
    </div>
  )
}

export default Input