import React from "react";
import "./footer.css";

const Footer = React.memo(() => {
    return(
        <div className="footer">
            <div></div>
            <p>
                &copy; Copyright of Rakha Fadhilah
                {/* <br />
                muhammad.rakha.fadhilah@gmail.com */}
            </p>
        </div>
    );
})

export default Footer;