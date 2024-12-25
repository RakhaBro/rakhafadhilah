import React from "react";
import "./projectitem.css";

const ProjectItem = React.memo(({}) => {

    return(
        <div className="projectitem neum">
            <div className="projectitem_content">
                {/* <img src="./hiclob_poster_temp.jpg" alt="" /> */}
            </div>
            <div className="projectitem_gradient"></div>
        </div>
    );
})

export default ProjectItem; 