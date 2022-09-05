import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

function UserInfo() {
    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')) || {});

    const [errors, setErrors] = useState([]);

    //dropdown options for user team & positions data
    const [teams, setTeams] = useState([]);
    const [positions, setPositions] = useState([]);
        
    const navigate = useNavigate();
    
    //get teams & positions data
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

    //set user information to localStorage on a state change
    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
    }, [userInfoObj]);

    // get teams' options elements
    const teamsOptions = teams.map((singleTeam) => {
        return (
            <option 
                key={singleTeam.id} 
                value={singleTeam.id} 
                id={singleTeam.id}
            >
                {singleTeam.name}
            </option>
        );
    });

    // get position's options elements based on the chosen team id
    const positionsOptions = positions.map((singlePos) => {
        const chosenTeam = teams.filter((e) => {
            if(e.id === Number(userInfoObj.team_id)) return true;
            return false;
        });

        if(chosenTeam.length && chosenTeam[0].id === singlePos.team_id) {
            return <option 
                    key={singlePos.id}
                    value={singlePos.id}
                    >
                        {singlePos.name}
                    </option>
        }

        return null;
    });

    // validations that are happening on submit button
    const onSubmitClick = () => {
        const errorsObj = {};

        if(!userInfoObj.name || !userInfoObj.name.trim()) {
            errorsObj.name = 'სახელი არ უნდა იყოს ცარიელი';
        };

        if(userInfoObj.name) {
            if(userInfoObj.name.length < 2) {
                errorsObj.name = 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
            };
            if(!langValid(userInfoObj.name)) {
                errorsObj.name = 'სახელი უნდა შეიცავდეს მხოლოდ ქართულ სიმბოლოებს';
            };
        };

        if(!userInfoObj.surname || !userInfoObj.surname.trim()) {
            errorsObj.surname = 'გვარი არ უნდა იყოს ცარიელი';
        };

        if(userInfoObj.surname){
            if(userInfoObj.surname.length < 2) {
            errorsObj.surname = 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
            };
            if(!langValid(userInfoObj.surname)) {
            errorsObj.surname = 'გვარი უნდა შეიცავდეს მხოლოდ ქართულ სიმბოლოებს';
            };
        };

        if(!userInfoObj.team_id) {
            errorsObj.team_id = 'სავალდებულო ველი';
        };

        if(!userInfoObj.position_id) {
            errorsObj.position_id = 'სავალდებულო ველი';
        };

        if(!userInfoObj.email) {
            errorsObj.email = 'მეილი არ უნდა იყოს ცარიელი';
        };

        if(userInfoObj.email && !mailValid(userInfoObj.email)) {
            errorsObj.email = 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით';
        };

        if(!userInfoObj.phone_number || !String(userInfoObj.phone_number).trim()) {
            errorsObj.phone_number = 'ტელეფონის ნომერი არ უნდა იყოს ცარიელი';
        };

        if(userInfoObj.phone_number) {
            if(!numberValid(userInfoObj.phone_number)) {
                errorsObj.phone_number = 'არასწორი ფორმატი, მაგალითი: +995558123456';
            };
        };

        if(Object.keys(errorsObj).length) {
            return setErrors(errorsObj);
        };
        return navigate('../form/laptopInfo');
    };


  return (
      <div>
        <div id='go-back'>
            <Link to="/">
                <Image 
                    className='arrow-back'
                    img={arrowBack}
                    alt='back'
                />
            </Link>
        </div>
        <div className='center-align'>
            <div className='routes'>
                <div className='center-align'>
                    <p className='route-name' id='path-user'>თანამშრომლის ინფო</p>
                    <div id='underline' />
                </div>
                <p className='route-name' id='path-laptop'>ლეპტოპის მახასიათებლები</p>
            </div>
            <div className='form-container'>
                <div className='flex-row justify-center name-surname-inputs'>
                    <Input 
                        inputClass={errors.name? 'name-input input-class input-error' : 'name-input input-class'}
                        labelClass={errors.name? 'error-class label' : 'label'}
                        label='სახელი'
                        placeholder='გრიშა'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                name: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.name}
                        requirements={
                                    errors.name? 
                                        (
                                            <p className='error-class'>
                                                {errors.name}
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
                        inputClass={errors.surname? 'name-input input-class input-error' : 'name-input input-class'}
                        labelClass={errors.surname? 'error-class label' : 'label'}
                        label='გვარი'
                        placeholder='ბაგრატიონი'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                surname: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.surname}
                        requirements={
                                errors.surname? 
                                    (
                                        <p className='error-class'>
                                            {errors.surname}
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
                        selectValue={userInfoObj.team_id || 'team_id'}
                        optionValue='team_id'
                        defaultName='თიმი'
                        options={teamsOptions}
                        dropdownClass={errors.team_id? "full-width dropdown-error dropdown":"full-width dropdown"}
                        handleFunction={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                team_id: event.target.value,
                                position_id: null
                            }));
                        }}
                    />
                    <Dropdown 
                        selectValue={userInfoObj.position_id || 'position_id'}
                        optionValue='position_id'
                        defaultName='პოზიცია'
                        options={positionsOptions}
                        dropdownClass={errors.position_id? "full-width dropdown-error dropdown":"full-width dropdown"}
                        handleFunction={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                position_id: event.target.value
                            }));
                        }}
                    />
                </div>
                <div className='flex-column'>
                    <Input 
                        inputClass={errors.email? 'full-width input-class input-error' : 'full-width input-class'}
                        labelClass={errors.email? 'error-class label' : 'label'}
                        type='email'
                        name='email'
                        label='მეილი'
                        placeholder='grish666@redberry.ge'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                email: event.target.value
                            }))
                        }}
                        value={userInfoObj.email}
                        requirements={
                                    errors.email? 
                                        (
                                            <p className='error-class'>
                                                {errors.email}
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
                        inputClass={errors.phone_number? 'full-width input-class input-error' : 'full-width input-class'}
                        labelClass={errors.phone_number? 'error-class label' : 'label'}
                        label='ტელეფონის ნომერი'
                        placeholder='+995 598 00 07 01'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                phone_number: event.target.value
                            }))
                        }}
                        value={userInfoObj.phone_number || '+995'}
                        requirements={
                                    errors.phone_number? 
                                        (
                                            <p className='error-class'>
                                                {errors.phone_number}
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
                <div className='align-right'>
                <Button 
                    className='button small-button' 
                    text='შემდეგი'
                    handleFunction={onSubmitClick}
                    />
                </div>
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