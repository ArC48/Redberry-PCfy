import React, { useEffect, useState } from 'react'
import './userDetailsPage.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import { Link, useParams } from 'react-router-dom'
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

    const [team, setTeam] = useState('');
    const [position, setPosition] = useState('');
    const [brand, setBrand] = useState('');
    
    const token = '409dc6b87fa5f118fcf81cfe4538aca9';

    //get all the data of the current user & their laptops
    useEffect(() => {
    const getUserData = async () => {
      const response = await reqWithBody(
        'laptop',
        'GET',
        token,
        id
      );
      setUserInfo(response.data);
    };
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            >???????????????????????? ????????????</h1>
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
                <strong>??????????????????:</strong>
              </td>
              <td>
                {userInfo.user.name} {userInfo.user.surname}
              </td>
            </tr>
            <tr>
              <td>
                <strong>????????????:</strong>
              </td>
              <td>{team}</td>
            </tr>
            <tr>
              <td>
                <strong>?????????????????????:</strong>
              </td>
              <td>{position}</td>
            </tr>
            <tr>
              <td>
                <strong>???????????????:</strong>
              </td>
              <td>{userInfo.user.email}</td>
            </tr>
            <tr>
              <td>
                <strong>?????????. ??????????????????:</strong>
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
                <strong>???????????????????????? ??????????????????:</strong>
              </td>
              <td>{userInfo.laptop.name}</td>
            </tr>
            <tr>
              <td>
                <strong>???????????????????????? ??????????????????:</strong>
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
                <strong>????????????????????????????????? ????????????:</strong>
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
                <strong>CPU-??? ??????????????????:</strong>
              </td>
              <td>{userInfo.laptop.cpu.cores}</td>
            </tr>
            <tr>
              <td>
                <strong>CPU-??? ??????????????????:</strong>
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
                <strong>???????????????????????? ?????????????????????????????????:</strong>
              </td>
              <td>{userInfo.laptop.state === 'new'? '???????????????':'?????????????????????'}</td>
            </tr>
            <tr>
              <td>
                <strong>???????????????????????? ????????????:</strong>
              </td>
              <td>{userInfo.laptop.price} ???</td>
            </tr>
          </tbody>
        </table>
        <table className="laptopInfoTable">
          <tbody>
            <tr>
              <td>
                <strong>????????????????????? ??????????????????:</strong>
              </td>
              <td>{userInfo.laptop.purchase_date?
                userInfo.laptop.purchase_date : '?????? ???????????? ??????????????????????????????'  
            }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDetailsPage