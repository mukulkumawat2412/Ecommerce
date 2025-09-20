import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[#161616] text-white w-full">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b border-gray-700">
        
        {/* Logo & Address */}
        <div className="flex flex-col sm:flex-row items-start sm:space-x-6 sm:pl-6 md:pl-10">
          <img src="/logo.png" alt="Logo" className="w-[120px] mb-4 sm:mb-0" />
          <div>
            <p className="text-black bg-purple-300 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2">
              OFFICE ADDRESS
            </p>
            <p className="text-gray-300 mt-3">
              Laxmaya Technologies Pvt. Ltd, First Floor, Laxmaya Tower, opp. Kumbha Marg, Pratap Nagar, Sanganer, Jaipur, 302033
            </p>
            <p className="mt-4 text-white font-semibold">info@laxmaya.com</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:items-center sm:text-center">
          <p className="bg-purple-300 text-black inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Quick LINKS
          </p>
          <ul className="space-y-2 text-gray-300 text-sm mt-4">
            <li><Link to="/about" className="hover:text-purple-300">About Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-purple-300">Privacy & Policy</Link></li>
            <li><Link to="/faq" className="hover:text-purple-300">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-purple-300">Contact</Link></li>
            <li><Link to="/services" className="hover:text-purple-300">Services</Link></li>
            <li><Link to="/term-condition" className="hover:text-purple-300">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="text-black bg-purple-300 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4">
            SERVICES
          </p>
          <ul className="space-y-2 text-gray-300 text-sm mt-4">
            <li><Link to="/digital-transformation" className="hover:text-purple-300">Digital Transformation</Link></li>
            <li><Link to="/web-application" className="hover:text-purple-300">Web Application Development</Link></li>
            <li><Link to="/mobile-application" className="hover:text-purple-300">Mobile Application Development</Link></li>
            <li><Link to="/ui-ux" className="hover:text-purple-300">UI/UX Design</Link></li>
            <li><Link to="/artificial-intelligence" className="hover:text-purple-300">Artificial Intelligence (AI)</Link></li>
            <li><Link to="/devops" className="hover:text-purple-300">DevOps</Link></li>
            <li><Link to="/cloud-services" className="hover:text-purple-300">Cloud Services</Link></li>
            <li><Link to="/cms-development" className="hover:text-purple-300">CMS Development (Shopify, Salesforce etc.)</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        
        {/* Social Icons */}
        <div className="flex space-x-4 text-white text-xl mb-4 md:mb-0">
          <a href="https://www.facebook.com/laxmayatechnolgies/" target="_blank" rel="noreferrer"
             className="hover:bg-blue-500 rounded-full p-2"><FaFacebookF /></a>
          <a href="https://wa.me/918058315610" target="_blank" rel="noreferrer"
             className="hover:bg-green-400 rounded-full p-2"><FaWhatsapp /></a>
          <a href="https://www.instagram.com/laxmayatechnologies/?hl=en" target="_blank" rel="noreferrer"
             className="hover:bg-pink-500 rounded-full p-2"><FaInstagram /></a>
          <a href="https://www.linkedin.com/company/laxmaya-technologies-private-limited/" target="_blank" rel="noreferrer"
             className="hover:bg-blue-400 rounded-full p-2"><FaLinkedinIn /></a>
        </div>

        {/* Copyright */}
        <p className="text-center md:text-left">
          © 2022 <span className="text-purple-300">Laxmaya Technologies Pvt. Ltd.</span> All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
