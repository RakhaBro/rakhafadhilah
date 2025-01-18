import React from "react";

const Icon_Check = React.memo(({dimension, color, className}) => {
    return(
        <svg className={className}
            width={!isNaN(dimension) ? dimension + "px" : "64px"}
            height={!isNaN(dimension) ? dimension + "px" : "64px"}
            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <path stroke={color ?? "#1b1b1f"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 5L8 15l-5-4"/> </g>
        </svg>
    );
});

export default Icon_Check;