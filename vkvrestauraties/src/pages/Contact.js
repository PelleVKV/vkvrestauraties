import React from "react";
import {
    MailFilled,
    PhoneFilled,
    HomeFilled,
    InstagramFilled,
    LinkedinFilled,
    FacebookFilled
} from "@ant-design/icons";

const Contact = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="flex w-3/5 h-3/5 bg-gray-900 rounded-lg text-white">
                <div className="flex flex-col w-1/2 px-12 py-12 space-y-12 justify-between">
                    <div><p className="text-3xl">Laten we kijken of we samen wat moois kunnen maken!</p></div>
                    <div className="flex flex-col space-y-8 text-sm">
                        <div className="w-full flex justify-between"><MailFilled/><p>info@vkvrestauraties.nl</p></div>
                        <div className="w-full flex justify-between"><PhoneFilled/><p>+31 6 52418553</p></div>
                        <div className="w-full flex justify-between"><HomeFilled/><p>van Ostadestraat 176,
                            Amsterdam</p></div>
                    </div>
                    <div className="flex space-x-4 w-full text-gray-400">
                        <a href="https://www.instagram.com/vkv_restauraties?
                        utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">
                            <InstagramFilled/>
                        </a>
                        <a href="https://www.linkedin.com/in/otto-van-ketwich-verschuur-87b1297/?originalSubdomain=nl"
                        target="_blank" rel="noreferrer">
                            <LinkedinFilled/>
                        </a>
                        <a href="https://www.facebook.com/VKVRestauraties/?locale=nl_NL" target="_blank"
                           rel="noreferrer">
                            <FacebookFilled/>
                        </a>
                    </div>
                </div>
                <div className="w-1/2 h-full px-12 py-12">
                    <div className="flex flex-col w-full h-full rounded-lg justify-between
                    bg-gray-100 text-gray-900 px-6 py-12 text-sm">
                        <div>
                            <label>Naam</label>
                            <input className="w-full bg-gray-100 border-b-2 border-gray-400
                            focus:border-gray-900 outline-none"/>
                        </div>

                        <div>
                            <label>Email</label>
                            <input className="w-full bg-gray-100 border-b-2 border-gray-400
                            focus:border-gray-900 outline-none"/>
                        </div>

                        <div>
                            <label>Bericht</label>
                            <textarea className="w-full h-full bg-gray-100 border-2 rounded-lg border-gray-400
                            focus:border-gray-900 outline-none resize-none mt-4"/>
                        </div>

                        <div>
                            <button className="w-full bg-gray-900 px-4 mt-6 py-2 rounded-lg text-white">Verstuur
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
