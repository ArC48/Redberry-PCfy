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
import { langValid } from '../services/LanguageValidation'

function UserInfo(props) {
    const [teams, setTeams] = useState([]);
    const [positions, setPositions] = useState([]);
    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')) || {});
        console.log(userInfoObj);
    const [errors, setErrors] = useState([]);

    console.log('userObject: ', userInfoObj);
    
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

        if(chosenTeam.length && chosenTeam[0].id === singlePos.team_id) {
            return <option key={singlePos.id}>{singlePos.name}</option>
        }

        return null;
    });

    // validations that are happening on submit button
    const onSubmitClick = () => {
        const errorsObj = {};

        if(!userInfoObj.firstName || !userInfoObj.firstName.trim()) {
            errorsObj.firstName = 'სახელი არ უნდა იყოს ცარიელი';
        }

        if(userInfoObj.firstName) {
            if(userInfoObj.firstName.length < 2) {
                errorsObj.firstName = 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
            }
            if(!langValid(userInfoObj.firstName)) {
                errorsObj.firstName = 'სახელი უნდა შეიცავდეს მხოლოდ ქართულ სიმბოლოებს';
            }
            // else errorsObj.firstName = ' ';
        }

        if(!userInfoObj.lastName || !userInfoObj.lastName.trim()) {
            errorsObj.lastName = 'გვარი არ უნდა იყოს ცარიელი';
        }

        if(userInfoObj.lastName){
            if(userInfoObj.lastName.length < 2) {
            errorsObj.lastName = 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
            }
            if(!langValid(userInfoObj.lastName)) {
            errorsObj.lastName = 'გვარი უნდა შეიცავდეს მხოლოდ ქართულ სიმბოლოებს';
            }
        }

        if(!userInfoObj.team) {
            errorsObj.team = 'სავალდებულო ველი'
        }

        if(!userInfoObj.position) {
            errorsObj.position = 'სავალდებულო ველი'
        }

        if(!userInfoObj.mail) {
            errorsObj.mail = 'მეილი არ უნდა იყოს ცარიელი'
        }

        if(userInfoObj.mail && !mailValid(userInfoObj.mail)) {
            errorsObj.mail = 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით'
        }

        if(!userInfoObj.phone || !String(userInfoObj.phone).trim()) {
            errorsObj.phone = 'ტელეფონის ნომერი არ უნდა იყოს ცარიელი'
        }

        if(userInfoObj.phone) {
            if(!numberValid(userInfoObj.phone)) {
                errorsObj.phone = 'არასწორი ფორმატი!!!'
            }
        }

        setErrors(errorsObj)
    }


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
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                firstName: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.firstName}
                        requirements={
                                    errors.firstName? 
                                        (
                                            <p className='error-class'>
                                                {errors.firstName}
                                            </p> 
                                        ):
                                        (
                                            <p>
                                                მინიმუმ 2 სიმბოლო, ქართული ასოები
                                            </p>
                                        )
                                    }
                    /> 
                    <Input 
                        label='გვარი'
                        placeholder='ბაგრატიონი'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                lastName: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.lastName}
                        requirements={
                                errors.lastName? 
                                    (
                                        <p className='error-class'>
                                            {errors.lastName}
                                        </p> 
                                    ):
                                    (
                                        <p>
                                            მინიმუმ 2 სიმბოლო, ქართული ასოები
                                        </p>
                                    )
                                }
                    /> 
                </div>
                <div className='form-selectors'>
                    <Dropdown 
                        selectValue={userInfoObj.team || 'team'}
                        optionValue='team'
                        defaultName='თიმი'
                        options={teamsOptions}
                        requirements={
                                    errors.team? 
                                        (
                                            <p className='error-class'>
                                                {errors.team}
                                            </p> 
                                        ):''
                                    }
                    
                        handleFunction={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                team: event.target.value,
                                position: null
                            }));
                        }}
                    />
                    <Dropdown 
                        selectValue={userInfoObj.position || 'position'}
                        optionValue='position'
                        defaultName='პოზიცია'
                        options={positionsOptions}
                        requirements={
                                    errors.position? 
                                        (
                                            <p className='error-class'>
                                                {errors.position}
                                            </p> 
                                        ):''
                                    }
                        handleFunction={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                position: event.target.value
                            }));
                            console.log(event.target.value)
                        }}
                    />
                </div>
                <div className='flex-column'>
                    <Input 
                        type='email'
                        name='email'
                        label='მეილი'
                        placeholder='grish666@redberry.ge'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                mail: event.target.value
                            }))
                        }}
                        value={userInfoObj.mail}
                        requirements={
                                    errors.mail? 
                                        (
                                            <p className='error-class'>
                                                {errors.mail}
                                            </p> 
                                        ):
                                        (
                                            <p>
                                               უნდა მთავრდებოდეს @redberry.ge-ით
                                            </p>
                                        )
                                    }
                    /> 
                    <Input 
                        label='ტელეფონის ნომერი'
                        placeholder='+995 598 00 07 01'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                phone: event.target.value
                            }))
                        }}
                        value={userInfoObj.phone || '+995'}
                        requirements={
                                    errors.phone? 
                                        (
                                            <p className='error-class'>
                                                {errors.phone}
                                            </p> 
                                        ):
                                        (
                                            <p>
                                                უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
                                            </p>
                                        )
                                    }
                    /> 
                </div>
                <Button 
                    className='button' 
                    text='შემდეგი'
                    handleFunction={onSubmitClick}
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

export default UserInfo