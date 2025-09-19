import React from "react";

import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-[#161616] text-white w-full">
       
        

            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b border-gray-700">

               
                <div className="flex flex-col sm:flex-row items-start sm:space-x-6 sm:pl-6 md:pl-10">
                    <img alt="Logo" className="w-[120px] mb-4 sm:mb-0" />
                    <div>
                        <p className="text-black bg-purple-300 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2">
                            OFFICE ADDRESS (Headquarters)
                        </p>
                        <p className="text-gray-300 mt-3">
                            Laxmaya Technologies Pvt. Ltd First Floor, Laxmaya Tower, opp. Kumbha Marg, Pratap Nagar,
                            Sanganer, Jaipur, 302033
                        </p>
                        <p className="mt-4 text-white font-semibold">info@laxmaya.com</p>
                    </div>
                </div>

               
                <div className="flex flex-col sm:items-center sm:text-center">
                    <p className="bg-purple-300 text-black inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        Quick LINKS
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm mt-4">
                        <li className="hover:text-purple-300 cursor-pointer">About us</li>
                        <Link to="/privacy-policy"><li className="hover:text-red-300 cursor-pointer">Privacy & policy</li></Link>
                        <Link to="/faq"><li className="hover:text-purple-300 cursor-pointer">Faq's</li></Link>
                        <li className="hover:text-purple-300 cursor-pointer">Contact</li>
                        <li className="hover:text-purple-300 cursor-pointer">Service</li>
                        <Link to="/term-condition"><li className="hover:text-purple-300 cursor-pointer">Term & condition</li></Link>
                    </ul>
                </div>

                
                <div>
                    <p className="text-black bg-purple-300 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        SERVICES
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm mt-4">
                       <Link to={"/digital-transformation"}><li className="hover:text-purple-300 cursor-pointer">Digital Transformation</li></Link> 
                       <Link to={"/web-application"}><li className="hover:text-purple-300 cursor-pointer mt-2">Web Application Development</li></Link> 
                       <Link to={"/mobile-application"}><li className="hover:text-purple-300 cursor-pointer mt-2">Mobile Application Development</li>
                       <Link to={"/ui-ux"}><li className="hover:text-red-300 cursor-pointer mt-2">UI/UX</li></Link> </Link> 
                      <Link to={"/artificial-intelligence"}><li className="hover:text-purple-300 cursor-pointer mt-2">Artificial Intelligence (AI)</li></Link>  
                      <Link to={"/devops"}><li className="hover:text-red-300 cursor-pointer mt-2">Devops</li></Link>  
                      <Link to={"/cloud-services"}><li className="hover:text-purple-300 cursor-pointer mt-2">Cloud Services</li></Link>  
                       <Link to={"/cms-development"}><li className="hover:text-purple-300 cursor-pointer mt-2">CMS Development (Shopify, Salesforce etc.)</li></Link> 
                    </ul>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
              
                <div className="flex space-x-4 text-white text-xl mb-4 md:mb-0">
                    <a href="https://www.facebook.com/laxmayatechnolgies/" target="_blank" rel="noreferrer"
                        className="hover:bg-blue-500 rounded-full p-2">
                        <FaFacebookF />
                    </a>
                    <a href="https://wa.me/918058315610" target="_blank" rel="noreferrer"
                        className="hover:bg-green-400 rounded-full p-2">
                        <FaWhatsapp />
                    </a>
                    <a href="https://www.instagram.com/laxmayatechnologies/?hl=en" target="_blank" rel="noreferrer"
                        className="hover:bg-pink-500 rounded-full p-2">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/company/laxmaya-technologies-private-limited/" target="_blank" rel="noreferrer"
                        className="hover:bg-blue-400 rounded-full p-2">
                        <FaLinkedinIn />
                    </a>
                </div>

               
                <p className="text-center md:text-left">
                    Copyright © 2022{" "}
                    <span className="text-purple-300">Laxmaya Technologies Pvt. Ltd. 2022</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
