import "./cursor.css";
import React from "react";

const CustomizedCursor = React.memo(({mousePosition, isMousePositionInitialized}) => {

    return(
        <div className="customizedcursor_container"
            style={{
                opacity: isMousePositionInitialized ? 1 : 0,
                left: `${
                    mousePosition.x != null &&
                    mousePosition.x * (window.innerWidth / 2) + (window.innerWidth / 2)
                }px`,
                top: `${
                    mousePosition.y != null &&
                    -mousePosition.y * (window.innerHeight / 2) + (window.innerHeight / 2)
                }px`
            }}
        >
            <div className="customizedcursor"></div>
        </div>
    );
});

export default CustomizedCursor;