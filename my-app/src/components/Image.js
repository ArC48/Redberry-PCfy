import React from "react";

function Image(props) {
  return (
    <div className={props.className}>
      <img  
        className={props.imgClass}
        src={props.img} 
        alt={props.alt} 
        key={props.key}
        width={props.width}
        height={props.height}
        />
    </div>
  );
}

export default Image;
