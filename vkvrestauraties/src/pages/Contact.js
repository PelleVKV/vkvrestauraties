import React, {useState} from "react";
import {
    MailFilled,
    PhoneFilled,
    HomeFilled,
    InstagramFilled,
    LinkedinFilled,
    FacebookFilled
} from "@ant-design/icons";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const setDelayedResponseMessage = (message) => {
        setResponseMessage(message);
        setTimeout(() => setResponseMessage(""), 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = { name, email, message };

        if (!name || !email || !message) {
            setIsSubmitting(false);
            return setDelayedResponseMessage("Please fill in all fields.");
        }

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_API + "/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setIsSubmitting(false);
            setResponseMessage(result.message);
        } catch (error) {
            setIsSubmitting(false);
            setResponseMessage("Something went wrong, please try again later.");
        }
    };

    return (
        <div className="h-full w-full flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col md:flex-row w-3/5 h-auto md:h-3/5 bg-gray-900 rounded-lg text-white">
                {/* Contact Info Section */}
                <div className="flex flex-col w-full md:w-1/2 px-12 py-12 space-y-12 justify-between">
                    <div>
                        <p className="text-3xl">Laten we kijken of we samen wat moois kunnen maken!</p>
                    </div>
                    <div className="flex flex-col space-y-8 text-sm">
                        <div className="w-full flex justify-between"><MailFilled/><p>info@vkvrestauraties.nl</p></div>
                        <div className="w-full flex justify-between"><PhoneFilled/><p>+31 6 52418553</p></div>
                        <div className="w-full flex justify-between"><HomeFilled/><p>van Ostadestraat 176, 1072THad Amsterdam</p>
                        </div>
                    </div>
                    <div className="flex space-x-4 w-full text-gray-400">
                        <a href="https://www.instagram.com/vkv_restauraties?"
                           target="_blank" rel="noreferrer">
                            <InstagramFilled/>
                        </a>
                        <a href="https://www.linkedin.com/in/otto-van-ketwich-verschuur-87b1297/?originalSubdomain=nl"
                           target="_blank" rel="noreferrer">
                            <LinkedinFilled/>
                        </a>
                        <a href="https://www.facebook.com/VKVRestauraties/?locale=nl_NL"
                           target="_blank" rel="noreferrer">
                            <FacebookFilled/>
                        </a>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="w-full md:w-1/2 h-full px-12 py-12">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full rounded-lg justify-between
                bg-gray-100 text-gray-900 px-6 py-12 text-sm">
                        <div>
                            <label>Naam</label>
                            <input
                                className="w-full bg-gray-100 border-b-2 border-gray-400 focus:border-gray-900 outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div>
                            <label>Email</label>
                            <input
                                className="w-full bg-gray-100 border-b-2 border-gray-400 focus:border-gray-900 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div>
                            <label>Bericht</label>
                            <textarea className="w-full h-full bg-gray-100 border-2 rounded-lg border-gray-400
                        focus:border-gray-900 outline-none resize-none mt-4"
                                      value={message}
                                      onChange={(e) => setMessage(e.target.value)}/>
                        </div>

                        <div>
                            <button className="w-full bg-gray-900 px-4 mt-6 py-2 rounded-lg text-white" type="submit"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Versturen..." : "Verstuur"}
                            </button>
                        </div>
                        {responseMessage && <p className="text-sm mt-4 text-red-800">{responseMessage}</p>}
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Contact;
