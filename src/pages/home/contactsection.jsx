import React from "react";
import Form_EmailMessage from "../../forms/emailmessage/form_emailmessage";
import Footer from "../../components/footer/footer";

const ContactSection = React.memo(() => {
    return(
        <div className="section section_contact">
            <div className="contact_container">
                <div className="child_1">
                    <h1 className="gradient_text">Let us Connect</h1>
                    <Form_EmailMessage />
                </div>
                <div></div>
                <Footer />
            </div>
        </div>
    );
});

export default ContactSection;