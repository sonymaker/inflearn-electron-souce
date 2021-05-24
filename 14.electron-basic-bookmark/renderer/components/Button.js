import React from "react";

const Button = (props) => {
    function onClick(event) {
        if(!props.active){
            props.setType(props.type);
        }
    }

    return (
        <button className={props.active ? "btn btn-default active" : "btn btn-default"} onClick={onClick}>
            <span className={`icon ${props.icon}`}></span>
        </button>
    );
};

export default Button;
