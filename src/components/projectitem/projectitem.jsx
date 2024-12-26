import React, { useContext } from "react";
import "./projectitem.css";
import { PopupContext } from "../../providers/popupProvider";

const ProjectItem = React.memo(({title, description, cover, skills, role}) => {

    const {setPopupChild} = useContext(PopupContext);

    const openProjectDetail = () => {
        setPopupChild(
            <div className="neum" style={{padding: "20px"}}>
                <h1>Popup</h1>
                <p>This is a popup to give more detail information about something</p>
            </div>
        );
    }

    return(
        <div className="projectitem_container">
            <div className="projectitem neum"
                 onClick={openProjectDetail}
            >
                
                {
                    cover &&
                    <div className="projectitem_cover">
                        <img src={`./assets/img/projects/project_${cover}.webp`} alt="" />
                        <div className="projectitem_gradient"></div>
                    </div>
                }


                <div className="projectitem_content">

                    
                    <div className="title">
                        <h1>{title}</h1>
                        <p>{role}</p>
                    </div>

                    <div></div>
                    
                    <div className="description">
                        {description}
                    </div>

                    <div className="skills_related">
                        {
                            skills && skills.map((skillUrl, index) => (
                                <img
                                    key={index}
                                    src={`./assets/img/skills/skill_${skillUrl}.webp`} alt=""
                                />
                            ))
                        }
                    </div>

                    <div></div>

                    <div className="btn_container">
                        <button>See detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default ProjectItem; 