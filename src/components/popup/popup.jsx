import React, { useContext, useEffect, useState } from "react";
import "./popup.css";
import { PopupContext } from "../../providers/popupProvider";
import Icon_Close from "../../assets/icons/closeIcon";

const Popup = React.memo(() => {

    const {popupChild, setPopupChild} = useContext(PopupContext);
    
    const [isPopupActive, setIsPopupActive] = useState(popupChild != null);

    const [isOpeningPopup, setIsOpeningPopup] = useState(false);
    useEffect(() => {
        if (popupChild != null) {
            setIsOpeningPopup(true);
            setTimeout(() => {
                setIsOpeningPopup(false);
                setIsPopupActive(true);
            }, 250);
        }
    }, [popupChild]);

    const [isClosingPopup, setIsClosingPopup] = useState(false);


    const closePopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setIsClosingPopup(false);
            setPopupChild(null);
            setIsPopupActive(false);
        }, 500);
    }

    return(
        <>
            {
                popupChild &&
                <div
                    className={
                        "popup_container"
                        + (isPopupActive ? " popup_active" : "")
                        + (isClosingPopup ? " popup_closing" : "")
                        + (isOpeningPopup ? " popup_opening" : "")
                    }
                >
                    <div className="popup_content">
                        {popupChild}
                        <button className="btn_close neum" onClick={closePopup}>
                            <Icon_Close dimension={20} />
                        </button>
                    </div>
                </div>
            }
        </>
    );
});

export default Popup;