import React from "react";
import "./nav.css";

const Nav = React.memo(({buttonDataList}) => {
    return(
        <div className="nav">
            
            {
                buttonDataList.map((data, index) => (
                    <button key={index} onClick={data.onClick} className="nav_button">{data.title}</button>
                ))
            }

        </div>
    );
})

export default Nav;