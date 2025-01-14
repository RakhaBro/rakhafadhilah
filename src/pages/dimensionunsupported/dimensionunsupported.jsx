import React from "react";
import "./dimensionunsupported.css";

const DimensionUnsupported = React.memo(() => {
    return(
        <div className="dimension_unsupported">
            <h1 className="gradient_text">Open in Desktop!</h1>
            <p>This is a 3D website. You will need larger screen for the great experience!</p>
        </div>
    );
})

export default DimensionUnsupported;