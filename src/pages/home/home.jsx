import "./home.css";
import Icon_Chevron_Bottom from "../../assets/icons/chevron_bottom";
import Scene_Rakha from "../../scenes/rakhascene/rakhascene";
import { useState } from "react";
import SocialMedia from "../../components/socialmediadetail/socialmedia";

function Page_Home() {

    // MOUSE
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setMousePosition({
            x: (event.clientX - (window.innerWidth / 2)) / window.innerWidth * 2,
            y: (event.clientY - (window.innerHeight / 2)) / window.innerHeight * -2
        });
    };
    // ===============================================

    return(
        <div className="page_home">
            <div className="section_top" onMouseMove={handleMouseMove}>
                
                <div className="mainlayout">

                    <div className="maintitle">
                        <h1>Rakha Fadhilah</h1>
                        <p>
                            Executive at Hiclob | Front-End Developer
                        </p>
                    </div>

                </div>
                
                <Scene_Rakha mousePosition={mousePosition} />

                <SocialMedia />
                
            </div>

            <div className="section_top_transition"></div>

            <div className="section"></div>
        </div>
    );
}

export default Page_Home;