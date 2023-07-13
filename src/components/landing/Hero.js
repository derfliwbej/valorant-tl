'use client';
import { Anton } from "next/font/google";
import { useState } from "react";
import Image from "next/image";

import Alert from "@/components/ui/Alert";

const anton = Anton({ 
  subsets: ['latin'],
  weight: '400'
});

export default function Hero() {
    const [urlInput, setUrlInput] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({ type: 'prompt', message: '' });

    const handleInputChange = (e) => {
        const input = e.target.value;

        setUrlInput(input);

        if (!input) {
            setBtnDisabled(true);
        } else setBtnDisabled(false);
    }

    const createURL = (url) => {
        try {
            return new URL(url);
        } catch(e) {
            return false;
        }
    };

    const handleAuthorize = (e) => {
        e.preventDefault();

        const urlObject = createURL(urlInput);
        const hash = urlObject['hash'];
        const parsedHash = new URLSearchParams(hash?.substring(1));
        const access_token = parsedHash?.get('access_token');

        if(!urlObject || !hash || !parsedHash || !access_token) {
            setAlert({ type: "danger", message: "Invalid URL"});
            setShowAlert(true);
        }
        
        setUrlInput('');
        setBtnDisabled(true);
    };

    return (
        <section id="hero" className="flex flex-col w-full h-screen items-center justify-center">
            <div className="max-w-xl text-center">
                <h2 className={`${anton.className} text-7xl font-bold text-red-500 my-5`}>ValorantTL</h2>
                <p className="text-white text-xl my-5">Nulla deserunt anim non non aliqua ut ad. Sint quis ad do nisi ad ea eu enim minim aliquip excepteur sint veniam. Id irure est sunt do commodo commodo dolore laborum ut ex tempor.</p>
                <form onSubmit={handleAuthorize} className="flex">
                    <input type="text" className="w-full py-2 px-3" placeholder="Enter URL here" onChange={handleInputChange} value={urlInput} />
                    <button disabled={btnDisabled} 
                            className={"px-3 font-bold text-white " + (
                                       btnDisabled ? "bg-gray-500" : "bg-red-500 hover:brightness-95"
                                       )} 
                            type="submit">Authorize</button>
                </form>
            </div>
            <div className="absolute w-full h-screen -z-20 grayscale brightness-50 contrast-125">
                <Image src="/hero-img.jpg" fill alt="Hero" objectFit="cover" quality={100} />
            </div>
            <div className="absolute w-full h-screen -z-10 bg-gradient-to-t from-black to-transparent"></div>
            <Alert message={alert.message} type={alert.type} open={showAlert} setOpen={setShowAlert}/>
        </section>
    );
}