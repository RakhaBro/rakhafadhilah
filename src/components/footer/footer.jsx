import React from "react";
import "./footer.css";

const Footer = React.memo(() => {
    return(
        <div className="footer">
            <div></div>
            <p>
                &copy; Copyright of Muhammad Rakha Fadhilah
                <br />
                muhammad.rakha.fadhilah@gmail.com
                <br />
                +62857-1148-1324
            </p>
        </div>
    );
})

export default Footer;