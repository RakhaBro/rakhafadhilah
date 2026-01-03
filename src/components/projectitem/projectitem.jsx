import React, { useContext, lazy, Suspense } from "react";
import "./projectitem.css";
import { PopupContext } from "../../providers/popupProvider";
import data_of_skills from "../../data/skills";
import SoundManagement from "../soundmanagement/howler";

// Lazy load modal page
const ProjectDetail = lazy(() => import("../../pages/projectdetail/projectdetail"));

const ProjectItem = React.memo(({data}) => {

    const {setPopupChild} = useContext(PopupContext);

    const openProjectDetail = () => {
        SoundManagement.playSound('click_1');
        setPopupChild(
            <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
                <ProjectDetail data={data} />
            </Suspense>
        );
    }

    return(
        <div className="projectitem_container">
            <div className="projectitem neum">
                
                {
                    data.cover &&
                    <div className="projectitem_cover">
                        <img loading="lazy" src={`./assets/img/projects/project_${data.cover}.webp`} alt="" />
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
                                    loading="lazy"
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
                        <button onClick={openProjectDetail}>See detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default ProjectItem; 