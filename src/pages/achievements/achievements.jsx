import React, { useEffect, useRef, useState } from "react";
import "./achievements.css";
import data_of_events from "../../data/achievement_events";
import Icon_Chevron from "../../assets/icons/chevron_bottom";
import data_of_certifications from "../../data/achievement_certifications";
import Icon_Out from "../../assets/icons/outIcon";

const Page_Achievements = React.memo(() => {

    const contentRef = useRef(null);
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                left: contentRef.current.clientWidth * activeSectionIndex,
                behavior: "smooth"
            })
        }
    }, [activeSectionIndex])

    return (
        <div className="page_achievements neum">
            <div className="section_controller">
                <button
                    className={activeSectionIndex == 0 ? "active_section" : ""}
                    onClick={() => setActiveSectionIndex(0)}
                    >
                    Events
                </button>

                <button
                    className={activeSectionIndex == 1 ? "active_section" : ""}
                    onClick={() => setActiveSectionIndex(1)}
                >
                    Certifications
                </button>
            </div>

            <div className="achievements_content" ref={contentRef}>
                <div className="events">
                    {
                        data_of_events.map((data, index) =>
                            <Item_Achievement key={index} index={index} data={data} />
                        )
                    }
                </div>

                <div className="certifications">
                    {
                        data_of_certifications.map((data, index) =>
                            <Item_Certification key={index} data={data} />
                        )
                    }
                </div>
            </div>


        </div>
    );
})

const Item_Achievement = React.memo(({ index, data }) => {

    const imagesRef = useRef(null);
    const [shownAttachedImageIndex, setShownAttachedImageIndex] = useState(0);
    useEffect(() => {
        if (imagesRef) {
            imagesRef.current.scrollTo({
                left: imagesRef.current.clientWidth * shownAttachedImageIndex,
                behavior: "smooth"
            });
        }
        autoSwapIndex.current = shownAttachedImageIndex;
    }, [shownAttachedImageIndex])

    const slideRight = () => {
        if (shownAttachedImageIndex < data.attachedimages.length - 1) {
            setShownAttachedImageIndex((prev) => prev + 1);
        }
    }

    const slideLeft = () => {
        if (shownAttachedImageIndex > 0) {
            setShownAttachedImageIndex((prev) => prev - 1);
        }   
    }

    const autoSwapIndex = useRef(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoSwapIndex.current < data.attachedimages.length - 1) {
                setShownAttachedImageIndex((prev) => prev + 1)
            }
            else {
                setShownAttachedImageIndex(0)
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className={"achievement_item" + (index % 2 != 0 ? " reversed" : "")}>

            {/* IMAGES */}
            <div className="img_container">

                {
                    data.attachedimages &&
                    <div className="images" ref={imagesRef}>
                        {
                            data.attachedimages.map((image) =>
                                <img
                                    loading="lazy"
                                    key={image}
                                    src={`./assets/img/achievement_events/${data.id}/${image}.webp`}
                                    alt=""
                                />
                            )
                        }
                    </div>
                }

                {
                    data.attachedimages && data.attachedimages.length > 1 &&
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
                                    <Icon_Chevron dimension={14} color="#151515" />
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
                                    <Icon_Chevron dimension={14} color="#151515" />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className={"right" + (index % 2 != 0 ? " reversed" : "")}>
                <div className={"title"}>
                    <h1>{data.title}</h1>
                    <p>{data.time}</p>
                </div>

                {data.description}

                <div className="btns_container">
                    {
                        data.relatedlink &&
                        <button onClick={() => window.open(data.relatedlink)}>
                            See more
                            <Icon_Out dimension={12} color={"black"} />
                        </button>
                    }
                    {
                        data.certification &&
                        <button>See Certification</button>
                    }
                </div>
            </div>
        </div>
    );
})


const Item_Certification = React.memo(({data}) => {
    return(
        <div className="certification_item">
            <img loading="lazy" src={`./assets/img/achievement_certifications/certif_${data.id}.webp`} alt="" />
            <div className="text">
                <p>{data.name}</p>
                <p>{data.year}</p>
            </div>
        </div>
    );
})

export default Page_Achievements;