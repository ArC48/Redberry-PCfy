import React, { useState } from 'react'
import './dropdown.css'

function Dropdown(props) {
   

  return (
    <div>
        <select 
            value={props.selectValue}
            onChange={props.handleFunction}
        >
            <option value={props.optionValue} disabled hidden>
              {props.defaultName}
            </option>
            {props.options}
        </select>
    </div>
  )
    
}

export default Dropdown