import React, { useEffect, useState } from 'react'
import './userDetailsPage.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import landingPic from '../assets/landingPic.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { reqWithBody, reqWithoutBody } from '../services/ApiService'

function UserDetailsPage() {
    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({
        user: {
            name: '',
            surname: '',
            team_id: '',
            position_id: '',
            email: '',
            phone_number: '',
        },
        laptop: {
            brand_id: '',
            cpu: { 
                name: '', 
                cores: '', 
                threads: '' },
            hard_drive_type: '',
            image: '',
            name: '',
            price: '',
            purchase_date: '',
            ram: '',
            state: '',
        },
    });
    console.log(userInfo)

    const [team, setTeam] = useState('');
    const [position, setPosition] = useState('');
    const [brand, setBrand] = useState('');

    useEffect(() => {
    const getUserData = async () => {
      const response = await reqWithBody(
        'laptop',
        'GET',
        '409dc6b87fa5f118fcf81cfe4538aca9',
        id
      );

      setUserInfo(response.data);
    };

    getUserData();
  }, []);

  //get user team, position and laptop brand info by their id's

   useEffect(() => {
    const teamsList = async () => {
      const teamsData = await reqWithoutBody('teams', 'GET');

      const team = await teamsData.data.filter(
        (team) => team.id === userInfo.user.team_id
      );

      setTeam(team[0].name);
    };

    const positionsList = async () => {
      const positionsData = await reqWithoutBody('positions', 'GET');

      const position = await positionsData.data.filter(
        (position) => position.id === userInfo.user.position_id
      );

      setPosition(position[0].name);
    };

    const brandsList = async () => {
      const brandsData = await reqWithoutBody('brands', 'GET');

      const brand = await brandsData.data.filter((brand) => {
        return brand.id === userInfo.laptop.brand_id;
      });

      setBrand(brand[0].name);
    };

    teamsList();
    positionsList();
    brandsList();
  }, [userInfo]);

  return (
    <div>
        <div>
            <Link to='/'>
                <Image 
                    className='arrow-back'
                    img={arrowBack}
                    alt='back'
                />
            </Link>
            <h1
                id='laptopInfo-header'
            >ლეპტოპის ინფო</h1>
        </div>
        <div id="userInformation">
        <img
          src={`https://pcfy.redberryinternship.ge${userInfo.laptop.image}`}
          alt="laptop"
          id="laptopImg"
        />

        <table id="userInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>სახელი:</strong>
              </td>
              <td>
                {userInfo.user.name} {userInfo.user.surname}
              </td>
            </tr>
            <tr>
              <td>
                <strong>თიმი:</strong>
              </td>
              <td>{team}</td>
            </tr>
            <tr>
              <td>
                <strong>პოზიცია:</strong>
              </td>
              <td>{position}</td>
            </tr>
            <tr>
              <td>
                <strong>მეილი:</strong>
              </td>
              <td>{userInfo.user.email}</td>
            </tr>
            <tr>
              <td>
                <strong>ტელ. ნომერი:</strong>
              </td>
              <td>{userInfo.user.phone_number}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div id="laptopInfo">
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>ლეპტოპის სახელი:</strong>
              </td>
              <td>{userInfo.laptop.name}</td>
            </tr>
            <tr>
              <td>
                <strong>ლეპტოპის ბრენდი:</strong>
              </td>
              <td>{brand}</td>
            </tr>
            <tr>
              <td>
                <strong>RAM:</strong>
              </td>
              <td>{userInfo.laptop.ram}</td>
            </tr>
            <tr>
              <td>
                <strong>მეხსიერების ტიპი:</strong>
              </td>
              <td>{userInfo.laptop.hard_drive_type}</td>
            </tr>
          </tbody>
        </table>
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>CPU:</strong>
              </td>
              <td>{userInfo.laptop.cpu.name}</td>
            </tr>
            <tr>
              <td>
                <strong>CPU-ს ბირთვი:</strong>
              </td>
              <td>{userInfo.laptop.cpu.cores}</td>
            </tr>
            <tr>
              <td>
                <strong>CPU-ს ნაკადი:</strong>
              </td>
              <td>{userInfo.laptop.cpu.threads}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div id="additionalInfo">
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>ლეპტოპის მდგომარეობა:</strong>
              </td>
              <td>{userInfo.laptop.state === 'new'? 'ახალი':'მეორადი'}</td>
            </tr>
            <tr>
              <td>
                <strong>ლეპტოპის ფასი:</strong>
              </td>
              <td>{userInfo.laptop.price} ₾</td>
            </tr>
          </tbody>
        </table>
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>შეძენის რიცხვი:</strong>
              </td>
              <td>{userInfo.laptop.purchase_date?
                userInfo.laptop.purchase_date : 'არ არის მითითებული'  
            }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDetailsPage