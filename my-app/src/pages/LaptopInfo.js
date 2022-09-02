import React, { useEffect, useState } from 'react'
import './laptopInfo.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import redberryLogo from '../assets/redberryLogo.svg'
import './laptopInfo.css'
import FileUpload from '../components/FileUpload'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import { reqWithoutBody } from '../services/ApiService'
import Button from '../components/Button'
import { laptopNameValidaton } from '../services/LaptopNameValidation'

function LaptopInfo(props) {

    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')) || {});
    const [brands, setBrands] = useState([]);
    const [cpus, setCpus] = useState([]);
    const [errors, setErrors] = useState([])

    console.log(userInfoObj)
    useEffect(() => {
        const getBrandsData = async () => {
            const brandsList = await reqWithoutBody('brands','GET');
            setBrands(brandsList.data)
        }
        getBrandsData();
    }, []);

    useEffect(() => {
        const getCpusData = async () => {
            const cpuList = await reqWithoutBody('cpus','GET');
            setCpus(cpuList.data)
        }
        getCpusData();
    }, []);

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
    }, [userInfoObj]);

    const onSubmitClick = () => {
        const errorsObj = {};

        if(!userInfoObj.laptopName || !userInfoObj.laptopName.trim()) {
            errorsObj.laptopName = "ლეპტოპის სახელი არ უნდა იყოს ცარიელი"
        }

        if(userInfoObj.laptopName && !laptopNameValidaton(userInfoObj.laptopName)) {
            errorsObj.laptopName = "გამოიყენეთ მხოლოდ ლათინური ასოები, ციფრები და !@#$%^&*()_+="
        }

        if(!userInfoObj.CpuCore || !userInfoObj.CpuCore.trim()) {
            errorsObj.CpuCore = 'შეიყვანეთ CPU-ს ბირთვი'
        }

        if(userInfoObj.CpuCore && !Number(userInfoObj.CpuCore)) {
            errorsObj.CpuCore = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.CpuStream || !userInfoObj.CpuStream.trim()) {
            errorsObj.CpuStream = 'შეიყვანეთ CPU-ს ნაკადი'
        }

        if(userInfoObj.CpuStream && !Number(userInfoObj.CpuStream)) {
            errorsObj.CpuStream = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.RAM || !userInfoObj.RAM.trim()) {
            errorsObj.RAM = 'შეიყვანეთ ლეპტოპის RAM'
        }

        if(userInfoObj.RAM && !Number(userInfoObj.RAM)) {
            errorsObj.RAM = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.price || !userInfoObj.price.trim()) {
            errorsObj.price = 'შეიყვანეთ ლეპტოპის ფასი'
        }

        if(userInfoObj.price && !Number(userInfoObj.price)) {
            errorsObj.price = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        setErrors(errorsObj);
    }

    const brandsOptions = brands.map((singleTeam) => {
        return (
            <option key={singleTeam.id} id={singleTeam.id}>
                {singleTeam.name}
            </option>
        );
    });

    const cpusOptions = cpus.map((singleTeam) => {
        return (
            <option key={singleTeam.id} id={singleTeam.id}>
                {singleTeam.name}
            </option>
        );
    });

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
                    <p className='route-name'>თანამშრომლის ინფო</p>
                <div className='center-align'>
                <p className='route-name'>ლეპტოპის მახასიათებლები</p>
                    <div id='underline' />
                </div>
            </div>
            <div className='form-container'>
                <FileUpload 
                    alt='laptop-image-upload'
                    id='laptopImg'
                />
                <div className='flex-row'>
                    <Input 
                        placeholder="HP"
                        label="ლეპტოპის სახელი"
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptopName: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.laptopName}
                        requirements={
                            errors.laptopName? 
                                (
                                    <p className='error-class'>
                                        {errors.laptopName}
                                    </p> 
                                ):
                                (
                                    <p>
                                        ლათინური ასოები, ციფრები, !@#$%^&*()_+= 
                                    </p>
                                )
                            }
                        />
                    <Dropdown 
                        options={brandsOptions}
                    />
                </div>
                <hr />
                <div className='flex-row'>
                    <Dropdown 
                        options={cpusOptions}
                    />
                    <Input 
                        placeholder="14"
                        label="CPU-ს ბირთვი"
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                CpuCore: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.CpuCore}
                        requirements={
                            errors.CpuCore? 
                                (
                                    <p className='error-class'>
                                        {errors.CpuCore}
                                    </p> 
                                ):
                                (
                                    <p>
                                        გამოიყენეთ მხოლოდ ციფრები
                                    </p>
                                )
                            }
                        />
                    <Input 
                        placeholder="365"
                        label="CPU-ს ნაკადი"
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                CpuStream: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.CpuStream}
                        requirements={
                            errors.CpuStream? 
                                (
                                    <p className='error-class'>
                                        {errors.CpuStream}
                                    </p> 
                                ):
                                (
                                    <p>
                                        გამოიყენეთ მხოლოდ ციფრები
                                    </p>
                                )
                            }
                    />
                </div>
                <div className='flex-row'>
                    <Input 
                        placeholder='16'
                        label='ლეპტოპის RAM (GB)'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                RAM: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.RAM}
                        requirements={
                            errors.RAM? 
                                (
                                    <p className='error-class'>
                                        {errors.RAM}
                                    </p> 
                                ):
                                (
                                    <p>
                                        გამოიყენეთ მხოლოდ ციფრები
                                    </p>
                                )
                            }
                        />
                    <p>მეხსიერების ტიპი</p>
                    <div className='flex-row'>
                        <input type='radio' id='HDD'/>
                        <label htmforlFor='HDD'>HDD</label>
                        <input type='radio' id='SSD'/>
                        <label htmforlFor='HDD'>SSD</label>
                    </div>
                </div>
                <hr />
                <div className='flex-row'>
                    <Input 
                        placeholder='დდ / თთ / წწწწ'
                        type='date'
                        label='შეძენის რიცხვი (არჩევითი)'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                boughtDate: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.boughtDate}
                    />
                    <Input 
                        placeholder='0000'
                        label='ლეპტოპის ფასი'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                price: event.target.value.trim()
                            }))
                        }}
                        value={userInfoObj.price}
                        requirements={
                            errors.price? 
                                (
                                    <p className='error-class'>
                                        {errors.price}
                                    </p> 
                                ):
                                (
                                    <p>
                                        გამოიყენეთ მხოლოდ ციფრები
                                    </p>
                                )
                            }
                        />
                </div>
                <div>
                    <p>ლეპტოპის მდგომარეობა</p>
                    <input type='radio' id='new'/>
                    <label htmforlFor='HDD'>ახალი</label>
                    <input type='radio' id='used'/>
                    <label htmforlFor='HDD'>მეორადი</label>
                </div>
                <div>
                <button>უკან</button>
                <Button 
                    className='button'
                    text='დამახსოვრება'
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

export default LaptopInfo