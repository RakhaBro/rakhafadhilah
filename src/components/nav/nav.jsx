import React, { useEffect, useState } from "react";
import "./nav.css";

const Nav = React.memo(({buttonDataList, scroll}) => {
    
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (scroll < 100) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [scroll])
    
    return(
        <div className="nav" style={{opacity: opacity}}>
            {
                buttonDataList.map((data, index) => (
                    <button
                        key={index}
                        onClick={opacity != 0 ? data.onClick : null} className="nav_button"
                    >
                        {data.title}
                    </button>
                ))
            }

        </div>
    );
})

export default Nav;