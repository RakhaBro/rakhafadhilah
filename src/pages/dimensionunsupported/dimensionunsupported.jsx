import React, { useContext } from "react";
import "./dimensionunsupported.css";
import { DimensionContext } from "../../providers/dimensionProvider";

const DimensionUnsupported = React.memo(() => {

    const { without3d, setWithout3D } = useContext(DimensionContext);

    return(
        <div className="dimension_unsupported">
            <img src={"./assets/img/people/rakha.webp"} alt="" />
            <br />
            <h1 className="gradient_text">Open in Desktop!</h1>
            <p>
                This is a <span>3D website</span>.
                You will need <span>larger screen</span> for the great <span>experience</span>!
            </p>
            <br />
            <button onClick={() => setWithout3D(true)}>Open Without 3D</button>
        </div>
    );
})

export default DimensionUnsupported;