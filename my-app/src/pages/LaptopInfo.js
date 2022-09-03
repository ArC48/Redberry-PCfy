import React, { useEffect, useState } from 'react'
import './laptopInfo.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import redberryLogo from '../assets/redberryLogo.svg'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import { reqWithoutBody } from '../services/ApiService'
import Button from '../components/Button'
import { laptopNameValidaton } from '../services/LaptopNameValidation'
import { useDropzone } from 'react-dropzone'
import mark from '../assets/mark.png'
import lari from '../assets/lari.png'
import warning from '../assets/warning.png'


function LaptopInfo(props) {

    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')));
    const [brands, setBrands] = useState([]);
    const [cpus, setCpus] = useState([]);
    const [errors, setErrors] = useState([])
    // const [storageType, setStorageType] = useState('')
    
    console.log(userInfoObj)
    
     // test code
    // const [specsInfo, setSpecsInfo] = useState({
    // image: [],
    // });

  const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
          setUserInfoObj((prev) => ({
              ...prev,
              laptop : {
                ...prev.laptop,
                image: acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
              ),
              }
            }));
        },
    });

   const receivedImage = userInfoObj.laptop.image? 
    userInfoObj.laptop.image.map((file) => (
        <img
        key={file.name}
        src={file.preview}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        alt="laptop"
        />
        )): '';


   const handleCancel = () => {
    setUserInfoObj((prev) => ({
              ...prev,
              laptop : {
                ...prev.laptop,
                image: []
              }
            }));
  };

    /////////////////////////////
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

        if(!userInfoObj.laptop.name || !userInfoObj.laptop.name.trim()) {
            errorsObj.laptopName = "ლეპტოპის სახელი არ უნდა იყოს ცარიელი"
        }

        if(userInfoObj.laptop.name && !laptopNameValidaton(userInfoObj.laptop.name)) {
            errorsObj.laptopName = "გამოიყენეთ ლათინური ასოები, ციფრები, !@#$%^&*()_+="
        }
        
        if(!userInfoObj.laptop.brand) {
            errorsObj.brand = "სავალდებულო ველი"
        }

        if(!userInfoObj.laptop.cpu) {
            errorsObj.cpu = "სავალდებულო ველი"
        }

        if(!userInfoObj.laptop.storageType) {
            errorsObj.storageType = "სავალდებულო ველი"
        }

        if(!userInfoObj.laptop.CpuCore || !userInfoObj.laptop.CpuCore.trim()) {
            errorsObj.CpuCore = 'შეიყვანეთ CPU-ს ბირთვი'
        }

        if(userInfoObj.laptop.CpuCore && !Number(userInfoObj.laptop.CpuCore)) {
            errorsObj.CpuCore = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.laptop.CpuStream || !userInfoObj.laptop.CpuStream.trim()) {
            errorsObj.CpuStream = 'შეიყვანეთ CPU-ს ნაკადი'
        }

        if(userInfoObj.laptop.CpuStream && !Number(userInfoObj.laptop.CpuStream)) {
            errorsObj.CpuStream = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.laptop.RAM || !userInfoObj.laptop.RAM.trim()) {
            errorsObj.RAM = 'შეიყვანეთ ლეპტოპის RAM'
        }

        if(userInfoObj.laptop.RAM && !Number(userInfoObj.laptop.RAM)) {
            errorsObj.RAM = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.laptop.price || !userInfoObj.laptop.price.trim()) {
            errorsObj.price = 'შეიყვანეთ ლეპტოპის ფასი'
        }

        if(userInfoObj.laptop.price && !Number(userInfoObj.laptop.price)) {
            errorsObj.price = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!userInfoObj.laptop.condition) {
            errorsObj.condition = "სავალდებულო ველი"
        }

        if(!userInfoObj.laptop.image) {
            errorsObj.image = "სავალდებულო ველი"
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
            <div className='laptop-form-container'>

                <div 
                    className={errors.image? 
                        'img-container margin-bottom error-img-container'
                        :
                        'img-container margin-bottom normal-img-container'
                    }
                >
                    {userInfoObj.laptop.image.length > 0 ? (
                <div className="uploadedImg">
                    {receivedImage}
                    <div className='space-between'>
                        <div className="flex-row">
                            <Image 
                                imgClass="mark"
                                img={mark}
                            />
                            <p className='margin-top'>
                            {userInfoObj.laptop.image[0].path.length > 50? 
                            userInfoObj.laptop.image[0].path.slice(0,45) + '...' 
                            + userInfoObj.laptop.image[0].path.slice(-5)
                            :
                            userInfoObj.laptop.image[0].path
                            }
                            </p>
                        </div>
                        <button 
                            className="removePic-btn button"
                            onClick={handleCancel}>
                                თავიდან ატვირთე
                        </button>
                    </div>
                </div>
                ) : (
                <div class="upload-img-container" {...getRootProps()}>
                    <p 
                    className={errors.image?
                    'error-text' : 'normal-text'
                    }
                    id="dropUploadText"
                    >
                        ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                    </p>
                    <Button
                        className="uploadLink button"
                        
                        text="ატვირთე"
                    />
                    <input
                        id="uploadImgInput"
                        name="uploadImgInput"
                        {...getInputProps()}
                    />
                </div>
        )}
                </div>
                <div className='stretch-row'>
                    <Input
                        inputClass={errors.laptopName? 'halfway-input input-class input-error' : 'halfway-input input-class'}
                        labelClass={errors.laptopName? 'error-class label' : 'label'}
                        placeholder="HP"
                        label="ლეპტოპის სახელი"
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop : {
                                    ...prev.laptop,
                                    name: event.target.value.trim()
                                } 
                            }))
                        }}
                        value={userInfoObj.laptop.name? userInfoObj.laptop.name:''}
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
                            dropdownClass={errors.brand? "dropdown-error dropdown dropdown-halfway":"dropdown dropdown-halfway"}
                            selectValue={userInfoObj.laptop.brand || 'brand'}
                            optionValue='brand'
                            defaultName='ლეპტოპის ბრენდი'
                            options={brandsOptions}
                            handleFunction={(event) => {
                                setUserInfoObj((prev) => ({
                                    ...prev,
                                    laptop: {
                                        ...prev.laptop,
                                        brand: event.target.value
                                    }
                                }));
                            }}
                        />
                </div>
                <hr className='hr'/>
                <div className='flex-row justify-center'>
                    <Dropdown 
                        dropdownClass={errors.cpu? "dropdown-error dropdown third-width":"dropdown third-width"}
                        selectValue={userInfoObj.laptop.cpu || 'cpu'}
                        optionValue='cpu'
                        defaultName='CPU'
                        options={cpusOptions}
                        handleFunction={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop: {
                                    ...prev.laptop,
                                    cpu: event.target.value
                                }
                            }));
                        }}
                    />
                    <Input 
                        inputClass={errors.CpuCore? 'input-class input-error' : 'input-class'}
                        labelClass={errors.CpuCore? 'error-class label' : 'label'}
                        placeholder="14"
                        label="CPU-ს ბირთვი"
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop: {
                                    ...prev.laptop,
                                    CpuCore: event.target.value.trim()
                                }
                            }))
                        }}
                        value={userInfoObj.laptop.CpuCore}
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
                        inputClass={errors.CpuStream? 'input-class input-error' : 'input-class'}
                        labelClass={errors.CpuStream? 'error-class label' : 'label'}
                        placeholder="365"
                        label="CPU-ს ნაკადი"
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop: {
                                    ...prev.laptop,
                                    CpuStream: event.target.value.trim()
                                    }
                                }))
                        }}
                        value={userInfoObj.laptop.CpuStream}
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
                        inputClass={errors.RAM? 'flex-start halfway-input input-class input-error' : 'flex-start halfway-input input-class'}
                        labelClass={errors.RAM? 'error-class label' : 'label'}
                        placeholder='16'
                        label='ლეპტოპის RAM (GB)'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop: {
                                    ...prev.laptop,
                                    RAM: event.target.value.trim()
                                }
                            }))
                        }}
                        value={userInfoObj.laptop.RAM}
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
                        <div class="flex-column">
                            <div class="flex-row">
                                <p
                                    className={errors.storageType? 'error-text margin-right':'basic-text margin-right'}
                                >
                                მეხსიერების ტიპი</p>
                                {errors.storageType && 
                                    <Image 
                                        img={warning}
                                        height='20px'
                                        width='20px'
                                    />
                                }
                            </div>
                            <div className='flex-row'>
                                <input 
                                    className='radio'
                                    type='radio' 
                                    id='SSD'
                                    name={userInfoObj.laptop.storageType}
                                    value='SSD'
                                    checked={userInfoObj.laptop.storageType === 'SSD'}
                                    onChange={(event) => {
                                        setUserInfoObj(prev => ({
                                            ...prev,
                                            laptop: {
                                                ...prev.laptop,
                                                storageType: event.target.value
                                            }
                                        }))
                                    }}
                                />
                                <label id='SSD' htmforlFor='SSD'>SSD</label>
                                <input 
                                    className='radio'
                                    type='radio' 
                                    id='HDD'
                                    name={userInfoObj.laptop.storageType}
                                    value='HDD'
                                    checked={userInfoObj.laptop.storageType === 'HDD'}
                                    onChange={(event) => {
                                        setUserInfoObj(prev => ({
                                            ...prev,
                                            laptop: {
                                                ...prev.laptop,
                                                storageType: event.target.value
                                            }
                                        }))
                                    }}
                                />
                                <label id="HDD" htmforlFor='HDD'>HDD</label>
                            </div>
                        </div>
                </div>
                <hr className='hr'/>
                <div className='flex-row'>
                    <Input 
                        inputClass='halfway-input input-class'
                        labelClass="label"
                        placeholder='დდ / თთ / წწწწ'
                        type='date'
                        label='შეძენის რიცხვი (არჩევითი)'
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop: {
                                    ...prev.laptop,
                                    boughtDate: event.target.value.trim()
                                }
                            }))
                        }}
                        value={userInfoObj.laptop.boughtDate}
                    />
                    <Input 
                        inputClass={errors.price? 'halfway-input input-class input-error' : 'halfway-input input-class'}
                        labelClass={errors.price? 'error-class label' : 'label'}
                        placeholder='0000'
                        label='ლეპტოპის ფასი'
                        span={
                            <Image 
                                img={lari}
                                width="20px"
                                height="20px"
                            />
                        }
                        onInput={(event) => {
                            setUserInfoObj((prev) => ({
                                ...prev,
                                laptop: {
                                    ...prev.laptop,
                                    price: event.target.value.trim()
                                }
                            }))
                        }}
                        value={userInfoObj.laptop.price}
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
                <div className='flex-column left-positioned'>
                    <div class="flex-row">
                        <p
                            className={errors.condition? 'error-text margin-right':'basic-text margin-right'}
                        >
                            ლეპტოპის მდგომარეობა
                        </p>
                            {errors.condition && 
                                        <Image 
                                            img={warning}
                                            height='20px'
                                            width='20px'
                                        />
                                    }
                    </div>
                    <div className='flex-row'>
                        <input 
                            className='radio'
                            type='radio' 
                            id='new'
                            name={userInfoObj.laptop.condition}
                            value='new'
                            checked={userInfoObj.laptop.condition === 'new'}
                            onChange={(event) => {
                                    setUserInfoObj(prev => ({
                                        ...prev,
                                        laptop: {
                                            ...prev.laptop,
                                            condition: event.target.value
                                        }
                                    }))
                                }}
                            />
                        <label id="new" htmforlFor='new'>ახალი</label>
                        <input 
                            className='radio'
                            type='radio' 
                            id='used'
                            name={userInfoObj.laptop.condition}
                            value='used'
                            checked={userInfoObj.laptop.condition === 'used'}
                            onChange={(event) => {
                                    setUserInfoObj(prev => ({
                                        ...prev,
                                        laptop: {
                                            ...prev.laptop,
                                            condition: event.target.value
                                        }
                                    }))
                                }}
                            />
                        <label id="used" htmforlFor='used'>მეორადი</label>
                    </div>
                </div>
                <div className='flex-row space-between padding-around'>
                    <button
                        id='back-btn'
                    >
                        უკან
                    </button>
                    <Button 
                        className='button save-btn'
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