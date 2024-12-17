import "./home.css";
import Icon_Chevron_Bottom from "../../assets/icons/chevron_bottom";
import Scene_Rakha from "../../scenes/rakhascene/rakhascene";

function Page_Home() {

    return(
        <div className="page_home">
            <div className="section_top">
                
                <div className="mainlayout">

                    <div className="maintitle">
                        <h1>Rakha Fadhilah</h1>
                        <p>
                            Executive at Hiclob | Three JS expert
                        </p>
                    </div>

                    <div className="mainlayout_left">
                        <div className="neum neum_hoverable">
                            <button><span className="gradient_text">Home</span></button>
                        </div>
                        <div className="neum neum_hoverable">
                            <button><span className="gradient_text">Projects</span></button>
                        </div>
                        <div className="neum neum_hoverable">
                            <button><span className="gradient_text">Contact</span></button>
                        </div>
                    </div>
                    <div className="mainlayout_right">
                        <div className="neum neum_hoverable">
                            <button>
                                <span className="gradient_text">See overview</span>
                                <Icon_Chevron_Bottom dimension={10} />
                            </button>
                        </div>
                    </div>
                </div>
                
                <Scene_Rakha />
                
            </div>

            <div className="section_top_transition"></div>

            <div className="section"></div>
        </div>
    );
}

export default Page_Home;