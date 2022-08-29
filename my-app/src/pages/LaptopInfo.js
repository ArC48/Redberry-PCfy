import React from 'react'
import './laptopInfo.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import redberryLogo from '../assets/redberryLogo.svg'
import './laptopInfo.css'
import FileUpload from '../components/FileUpload'

function LaptopInfo() {
  return (
    <div>
        <div>
            <Image 
            className='arrow-back'
            img={arrowBack}
            alt='back'
            />
        </div>
        <div className='center-align'>
            <div className='routes'>
                    <p className='route-name'>თანამშრომლის ინფო</p>
                <div className='center-align'>
                <p className='route-name'>ლეპტოპის მახასიათებლები</p>
                    <div id='underline' />
                </div>
            </div>
            <div className='form-container'>
                <FileUpload 
                    alt='laptop-image-upload'
                    id='laptopImg'
                />
            </div>
            <div>
                <Image 
                    className='center-align logo'
                    img={redberryLogo}
                    alt='back'
                />
            </div>
        </div>
    </div>
  )
}

export default LaptopInfo