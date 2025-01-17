import React, { useContext, useEffect, useState } from "react";
import "./giantround.css";
import { UimodeContext } from "../../providers/uimodeProvider";

const GiantRound = React.memo(({scroll}) => {

    const { uimode } = useContext(UimodeContext);

    const [opacity, setOpacity] = useState(1);
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {

        if (scroll == 0) {
            setTranslate({x: 0, y: 50});
        } else if (scroll <= 100) {
            setTranslate({x: 27, y: 50});
        } else if (scroll <= 200) {
            setTranslate({x: 0, y: 50});
        } else if (scroll <= 300) {
            setTranslate({x: -27, y: 0});
        } else if (scroll <= 400) {
            setTranslate({x: 27, y: 0});
        } else {
            setTranslate({x: 0, y: 50});
        }

        if ((scroll > 100 && scroll < 300) || (scroll > 400 && scroll < 600)) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [scroll]);

    return(
        <>
            {
                uimode == "light" &&
                <div className="giantround_container"
                    style={{opacity: opacity}}
                >
                    <div className="giantround_position"
                        style={{
                            transform: `translate(${translate.x}svw, ${translate.y}svh)`
                        }}
                    >
                        <div className="giantround_scale">
                            <div className="giantround_relative">
                                <div className="giantround"></div>
                                <div className="giantround_shadow1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
});

export default GiantRound;