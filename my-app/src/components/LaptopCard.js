import React from 'react';
import { Link } from 'react-router-dom';
import './laptopCard.css';

const LaptopCard = (props) => {
  const { laptop, user, id } = props;

  return (
    <div className="laptop-card">
      <img
        src={`https://pcfy.redberryinternship.ge/${laptop.image}`}
        alt="laptop"
        className="laptop-img"
      />
      <div className="laptop-info">
        <div>
          <p className="cardP">
            {user.name} {user.surname}
          </p>
          <p className="cardP">{laptop.name}</p>
        </div>
        <Link to={`./${id}`}>მეტის ნახვა</Link>
      </div>
    </div>
  );
};

export default LaptopCard;