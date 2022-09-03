import React, { useEffect, useState } from 'react'
import './laptopInfo.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import redberryLogo from '../assets/redberryLogo.svg'
import FileUpload from '../components/FileUpload'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import { reqWithoutBody } from '../services/ApiService'
import Button from '../components/Button'
import { laptopNameValidaton } from '../services/LaptopNameValidation'
import { useDropzone } from 'react-dropzone'

function LaptopInfo(props) {
    // test code
    const [specsInfo, setSpecsInfo] = useState({
    image: [],
    });

    console.log(specsInfo)
  const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
          setSpecsInfo((oldSpecsInfo) => ({
              ...oldSpecsInfo,
              image: acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
              ),
            }));
        },
    });

   const images = specsInfo.image.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      style={{ width: '100%', height: '300px', objectFit: 'contain' }}
      alt="laptop"
    />
  ));

   const handleCancel = () => {
    setSpecsInfo((oldInfo) => ({
      ...oldInfo,
      image: [],
    }));
  };
    /////////////////////////////


    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')) || {});
    const [brands, setBrands] = useState([]);
    const [cpus, setCpus] = useState([]);
    const [errors, setErrors] = useState([])
    // const [storageType, setStorageType] = useState('')
    
    console.log(userInfoObj)
    // console.log(storageType)
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
            errorsObj.laptopName = "გამოიყენეთ მხოლოდ ლათინური ასოები, ციფრები და !@#$%^&*()_+="
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
                {/* <FileUpload 
                    alt='laptop-image-upload'
                    id='laptopImg'
                /> */}

                {specsInfo.image.length > 0 ? (
          <div id="uploadedImg">
            {images}
            <button onClick={handleCancel} id="cancelIcon">back</button>
          </div>
        ) : (
          <div id="uploadImgField" {...getRootProps()}>
            <p id="imgUploadTxt">ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
            <p id="uploadImgLabel">ატვირთე</p>
            <input
              id="uploadImgInput"
              name="uploadImgInput"
              {...getInputProps()}
            />
          </div>
        )}
                <div className='flex-row'>
                    <Input 
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
                        value={userInfoObj.laptop.name}
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
                        selectValue={userInfoObj.laptop.brand || 'brand'}
                        optionValue='brand'
                        defaultName='ლეპტოპის ბრენდი'
                        options={brandsOptions}
                        requirements={
                                    errors.brand? 
                                        (
                                            <p className='error-class'>
                                                {errors.brand}
                                            </p> 
                                        ):''
                                    }
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
                <hr />
                <div className='flex-row'>
                    <Dropdown 
                        selectValue={userInfoObj.laptop.cpu || 'cpu'}
                        optionValue='cpu'
                        defaultName='CPU'
                        options={cpusOptions}
                        requirements={
                                    errors.cpu? 
                                        (
                                            <p className='error-class'>
                                                {errors.cpu}
                                            </p> 
                                        ):''
                                    }
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
                    <p>მეხსიერების ტიპი</p>
                    <div className='flex-row'>
                        <input 
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
                        <label htmforlFor='HDD'>HDD</label>
                        <input 
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
                                laptop: {
                                    ...prev.laptop,
                                    boughtDate: event.target.value.trim()
                                }
                            }))
                        }}
                        value={userInfoObj.laptop.boughtDate}
                    />
                    <Input 
                        placeholder='0000'
                        label='ლეპტოპის ფასი'
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
                <div>
                    <p>ლეპტოპის მდგომარეობა</p>
                    <input 
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
                    <label htmforlFor='HDD'>ახალი</label>
                    <input 
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