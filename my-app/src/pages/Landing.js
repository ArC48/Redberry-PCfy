import landingPic from "../assets/landingPic.png";
import Image from "../components/Image";
import Text from "../assets/redberry-text.svg"
import './landing.css'
import Button from "../components/Button";
import { Link } from "react-router-dom";
import mobilelandingpic from '../assets/mobilelandingpic.svg'

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
          alt="redberry-workplace" 
        />
        <Image 
          className="responsive-pic"
          img={mobilelandingpic}
          alt="redberry-workplace"
        />
      </div>
      <div className="center-align">
        <Link to='form/userInfo'>
          <Button className='button create-record' text='ჩანაწერის დამატება'/>
        </Link>
        <Link to='/users'>
          <Button className='list-button button list-link' text='ჩანაწერების სია'/>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
