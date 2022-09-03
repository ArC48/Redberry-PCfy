import './dropdown.css'

function Dropdown(props) {
   

  return (
    <div>
      <div className='dropdown-container'>
          <select 
              className={props.dropdownClass}
              value={props.selectValue}
              onChange={props.handleFunction}
          >
              <option value={props.optionValue} disabled hidden>
                {props.defaultName}
              </option>
              {props.options}
          </select>
      </div>
      <div>
        {props.requirements}
      </div>
    </div>
  )
    
}

export default Dropdown