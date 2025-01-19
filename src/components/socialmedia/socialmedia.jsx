import React, { useState, useEffect } from "react";
import "./socialmedia.css";

const SocialMedia = React.memo(({scrollPosition}) => {

    const [chosenSocialMedia, setChosenSocialMedia] = useState(null);
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if(chosenSocialMedia == null) return;
        switch(chosenSocialMedia) {
            case "Linkedin":
                setUrl("https://www.linkedin.com/in/rakha-fadhilah-technopreneur");
                break;
            case "Instagram":
                setUrl("https://www.instagram.com/rakha__fadhilah");
                break;
            case "Github":
                setUrl("https://www.github.com/rakhabro");
                break;
            default:
                setUrl(null);
        }
    }, [chosenSocialMedia]);

    const openPage = (url) => {
        if(url == null) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return(
        <div className="social_media_container"
            onMouseLeave={() => setChosenSocialMedia(null)}
            style={{
                opacity: scrollPosition > 400 ? 0 : 1
            }}
        >
            <div className="social_media_list">
                
                {/* LINKEDIN */}
                <div className="social_media_item"
                    onMouseEnter={() => setChosenSocialMedia("Linkedin")}
                    onClick={() => openPage(url)}
                >
                    <img loading="lazy" src="./assets/img/media/linkedin_icon.webp" alt="Linkedin" />
                </div>

                {/* GITHUB */}
                <div className="social_media_item"
                    onMouseEnter={() => setChosenSocialMedia("Github")}
                    onClick={() => openPage(url)}
                >
                    <img loading="lazy" src="./assets/img/media/github_icon.webp" alt="Github" />
                </div>

                {/* INSTAGRAM */}
                <div className="social_media_item"
                    onMouseEnter={() => setChosenSocialMedia("Instagram")}
                    onClick={() => openPage(url)}
                >
                    <img loading="lazy" src="./assets/img/media/instagram_icon.webp" alt="Instagram" />
                </div>

            </div>
        </div>
    );
});

export default SocialMedia;