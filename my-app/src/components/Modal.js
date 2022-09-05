import React from 'react'
import { Link } from 'react-router-dom'
import cracker from '../assets/cracker.png'
import Button from './Button'
import Image from './Image'
import './modal.css'

function Modal() {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
                <Image 
                    className='cracker'
                    img={cracker}
                    alt='back'
                />
            <h2>ჩანაწერი დამატებულია!</h2>
            <Link to="/users">
                <Button 
                    text="სიაში გადაყვანა"
                    className="button modal-link-button"
                />
            </Link> 
            <Link to="/">
                <Button 
                    text="მთავარი"
                    className="link-button"
                />
            </Link> 
        </div>
    </div>
  )
}

export default Modal