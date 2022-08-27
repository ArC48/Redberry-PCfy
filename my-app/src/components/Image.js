import React from "react";

function Image(props) {
  return (
    <div>
      <img 
        className={props.className} 
        src={props.img} 
        alt={props.alt} 
        />
    </div>
  );
}

export default Image;
