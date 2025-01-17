import data_of_skills from "../../data/skills";
import React, { useEffect, useRef, useState } from "react";
import Icon_Out from "../../assets/icons/outIcon";
import Icon_Chevron from "../../assets/icons/chevron_bottom";
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


    const attachedImagesRef = useRef();
    const [shownAttachedImageIndex, setShownAttachedImageIndex] = useState(0);
    
    const slideRight = () =>  {
        if (shownAttachedImageIndex < data.attachedimages.length - 1) {
            setShownAttachedImageIndex((prev) => prev + 1);
        }
    }

    const slideLeft = () => {
        if (shownAttachedImageIndex > 0) {
            setShownAttachedImageIndex((prev) => prev - 1);
        }
    }

    useEffect(() => {
        if (attachedImagesRef.current) {
            attachedImagesRef.current.scrollTo({
                left: attachedImagesRef.current.clientWidth * shownAttachedImageIndex,
                behavior: "smooth",
            });
        }
    }, [shownAttachedImageIndex]);

    return (
        <div className="projectdetail_container">
            
            <div className="left neum">
                <div className="cover">
                    <div className="img_container">
                        {
                            !isVideoStarted &&
                            <img loading="lazy" src={`./assets/img/projects/project_${data.cover}_clean.webp`} alt="" />
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
                                <Icon_Out dimension={12} color={"#4a4a4a"} />
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
                                        <img loading="lazy"
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

            <div className="right">
                {
                    data.attachedimages &&
                    <div className="attached_images neum">
                        <div className="attached_images_content" ref={attachedImagesRef}>
                            {
                                data.attachedimages &&
                                data.attachedimages.map((image, index) => {
                                    return (
                                        <div key={index} className="img_container">
                                            <img loading="lazy"
                                                src={`./assets/img/projects/attaches_${data.cover}/${image}.webp`}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {
                            data.attachedimages.length > 1 &&
                            <div className="attached_images_control">
                                <div>
                                    <div style={{
                                        transform: "rotate(90deg)",
                                        opacity: shownAttachedImageIndex == 0 ? 0.3 : 1,
                                    }}>
                                        <button
                                            className="btn_slide"
                                            onClick={slideLeft}
                                        >
                                            <Icon_Chevron dimension={16} color="#151515" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div style={{
                                        transform: "rotate(-90deg)",
                                        opacity: shownAttachedImageIndex == data.attachedimages.length - 1
                                            ? 0.3
                                            : 1,
                                    }}>
                                        <button
                                            className="btn_slide"
                                            onClick={slideRight}
                                        >
                                            <Icon_Chevron dimension={16} color="#151515" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
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
            <img loading="lazy"
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
                        <img loading="lazy"
                            onClick={() => openPage("https://www.linkedin.com/in/rakha-fadhilah-technopreneur")}
                            src="./assets/img/media/linkedin_icon.webp" alt=""
                        />
                        <img loading="lazy"
                            onClick={() => openPage("https://www.instagram.com/rakha__fadhilah")}
                            src="./assets/img/media/instagram_icon.webp" alt=""
                        />
                    </>
                    : <>
                        {
                            data.linkedin &&
                                <img loading="lazy"
                                    onClick={() => openPage(data.linkedin)}
                                    src="./assets/img/media/linkedin_icon.webp" alt=""
                                />
                        }
                            {
                                data.instagram &&
                                <img loading="lazy"
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