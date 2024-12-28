import data_of_skills from "../../data/skills";
import React, { useEffect, useState } from "react";
import Icon_Out from "../../assets/icons/outIcon";
import "./projectdetail.css";

const ProjectDetail = React.memo(({ data }) => {

    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    useEffect(() => {
        if (isVideoReady) {
            setTimeout(() => {
                setIsVideoStarted(true);
            }, 250);
        }
    }, [isVideoReady]);


    return (
        <div className="projectdetail_container">
            
            <div className="left">
                <div className="left_top neum">
                </div>
                <div className="team_container neum">
                    <div className="title">
                        <h2>Team :</h2>
                    </div>
                    <div className="content">
                        <TeamPersonnel data={data} />
                        {
                            data.team &&
                            data.team.map((person, index) => {
                                return <TeamPersonnel key={index} data={person} />;
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="right neum">
                <div className="cover">
                    <div className="img_container">
                        {
                            !isVideoStarted &&
                            <img src={`./assets/img/projects/project_${data.cover}_clean.webp`} alt="" />
                        }
                        {
                            data.assetvideo &&
                            <video
                                autoPlay loop muted playsInline
                                onCanPlay={() => setIsVideoReady(true)}
                                style={{
                                    opacity: isVideoReady ? 1 : 0,
                                }}
                            >
                                <source src={data.assetvideo} type="video/webm" />
                                <p>Your browser doesn't support video tag</p>
                            </video>
                        }
                        <div className="upper">
                            <h1>{data.title}</h1>
                            <p>{data.timestarted} - {data.timefinished}</p>
                        </div>
                        {
                            data.link &&
                            <a href={data.link} target="_blank">
                                Visit {data.title}
                                <Icon_Out dimension={12} color={"#222"} />
                            </a>
                        }
                    </div>
                    <div className="cover_gradient"></div>
                </div>
                <div className="content scroll-container">
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
                                            key={index}
                                            src={`./assets/img/skills/skill_${skill}.webp`}
                                            title={data_of_skills.find(skilldata => skilldata.id === skill).name}
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

const TeamPersonnel = React.memo(({ data }) => {

    const isMyProfile = data.name == null;

    const openPage = (url) => {
        if(url == null) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    return(
        <div className="personnel">
            <img
                className="personnel_photo"
                src={data.photourl ?? "./assets/img/people/rakha.webp"} alt="" />
            <div className="personnel_info">
                <p><b>{data.name ?? "Rakha Fadhilah"}</b></p>
                <p>{data.role}</p>
            </div>
            <div className="media">
                {
                    isMyProfile
                    ? <>
                        <img
                            onClick={() => openPage("https://www.linkedin.com/in/rakha-fadhilah-technopreneur")}
                            src="./assets/img/media/linkedin_icon.webp" alt=""
                        />
                        <img
                            onClick={() => openPage("https://www.instagram.com/rakha__fadhilah")}
                            src="./assets/img/media/instagram_icon.webp" alt=""
                        />
                    </>
                    : <>
                        {
                            data.linkedin &&
                                <img
                                    onClick={() => openPage(data.linkedin)}
                                    src="./assets/img/media/linkedin_icon.webp" alt=""
                                />
                        }
                            {
                                data.instagram &&
                                <img
                                    onClick={() => openPage(data.instagram)}
                                    src="./assets/img/media/instagram_icon.webp" alt=""
                                />
                            }
                        </>
                }
            </div>
        </div>
    );
});

export default ProjectDetail;