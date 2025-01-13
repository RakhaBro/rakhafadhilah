import React from "react";
import "./dimensionunsupported.css";

const DimensionUnsupported = React.memo(() => {
    return(
        <div className="dimension_unsupported">
            <h1>Open in Desktop!</h1>
            <p>You will need larger screen for the great experience!</p>
        </div>
    );
})

export default DimensionUnsupported;