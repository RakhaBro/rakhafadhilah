import React, { useState, useEffect } from "react";
import "./socialmedia.css";
import axios from "axios";

function SocialMedia() {

    const [chosenSocialMedia, setChosenSocialMedia] = useState(null);

    return(
        <div className="social_media_container"
            onMouseLeave={() => setChosenSocialMedia(null)}
        >
            <div className="social_media_list">
                
                {/* LINKEDIN */}
                <div className="social_media_item"
                    onMouseEnter={() => setChosenSocialMedia("Linkedin")}
                >
                    <img src="./assets/img/linkedin_icon.webp" alt="Linkedin" />
                </div>

                {/* GITHUB */}
                <div className="social_media_item"
                    onMouseEnter={() => setChosenSocialMedia("Github")}
                >
                    <img src="./assets/img/github_icon.webp" alt="Github" />
                </div>

                {/* INSTAGRAM */}
                <div className="social_media_item"
                    onMouseEnter={() => setChosenSocialMedia("Instagram")}
                >
                    <img src="./assets/img/instagram_icon.webp" alt="Instagram" />
                </div>

            </div>
            <SocialMediaDetail chosenSocialMedia={chosenSocialMedia} />
        </div>
    );
}







// DETAIL OF THE CHOSEN (HOVERED) SOCIAL MEDIA

const SocialMediaDetail = React.memo(({chosenSocialMedia}) => {

    const [url, setUrl] = useState(null);
    useEffect(() => {
        if(chosenSocialMedia == null) return;
        switch(chosenSocialMedia) {
            case "Linkedin":
                setUrl("https://www.linkedin.com/in/rakha-fadhilah-0b7b3a1b0");
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
        <div className="social_media_detail neum">

            {/* LINKEDIN */}
            {
                chosenSocialMedia == "Linkedin" &&
                <div className="social_media_detail_content">
                    <img src="https://media.licdn.com/dms/image/v2/D5603AQHXi95MAcQFiQ/profile-displayphoto-shrink_200_200/B56ZPSb_3_HIAc-/0/1734402375728?e=1740009600&v=beta&t=pJ_f6_GvW81Nkv3ggRdc8rZxNwSSowwL0MZezbjL_LY" alt="" />
                    <div className="social_media_linkedin_name">
                        <p><b>M. Rakha Fadhilah</b></p>
                        <p>Executive at Hiclob</p>
                    </div>
                </div>
            }

            {/* GITHUB */}
            {
                chosenSocialMedia == "Github" &&
                <div className="social_media_detail_content">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPknzxcv6g82da2kUra1MdvKR4ljz_Eg7_Aw&s" alt="" />
                    <div className="social_media_github_name">
                        <p><b>github.com/rakhabro</b></p>
                        <p>Rakha Fadhilah</p>
                    </div>
                </div>
            }

            {/* INSTAGRAM */}
            {
                chosenSocialMedia == "Instagram" &&
                <div className="social_media_detail_content">
                    <div className="social_media_detail_content_instagram_upper">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPknzxcv6g82da2kUra1MdvKR4ljz_Eg7_Aw&s" alt="" />
                        <div>
                            <p>120</p>
                            <p>Posts</p>
                        </div>
                        <div>
                            <p>1.355</p>
                            <p>Followers</p>
                        </div>
                        <div>
                            <p>560</p>
                            <p>Following</p>
                        </div>
                    </div>
                    <div className="social_media_instagram_name">
                        <p><b>@rakha__fadhilah</b></p>
                        <p>Rakha Fadhilah</p>
                    </div>
                </div>
            }

            <button
                onClick={() => openPage(url)}
                disabled={url == null}
            >
                Visit
            </button>
        </div>
    );
});




export default SocialMedia;