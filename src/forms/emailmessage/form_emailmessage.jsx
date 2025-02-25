import "./form_emailmessage.css";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Icon_Check from "../../assets/icons/checkIcon";
import SoundManagement from "../../components/soundmanagement/howler";

const Form_EmailMessage = React.memo(() => {

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (event.target.value == "") {
            setIsEmailValid(null);
        } else {
            setIsEmailValid(regex.test(event.target.value));
        }
    }

    const [message, setMessage] = useState("");
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const [isValid, setIsValid] = useState(null);
    const [error, setError] = useState("No error");

    useEffect(() => {
        if (isEmailValid == false) {
            setIsValid(false);
            setError("Email is invalid");
        } else if (email.length == 0 && message.length == 0) {
            setIsValid(null);
            setError("No error");
        } else if (email.length == 0 || message.length == 0) {
            setIsValid(null);
            setError("No error");
        } else {
            setIsValid(true);
        }
    }, [isEmailValid, email, message]);

    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = async () => {
        if (isValid != true || (email.length == 0 || message.length == 0)) {
            setIsValid(false);
            setError("Please fill all the inputs");
            return;
        }
        
        if (isSending || isSent) return;
        
        SoundManagement.playSound('click_1');
        
        setIsSending(true);
        
        await emailjs.send(
            "service_wjzkb19",
            "template_t9wngmq",
            {
                user_email: email,
                message: message,
            },
            "ElF8iaK58kt-UVRg4"
        )
        .then(
            (response) => {
                console.log("Email sent successfully!", response.status, response.text);
                setIsSent(true);
                setIsSending(false);
                SoundManagement.playSound('click_3');
                setEmail("");
                setMessage("");
            },
            (error) => {
                console.error("Failed to send email", error);
                setIsSending(false);
            }
        );
    }

    return (
        <div className="form_emailmessage">
            <p className={"invalid" + (isValid == false ? " invalid_active" : "")}>
                {error}
            </p>
            <input
                type="text" placeholder="example@anymail.com"
                value={email}
                onChange={handleEmailChange}
            />
            <textarea
                placeholder="Kindly type" rows={5}
                onChange={handleMessageChange}
                value={message}
            >
            </textarea>
            <div className="form_lower">
                <p>
                    {(() => {
                        if (isSent) {
                            return(
                                <>
                                    Thank you for messaging!
                                    <br />
                                    <span>I will respond as quickly as possible</span>
                                </>
                            )
                        } else {
                            return(
                                <>
                                    The message will be sent to
                                    <br />
                                    <span>my personal email.</span>
                                </>
                            );
                        }
                    })()}
                </p>
                <button className="send" onClick={sendEmail}>
                    {(() => {
                        if (isSent) {
                            return<>
                                Email sent
                                <Icon_Check dimension={12} />
                            </>
                        } else if (isSending) {
                            return "Sending..."
                        } else {
                            return "Send"
                        }
                    })()}
                </button>
            </div>
        </div>
    );
})

export default Form_EmailMessage;