import React, {useState} from 'react'
import './fileUpload.css'
import Image from './Image';

function FileUpload(props) {
    const [selectedImage, setSelectedImage] = useState(null);
  return (
      <div className='upload-pic-container'>
        <div className='upload-box'>
            { !selectedImage && <h3>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</h3>}
            {selectedImage && (
                <div className='align-center-box'>
                    {/* <Image 
                        width={"auto"}
                        height={'100%'}
                        alt='image not found'
                        img={URL.createObjectURL(selectedImage)}
                        />
                    <br /> */}
                    <p>{selectedImage.name.slice(0,20)}{selectedImage.name.slice(-4)}</p>
                    <button onClick={()=>setSelectedImage(null)}>ფოტოს წაშლა</button>
                </div>
            )}
             {!selectedImage && (<input
                type='file'
                alt={props.alt}
                id={props.id}
                name='laptopImg'
                onChange={(event) => {
                setSelectedImage(event.target.files[0]);
                }}
            />)}
            
        </div>
    </div>
  )
}

export default FileUpload