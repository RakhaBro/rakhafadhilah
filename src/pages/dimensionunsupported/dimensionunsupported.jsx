import React, { useContext, useState } from "react";
import "./dimensionunsupported.css";
import { DimensionContext } from "../../providers/dimensionProvider";

const DimensionUnsupported = React.memo(() => {

    const { setWithout3D } = useContext(DimensionContext);
    const [initOpenWithout3D, setInitOpenWithout3D] = useState(false); 

    const openWithout3D = () => {
        setInitOpenWithout3D(true);
        setTimeout(() => {
            setWithout3D(true);
        }, 400);
    }

    return(
        <div className={"dimension_unsupported" + (initOpenWithout3D ? " init_openwithout3d" : "")}>
            <div className={"content" + (initOpenWithout3D ? " init_openwithout3d_content" : "")}>
                <img src={"./assets/img/people/rakha.webp"} alt="" />
                <br />
                <h1 className="gradient_text">3D in Desktop</h1>
                <p>
                    This is a <span>3D website</span>.
                    You will need <span>larger screen</span> for the great <span>experience</span>.
                </p>
                <br />
                <button onClick={openWithout3D}>Open Without 3D</button>
            </div>
        </div>
    );
})

export default DimensionUnsupported;