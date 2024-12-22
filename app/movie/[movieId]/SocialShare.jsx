import React from 'react'

export default function SocialShare() {
  return (
            <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="text-center cursor-pointer">
                    <img
                      src="http://facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Facebook</p>
                  </button>

                  <button className="text-center cursor-pointer">
                    <img
                      src="http://x.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">X</p>
                  </button>

                  <button className="text-center cursor-pointer">
                    <img
                      src="http://linkedin.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Linkedin</p>
                  </button>
                </div>
            </div>
  )
}
