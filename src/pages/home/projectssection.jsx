import React from "react";
import data_of_projects from "../../data/projects";
import ProjectItem from "../../components/projectitem/projectitem";

const ProjectsSection = React.memo(({ projectSectionRef, projectPhaseProgress }) => {

    return (
        <div
            className="section section_project"
            ref={projectSectionRef}
            style={{
                opacity: projectPhaseProgress > 0.5 ? 1 : 0,
                filter: `blur(${projectPhaseProgress > 0.5 ? 0 : 16}px)`
            }}
        >
            <div className="projects_container">
                <div className="title">
                    <h1 className="gradient_text">Project Highlights</h1>
                    <h2>From 2023 to {new Date().getFullYear()}</h2>
                </div>
                <div className="projects_content">

                    {
                        data_of_projects.map((projectData, index) => {
                            return (
                                <ProjectItem
                                    key={index}
                                    data={projectData}
                                />
                            );
                        })
                    }

                </div>
            </div>
        </div>
    );
});

export default ProjectsSection;