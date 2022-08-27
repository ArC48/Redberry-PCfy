import landingPic from "../assets/landingPic.png";
import Image from "../components/Image";
import Text from "../assets/redberry-text.svg"
import './landing.css'
import Button from "../components/Button";

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
        <Button className='button' text='ჩანაწერის დამატება'/>
        <Button className='list-button button' text='ჩანაწერების სია'/>
      </div>
    </div>
  );
}

export default Landing;
