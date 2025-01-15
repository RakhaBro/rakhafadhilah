import React, { useContext, useEffect, useState } from "react";
import "./nav.css";
import { UimodeContext } from "../../providers/uimodeProvider";
import Icon_Lightmode from "../../assets/icons/lightmode";
import Icon_Darkmode from "../../assets/icons/darkmode";

const Nav = React.memo(({buttonDataList, scroll}) => {

    const { uimode, setUimode } = useContext(UimodeContext);
    const switchUiMode = () => {
        if (uimode == "light") {
            setUimode("dark");
        } else if (uimode == "dark") {
            setUimode("light");
        }
    }
    
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (scroll < 100) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [scroll])
    
    return(
        <div className="nav">

            <div className="ui_mode_controller">
                <button onClick={switchUiMode}>
                    {
                        uimode == "light"
                        ? <Icon_Lightmode color={"#504e49"} dimension={24} />
                        : <Icon_Darkmode color={"#ffffff"} dimension={24} />
                    }
                </button>
            </div>
            
            <div className="nav_buttons" style={{opacity: opacity}} >
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

        </div>
    );
})

export default Nav;