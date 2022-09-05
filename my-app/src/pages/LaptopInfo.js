import React, { useEffect, useState } from 'react'
import './laptopInfo.css'
import Image from '../components/Image'
import arrowBack from '../assets/arrowBack.svg'
import redberryLogo from '../assets/redberryLogo.svg'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import { postRequest, reqWithoutBody } from '../services/ApiService'
import Button from '../components/Button'
import { laptopNameValidaton } from '../services/LaptopNameValidation'
import { useDropzone } from 'react-dropzone'
import mark from '../assets/mark.png'
import lari from '../assets/lari.png'
import warning from '../assets/warning.png'
import { useNavigate } from 'react-router-dom'


function LaptopInfo(props) {

    const [laptopInfoObj, setLaptopInfoObj] = useState(
        JSON.parse(localStorage.getItem('laptopInfo')) || 
        {
        laptop_name: '',
        // laptop_image_base64: '',
        laptop_image: [],
        laptop_brand_id: '',
        laptop_cpu: '',
        laptop_cpu_cores: '',
        laptop_cpu_threads: '',
        laptop_ram: '',
        laptop_hard_drive_type: '',
        laptop_state: '',
        laptop_purchase_date: '',
        laptop_price: '',
    });
    const [brands, setBrands] = useState([]);
    const [cpus, setCpus] = useState([]);
    const [errors, setErrors] = useState([]);
    const formData = new FormData();

    const navigate = useNavigate();
    
     // test code
     console.log(laptopInfoObj)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);

      reader.addEventListener('load', () => {
        setLaptopInfoObj((prev) => ({
          ...prev,
          laptop_image_base64: reader.result,
          laptop_image: acceptedFiles[0],
        }));
      });
    },
  });

   const receivedImage = laptopInfoObj.laptop_image_base64? (
        <img
        // key={file.name}
        src={laptopInfoObj.laptop_image_base64}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        alt="laptop_pic"
        />
        ): '';


   const handleCancel = () => {
    setLaptopInfoObj((prev) => ({
              ...prev,
                laptop_image: '',
                laptop_image_base64: ''
            }
        ));
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
        localStorage.setItem('laptopInfo', JSON.stringify(laptopInfoObj));
    }, [laptopInfoObj]);


    const onSubmitClick = () => {
        const errorsObj = {};

        if(!laptopInfoObj.laptop_name || !laptopInfoObj.laptop_name.trim()) {
            errorsObj.laptopName = "ლეპტოპის სახელი არ უნდა იყოს ცარიელი"
        }

        if(laptopInfoObj.laptop_name && !laptopNameValidaton(laptopInfoObj.laptop_name)) {
            errorsObj.laptopName = "გამოიყენეთ ლათინური ასოები, ციფრები, !@#$%^&*()_+="
        }
        
        if(!laptopInfoObj.laptop_brand_id) {
            errorsObj.brand = "სავალდებულო ველი"
        }

        if(!laptopInfoObj.laptop_cpu) {
            errorsObj.cpu = "სავალდებულო ველი"
        }

        if(!laptopInfoObj.laptop_hard_drive_type) {
            errorsObj.storageType = "სავალდებულო ველი"
        }

        if(!laptopInfoObj.laptop_cpu_cores || !laptopInfoObj.laptop_cpu_cores.trim()) {
            errorsObj.CpuCore = 'შეიყვანეთ CPU-ს ბირთვი'
        }

        if(laptopInfoObj.laptop_cpu_cores && !Number(laptopInfoObj.laptop_cpu_cores)) {
            errorsObj.CpuCore = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!laptopInfoObj.laptop_cpu_threads || !laptopInfoObj.laptop_cpu_threads.trim()) {
            errorsObj.CpuStream = 'შეიყვანეთ CPU-ს ნაკადი'
        }

        if(laptopInfoObj.laptop_cpu_threads && !Number(laptopInfoObj.laptop_cpu_threads)) {
            errorsObj.CpuStream = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!laptopInfoObj.laptop_ram || !laptopInfoObj.laptop_ram.trim()) {
            errorsObj.RAM = 'შეიყვანეთ ლეპტოპის RAM'
        }

        if(laptopInfoObj.laptop_ram && !Number(laptopInfoObj.laptop_ram)) {
            errorsObj.RAM = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!laptopInfoObj.laptop_price || !laptopInfoObj.laptop_price.trim()) {
            errorsObj.price = 'შეიყვანეთ ლეპტოპის ფასი'
        }

        if(laptopInfoObj.laptop_price && !Number(laptopInfoObj.laptop_price)) {
            errorsObj.price = 'გამოიყენეთ მხოლოდ ციფრები'
        }

        if(!laptopInfoObj.laptop_state) {
            errorsObj.condition = "სავალდებულო ველი"
        }

        if(laptopInfoObj.laptop_image.size === undefined) {
            errorsObj.image = "სავალდებულო ველი"
        }

        setErrors(errorsObj);

        if(!Object.keys(errors).length) {
            const userInfoObj = JSON.parse(localStorage.getItem('userInfo'));

            const userFinalInfoObject = {
                name: userInfoObj.name,
                surname: userInfoObj.surname,
                team_id: Number(userInfoObj.team_id),
                position_id: Number(userInfoObj.position_id),
                phone_number: `${userInfoObj.phone_number}`,
                email: userInfoObj.email,
                token: '409dc6b87fa5f118fcf81cfe4538aca9',
                laptop_name: laptopInfoObj.laptop_name,
                laptop_brand_id: Number(laptopInfoObj.laptop_brand_id),
                laptop_image: laptopInfoObj.laptop_image,
                laptop_cpu: laptopInfoObj.laptop_cpu,
                laptop_cpu_cores: Number(laptopInfoObj.laptop_cpu_cores),
                laptop_cpu_threads: Number(laptopInfoObj.laptop_cpu_threads),
                laptop_ram: Number(laptopInfoObj.laptop_ram),
                laptop_hard_drive_type: laptopInfoObj.laptop_hard_drive_type,
                laptop_state: laptopInfoObj.laptop_state,
                laptop_purchase_date: laptopInfoObj.laptop_purchase_date,
                laptop_price: laptopInfoObj.laptop_price,
          };

          for(let i in userFinalInfoObject) {
            formData.append(i, userFinalInfoObject[i])
            // console.log(i, userFinalInfoObject[i])
          }
        //   console.log(userFinalInfoObject, formData)
          postRequest(formData)

        }
        
    }

    const brandsOptions = brands.map((singleBrand) => {
        return (
            <option key={singleBrand.id} value={singleBrand.id} id={singleBrand.id}>
                {singleBrand.name}
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
        <div
        >
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
                    {laptopInfoObj.laptop_image_base64.length > 0 ? (
                <div className="uploadedImg">
                    {receivedImage}
                    <div className='space-between'>
                        <div className="flex-row">
                            <Image 
                                imgClass="mark"
                                img={mark}
                            />
                            <p className='margin-top'>
                            laptop_image
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
                        className="halfway"
                        inputClass={errors.laptopName? 'halfway-input input-class input-error' : 'halfway-input input-class'}
                        labelClass={errors.laptopName? 'error-class label' : 'label'}
                        placeholder="HP"
                        label="ლეპტოპის სახელი"
                        onInput={(event) => {
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_name: event.target.value.trim()
                                } 
                            ))
                        }}
                        value={laptopInfoObj.laptop_name? laptopInfoObj.laptop_name:''}
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
                            dropdownClass={errors.brand? "dropdown-error dropdown dropdown-container-class":"dropdown dropdown-container-class"}
                            selectValue={laptopInfoObj.laptop_brand_id || 'brand'}
                            optionValue='brand'
                            defaultName='ლეპტოპის ბრენდი'
                            options={brandsOptions}
                            handleFunction={(event) => {
                                setLaptopInfoObj((prev) => ({
                                    ...prev,
                                    laptop_brand_id: event.target.value
                                    }
                                ));
                            }}
                        />
                </div>
                <hr className='hr'/>
                <div className='flex-row justify-center'>
                    <Dropdown 
                        dropdownClass={errors.cpu? "dropdown-error dropdown third-width":"dropdown third-width"}
                        selectValue={laptopInfoObj.laptop_cpu || 'cpu'}
                        optionValue='cpu'
                        defaultName='CPU'
                        options={cpusOptions}
                        handleFunction={(event) => {
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_cpu: event.target.value
                                }
                            ));
                        }}
                    />
                    <Input 
                        inputClass={errors.CpuCore? 'input-class input-error' : 'input-class'}
                        labelClass={errors.CpuCore? 'error-class label' : 'label'}
                        placeholder="14"
                        label="CPU-ს ბირთვი"
                        onInput={(event) => {
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_cpu_cores: event.target.value.trim()
                                }
                            ))
                        }}
                        value={laptopInfoObj.laptop_cpu_cores}
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
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_cpu_threads: event.target.value.trim()
                                }
                            ))
                        }}
                        value={laptopInfoObj.laptop_cpu_threads}
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
                        className='third'
                        inputClass={errors.RAM? 'flex-start halfway-input input-class input-error' : 'flex-start halfway-input input-class'}
                        labelClass={errors.RAM? 'error-class label' : 'label'}
                        placeholder='16'
                        label='ლეპტოპის RAM (GB)'
                        onInput={(event) => {
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_ram: event.target.value.trim()
                                }
                            ))
                        }}
                        value={laptopInfoObj.laptop_ram}
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
                                    name={laptopInfoObj.laptop_hard_drive_type}
                                    value='SSD'
                                    checked={laptopInfoObj.laptop_hard_drive_type  === 'SSD'}
                                    onChange={(event) => {
                                        setLaptopInfoObj(prev => ({
                                            ...prev,
                                            laptop_hard_drive_type : event.target.value
                                            }
                                        ))
                                    }}
                                />
                                <label id='SSD' htmforlFor='SSD'>SSD</label>
                                <input 
                                    className='radio'
                                    type='radio' 
                                    id='HDD'
                                    name={laptopInfoObj.laptop_hard_drive_type}
                                    value='HDD'
                                    checked={laptopInfoObj.laptop_hard_drive_type === 'HDD'}
                                    onChange={(event) => {
                                        setLaptopInfoObj(prev => ({
                                            ...prev,
                                            laptop_hard_drive_type: event.target.value
                                            }
                                        ))
                                    }}
                                />
                                <label id="HDD" htmforlFor='HDD'>HDD</label>
                            </div>
                        </div>
                </div>
                <hr className='hr'/>
                <div className='flex-row'>
                    <Input 
                        className='halfway'
                        inputClass=' input-class'
                        labelClass="label"
                        placeholder='დდ / თთ / წწწწ'
                        type='date'
                        label='შეძენის რიცხვი (არჩევითი)'
                        onInput={(event) => {
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_purchase_date: event.target.value.trim()
                                }
                            ))
                        }}
                        value={laptopInfoObj.laptop_purchase_date}
                    />
                    <Input 
                        className='halfway'
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
                            setLaptopInfoObj((prev) => ({
                                ...prev,
                                laptop_price: event.target.value.trim()
                                }
                            ))
                        }}
                        value={laptopInfoObj.laptop_price}
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
                            name={laptopInfoObj.laptop_state}
                            value='new'
                            checked={laptopInfoObj.laptop_state === 'new'}
                            onChange={(event) => {
                                    setLaptopInfoObj(prev => ({
                                        ...prev,
                                        laptop_state: event.target.value
                                        }
                                    ))
                                }}
                            />
                        <label id="new" htmforlFor='new'>ახალი</label>
                        <input 
                            className='radio'
                            type='radio' 
                            id='used'
                            name={laptopInfoObj.laptop_state}
                            value='used'
                            checked={laptopInfoObj.laptop_state  === 'used'}
                            onChange={(event) => {
                                    setLaptopInfoObj(prev => ({
                                        ...prev,
                                        laptop_state: event.target.value
                                        }
                                    ))
                                }}
                            />
                        <label id="used" htmforlFor='used'>მეორადი</label>
                    </div>
                </div>
                <div className='flex-row space-between padding-around'>
                    <button
                        id='back-btn'
                        onClick={() => {
                            navigate('../form/userInfo')
                        }}
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