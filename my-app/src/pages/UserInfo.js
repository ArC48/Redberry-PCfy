import React, { useEffect, useState } from 'react'
// styles
import './userInfo.css'
// assets
import arrowBack from '../assets/arrowBack.svg'
import redberryLogo from '../assets/redberryLogo.svg'
// components
import Input from '../components/Input'
import Image from '../components/Image'
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
import {reqWithoutBody} from '../services/ApiService'
// validations 
import {mailValid} from '../services/MailValidation'
import {numberValid} from '../services/NumberValidation'

function UserInfo() {
    const [teams, setTeams] = useState([]);
    const [positions, setPositions] = useState([]);
    
    const [userInfoObj, setUserInfoObj] = useState({});

    console.log(userInfoObj);
    
    useEffect(() => {
        const getTeamsData = async () => {
            const teamsList = await reqWithoutBody('teams','GET');
            setTeams(teamsList.data)
        }

        const getPositionsData = async () => {
            const positionsList = await reqWithoutBody('positions', 'GET');
            setPositions(positionsList.data)
        }

        getTeamsData();
        getPositionsData();
    }, []);

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
    }, [userInfoObj]);

    const teamsOptions = teams.map((singleTeam) => {
        return (
            <option key={singleTeam.id} id={singleTeam.id}>
                {singleTeam.name}
            </option>
        );
    });

    
    const positionsOptions = positions.map((singlePos) => {
        const chosenTeam = teams.filter((e) => {
            return e.name === userInfoObj.team? true:false
        });
        console.log(chosenTeam);

        if(chosenTeam.length && chosenTeam[0].id === singlePos.team_id) {
            return <option key={singlePos.id}>{singlePos.name}</option>
        }

        return null;
    });

    useEffect(() => {
        console.log('teams updated')
    }, [teams])

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
                <div className='center-align'>
                    <p className='route-name'>თანამშრომლის ინფო</p>
                    <div id='underline' />
                </div>
                <p className='route-name'>ლეპტოპის მახასიათებლები</p>
            </div>
            <div className='form-container'>
                <div className='flex-row'>
                    <Input 
                        label='სახელი'
                        placeholder='გრიშა'
                        requirement='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    /> 
                    <Input 
                        label='გვარი'
                        placeholder='ბაგრატიონი'
                        requirement='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    /> 
                </div>
                <div className='form-selectors'>
                    <Dropdown 
                        selectValue={userInfoObj.team || 'team'}
                        optionValue='team'
                        defaultName='თიმი'
                        options={teamsOptions}
                        handleFunction={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                team: event.target.value
                            }));
                        }}
                    />
                    <Dropdown 
                        selectValue={userInfoObj.position || 'position'}
                        defaultName='პოზიცია'
                        optionValue='position'
                        options={positionsOptions}
                        handleFunction={(event) => {
                            console.log(event.target.value);
                        }}
                    />
                </div>
                <div className='flex-column'>
                    <Input 
                        label='მეილი'
                        placeholder='ბაგრატიონი'
                        requirement='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    /> 
                    <Input 
                        label='ტელეფონის ნომერი'
                        placeholder='ბაგრატიონი'
                        requirement='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    /> 
                </div>
                <Button className='button' text='შემდეგი'/>
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

export default UserInfo