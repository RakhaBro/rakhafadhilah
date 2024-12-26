import data_of_skills from "../../models/skills";
import React from "react";
import "./projectdetail.css";

const ProjectDetail = React.memo(({ data }) => {
    return (
        <div className="projectdetail_container">
            
            <div className="left">
                <iframe
                    className="neum"
                    width="460"
                    height="256"
                    src="https://www.youtube.com/embed/_jmYs17n448?si=YanoZcLUGk_BtGeb?autoplay=1"
                    allow={`
                        accelerometer; autoplay; clipboard-write;
                        encrypted-media; gyroscope;
                        picture-in-picture; web-share`
                    }
                    frameBorder={0}
                    allowFullScreen
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                <div className="project_secondary_information neum">
                </div>
            </div>

            <div className="right neum">
                <div className="cover">
                    <img src={`./assets/img/projects/project_${data.cover}.webp`} alt="" />
                    <div className="cover_gradient"></div>
                </div>
                <div className="content scroll-container">
                    <div className="upper">
                        <h1>{data.title}</h1>
                        {
                            data.link &&
                            <a
                                href={data.link}
                                target="_blank"
                                rel="noreferrer"
                                className="button"
                            >
                                {data.link}
                            </a>
                        }
                    </div>
                    <table border={0} cellSpacing={0}>
                        <tbody>
                            <tr>
                                <td>My role</td><td>:</td><td>{data.role}</td>
                            </tr>
                            
                            <tr>
                                <td>Specific contribution</td><td>:</td><td>{data.contribution}</td>
                            </tr>

                        </tbody>
                    </table>
                    {data.description}

                    <div className="skills_container">
                        <div className="skills_img">
                            {
                                data.skills.map((skill, index) => {
                                    return(
                                        <img
                                        src={`./assets/img/skills/skill_${skill}.webp`}
                                        alt=""
                                        />
                                    );
                                })
                            }
                        </div>
                        <div>
                            <p>
                                {
                                    data.skills.map((skill, index) => {
                                        const skillname = data_of_skills
                                            .find(skilldata => skilldata.id === skill)
                                            .name;
                                        return skillname + (index >= data.skills.length - 1 ? "" : ", ");
                                    })
                                }
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
});

export default ProjectDetail;