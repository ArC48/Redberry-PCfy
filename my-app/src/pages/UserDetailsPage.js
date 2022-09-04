import React, { useState } from 'react'
import './userDetailsPage.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import landingPic from '../assets/landingPic.png'
import { useNavigate } from 'react-router-dom'

function UserDetailsPage() {
    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')));

    const navigate = useNavigate();

  return (
    <div>
        <div
            onClick={() => {
                    navigate('../form/laptopInfo')
            }}>
            <Image 
                className='arrow-back'
                img={arrowBack}
                alt='back'
            />
            {/* <h1>ლეპტოპის ინფო</h1> */}
        </div>
        <div className='main-container'>
            <div className='flex-row'>
                <Image
                className="laptop-image"
                img={landingPic}
                alt="laptop_pic"
                />
                <div>
                    <p className='key'>
                        სახელი: 
                        <span className='value'>
                        {userInfoObj.firstName}
                        </span>
                    </p>
                    <p className='key'>
                        თიმი: 
                        <span className='value'>
                        {userInfoObj.team}
                        </span>
                    </p>
                    <p className='key'>
                        პოზიცია: 
                        <span className='value'>
                        {userInfoObj.position}
                        </span>
                    </p>
                    <p className='key'>
                        მეილი: 
                        <span className='value'>
                        {userInfoObj.mail}
                        </span>
                    </p>
                    <p className='key'>
                        ტელ. ნომერი: 
                        <span className='value'>
                        {userInfoObj.phone}
                        </span>
                    </p>
                </div>
            </div>
            <hr className='hr'/>
            <div className='flex-row'>
                <div className='flex-column'>
                    <p className='key'>
                        ლეპტოპის სახელი: 
                        <span className='value'>
                        {userInfoObj.laptop.name}
                        </span>
                    </p>
                    <p className='key'>
                        ლეპტოპის ბრენდი: 
                        <span className='value'>
                        {userInfoObj.laptop.brand}
                        </span>
                    </p>
                    <p className='key'>
                        RAM: 
                        <span className='value'>
                        {userInfoObj.laptop.RAM}
                        </span>
                    </p>
                    <p className='key'>
                        მეხსიერების ტიპი: 
                        <span className='value'>
                        {userInfoObj.laptop.storageType}
                        </span>
                    </p>
                </div>
                <div className='flex-column'>
                    <p className='key'>
                        CPU: 
                        <span className='value'>
                        {userInfoObj.laptop.cpu}
                        </span>
                    </p>
                    <p className='key'>
                        CPU-ს ბირთვი: 
                        <span className='value'>
                        {userInfoObj.laptop.CpuCore}
                        </span>
                    </p>
                    <p className='key'>
                        CPU-ს ნაკადი: 
                        <span className='value'>
                        {userInfoObj.laptop.CpuStream}
                        </span>
                    </p>
                </div>
            </div>
            <hr className='hr'/>
            <div className='flex-row'>
                <div className='flex-column'>
                    <p className='key'>
                        ლეპტოპის მდგომარეობა: 
                        <span className='value'>
                        {userInfoObj.laptop.condition === 'new'? 'ახალი':'მეორადი'}
                        </span>
                    </p>
                    <p className='key'>
                        ლეპტოპის ფასი: 
                        <span className='value'>
                        {userInfoObj.laptop.price}
                            <span> ₾</span>
                        </span>
                    </p>
                </div>
                <div className='flex-column'>
                    <p className='key'>
                        შეძენის რიცხვი: 
                        <span className='value'>
                        {userInfoObj.laptop.boughtDate}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDetailsPage