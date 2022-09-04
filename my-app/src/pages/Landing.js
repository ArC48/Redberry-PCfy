import landingPic from "../assets/landingPic.png";
import Image from "../components/Image";
import Text from "../assets/redberry-text.svg"
import './landing.css'
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="center-align">
      <div className="center-align">
        <Image 
          className='redberry-text'
          img={Text}
          alt='redberry'
        />
        <Image 
          className="image-class" 
          img={landingPic} 
          alt="redberry-workplace" />
      </div>
      <div className="center-align">
        <Link to='form/userInfo'>
          <Button className='button' text='ჩანაწერის დამატება'/>
        </Link>
        <Link to='form/laptopInfo'>
        <Button className='list-button button' text='ჩანაწერების სია'/>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
