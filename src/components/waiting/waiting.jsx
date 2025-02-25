import React, { useContext, useEffect, useState } from "react";
import "./waiting.css";
import { LoadindicatorContext } from "../../providers/loadindicationProvider";

const Waiting = React.memo(() => {

    const { doneLoading } = useContext(LoadindicatorContext);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (doneLoading) {
            setTimeout(() => {
                setClosing(true);
            }, 400);
        }
    }, [doneLoading]);

    return(
        <div className={"waiting" + (closing ? " endWaiting" : "")}>
            <div className="waiting_content">
                {/* WAITING ELEMENT */}
                <div className="waiting_element">
                    <div className="child_1">
                    </div>
                    <div className="child_2">
                        <div className="child_2_1"></div>
                    </div>
                </div>
                
                <h2 className="gradient_text">Loading 3D Objects...</h2>
            </div>
        </div>
    );
});

export default Waiting;