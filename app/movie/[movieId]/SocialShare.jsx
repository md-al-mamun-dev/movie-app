"use client"
import SocialSharePreviewModal from "./SocialSharePreviewModal";
import Image from "next/image";
import { useState } from "react";

export default function SocialShare({image, img, title, description}) {
  const [modalData, setModalData] = useState({
    isOpen:false,
    socialSite:"",
    image:`${process.env.BASE_URL}/api/og?title=${title}&img=${img}&description=${description.slice(0, 100)}`,
    title: title ,
    description: description
  })

  function closeModal() {
    setModalData(prev => ({...prev,isOpen:false, socialSite:""}))
  }
  return (
            <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="text-center cursor-pointer relative " onClick={()=>setModalData(prev=>({...prev, isOpen: true, socialSite:"facebook"}))}>
            
                    <Image
                      src="https://facebook.com/favicon.ico"
                      alt="facebook"
                      height={32}
                      width={32}
                      className=" rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Facebook</p>
                  </button>

                  <button 
                    onClick={()=>setModalData(prev=>({...prev, isOpen: true, socialSite:"x"}))}
                    className="text-center cursor-pointer  relative">
                    <Image
                      src="https://x.com/favicon.ico"
                      alt="X"
                      height={32}
                      width={32}
                      className=" rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">X</p>
                  </button>

                  <button 
                    onClick={()=>setModalData(prev=>({...prev, isOpen: true, socialSite:"linkedin"}))}
                    className="text-center cursor-pointer  relative">
                    <Image
                      src="https://www.linkedin.com/favicon.ico"
                      alt="Facebook"
                      height={32}
                      width={32}
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Linkedin</p>
                  </button>
                </div>
                {
                  modalData['isOpen'] 
                  && <SocialSharePreviewModal 
                        data={modalData}
                        onClose={closeModal} 
                        // image={`${process.env.BASE_URL}/api/og?title=${title}&img=${img}&description=${description.slice(0, 100)}`} title={title} description={description}
                        />
                }
              

            </div>
  )
}
