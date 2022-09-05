import React, { useEffect, useState } from 'react'
import LaptopCard from '../components/LaptopCard';
import { reqWithBody } from '../services/ApiService';
import arrowBack from '../assets/arrowBack.svg'
import Image from '../components/Image';
import { Link } from 'react-router-dom';
import './laptopsList.css'

function LaptopsList() {
    const [laptopsList, setLaptopsList] = useState([]);

    useEffect(() => {
        const getLaptops = async () => {
            const res = await reqWithBody(
                'laptops',
                'GET',
                '409dc6b87fa5f118fcf81cfe4538aca9'
            );
            setLaptopsList(res.data);
        };
        getLaptops();
    }, []);

    const laptopCards = laptopsList.map((e) => {
        return (
            <LaptopCard 
                key={e.laptop.id}
                laptop={e.laptop}
                user={e.user}
                id={e.laptop.id}
            />
        );
    });

  return (
    <div>
        <Link to="/">
            <Image 
                className='arrow-back'
                img={arrowBack}
                alt='back'
            />
        </Link>
        <h1
            id='laptopsList-header'
        >ჩანაწერების სია</h1>
        <div className='laptopsList-container'>
            {laptopCards}
        </div>
    </div>
  )
}

export default LaptopsList