import React, { useContext } from "react";
import "./popup.css";
import { PopupContext } from "../../providers/popupProvider";
import Icon_Close from "../icons/closeIcon";

const Popup = React.memo(() => {

    const {popupChild, setPopupChild} = useContext(PopupContext);

    return(
        <>
            {
                popupChild &&
                <div className="popup_container"
                    style={{
                        opacity: popupChild != null ? 1 : 0
                    }}
                >
                    <div className="popup_content">
                        {popupChild}
                        <button className="btn_close neum" onClick={() => setPopupChild(null)}>
                            <Icon_Close dimension={20} />
                        </button>
                    </div>
                </div>
            }
        </>
    );
});

export default Popup;