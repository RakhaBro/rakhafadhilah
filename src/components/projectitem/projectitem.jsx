import React, { useContext } from "react";
import "./projectitem.css";
import { PopupContext } from "../../providers/popupProvider";
import ProjectDetail from "../../pages/projectdetail/projectdetail";
import data_of_skills from "../../models/skills";

const ProjectItem = React.memo(({data}) => {

    const {setPopupChild} = useContext(PopupContext);

    const openProjectDetail = () => {
        setPopupChild(
            <ProjectDetail data={data} />
        );
    }

    return(
        <div className="projectitem_container">
            <div className="projectitem neum"
                 onClick={openProjectDetail}
            >
                
                {
                    data.cover &&
                    <div className="projectitem_cover">
                        <img src={`./assets/img/projects/project_${data.cover}.webp`} alt="" />
                        <div className="projectitem_gradient"></div>
                    </div>
                }


                <div className="projectitem_content">

                    
                    <div className="title">
                        <h1>{data.title}</h1>
                        <p>
                            {data.team && "As "}
                            {data.role}
                        </p>
                    </div>

                    <div></div>
                    
                    <div className="description">
                        {data.description}
                    </div>

                    <div className="skills_related">
                        {
                            data.skills && data.skills.map((skill, index) => (
                                <img
                                    title={
                                        data_of_skills.find(item => item.id === skill).name
                                    }
                                    key={index}
                                    src={`./assets/img/skills/skill_${skill}.webp`} alt=""
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