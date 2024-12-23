"use client"
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PreviewModal({ data,  onClose}) {
    const {isOpen, socialSite, image, title, description } = data || {}
    const pathname = usePathname()
    console.log(process.env.BASE_URL+pathname)
    function handleSocialShare() {
        let shareUrl = "";
        const currentUrl = `${process.env.BASE_URL}${pathname}`; 
        if (socialSite === "facebook") {
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}&quote=${encodeURIComponent(title)}`;
        } else if (socialSite === "x") {
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(title)}`;
        } else if (socialSite === "linkedin") {
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            currentUrl
          )}&title=${encodeURIComponent(
            title
          )}&summary=${encodeURIComponent(description)}`;
        }
    
        
        if (shareUrl) {
          window.open(shareUrl, "_blank", "width=600,height=400");
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-max relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    ✖
                </button>
                <div className="w-[600px] h-[300px] mb-4 relative ">
                    <Image
                        id="previewImage"
                        src={image}
                        alt="Preview Image"
                        className="w-full object-contain rounded-md"
                        fill />
                </div>
                
                {/* <h2 id="previewTitle" className="text-lg font-semibold mb-2">
                    {title || "Your Website Title"}
                </h2> */}
                {/* <p id="previewDescription" className="text-sm text-gray-600 mb-4">
                    {description || "A brief description of your webpage."}
                </p> */}
                <div className="flex gap-8">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 font-medium text-black px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
                    >
                        Close
                    </button>
                    <button onClick={handleSocialShare}
                        className={`w-full flex items-center justify-center gap-4 rounded-lg font-semibold
                                        ${socialSite === "facebook" && "bg-[#316FF6] text-white"}
                                        ${socialSite === "x" && "bg-black text-white"}
                                        ${socialSite === "linkedin" && "bg-[#0077B5] text-white"}
                                    `}>
                            Share
                            {
                                socialSite === "facebook"
                                    && <Image
                                            src="https://facebook.com/favicon.ico"
                                            alt="facebook"
                                            height={32}
                                            width={32}
                                            className=" rounded-full object-cover "
                                        />
                            }
                            {
                                socialSite === "x"
                                    && <Image
                                            src="https://x.com/favicon.ico"
                                            alt="X"
                                            height={32}
                                            width={32}
                                            className=" rounded-full object-cover "
                                        />
                            }
                            {   socialSite === "linkedin" &&
                                <Image
                                    src="https://www.linkedin.com/favicon.ico"
                                    alt="Facebook"
                                    height={32}
                                    width={32}
                                    className="w-8 h-8 rounded-full object-cover"
                                    />}
                                    
                        
                    </button>
                </div>
                
            </div>
        </div>
    );
}
