import React from "react";

function Image(props) {
  return (
    <div className={props.className}>
      <img  
        src={props.img} 
        alt={props.alt} 
        width={props.width}
        height={props.height}
        />
    </div>
  );
}

export default Image;
