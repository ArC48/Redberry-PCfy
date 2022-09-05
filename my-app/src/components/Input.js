import React from 'react'
import './input.css'

function Input(props) {
  return (
    <div 
    className={'input-container ' + props.className}
    >
        <label className={props.labelClass}>{props.label}</label>
        <input
            name={props.name}
            type = {props.type}
            placeholder={props.placeholder}
            value={props.value}
            className={props.inputClass}
            disabled={false}
            onInput={props.onInput}
        />
        <span className='input-span'>
            {props.span}
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