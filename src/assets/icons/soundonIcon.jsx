import React from "react";

const Icon_SoundOn = React.memo(({dimension, color}) => {
    return(
        <svg
            width={!isNaN(dimension) ? (dimension + "px") : "64px"}
            height={!isNaN(dimension) ? (dimension + "px") : "64px"}
            xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 25 25"
        >
            <defs>
                <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#db7344", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#b21dcc", stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier">
                <path d="M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z"
                    fill="none" stroke={'url(#gradient)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03"
                    fill="none" stroke={'url(#gradient)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88"
                    fill="none" stroke={'url(#gradient)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </g>
        </svg>
    );
})

export default Icon_SoundOn;