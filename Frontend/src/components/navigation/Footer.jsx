import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

function Footer() {
 return (
  <footer className="bg-[#161616] text-white w-full">
    
    {/* Top Section */}
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-gray-700">
      
      {/* Logo & Address */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[100px] sm:w-[120px] mb-4 sm:mb-0"
        />
        <div>
          <p className="text-black bg-purple-300 inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2">
            OFFICE ADDRESS
          </p>
          <p className="text-gray-300 mt-3 text-sm leading-relaxed">
            ShopNow Pvt. Ltd., 2nd Floor, Sapphire Plaza, Near City Mall,
            Malviya Nagar, Jaipur, Rajasthan - 302017
          </p>
          <p className="mt-4 text-white font-semibold text-sm">
            support@shopnow.com
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col items-start sm:items-center sm:text-center">
        <p className="bg-purple-300 text-black inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
          QUICK LINKS
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mt-2">
          <li><Link to="/about" className="hover:text-purple-300">About Us</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-purple-300">Privacy Policy</Link></li>
          <li><Link to="/faq" className="hover:text-purple-300">FAQs</Link></li>
          <li><Link to="/contact" className="hover:text-purple-300">Contact</Link></li>
          <li><Link to="/services" className="hover:text-purple-300">Our Services</Link></li>
          <li><Link to="/terms" className="hover:text-purple-300">Terms & Conditions</Link></li>
        </ul>
      </div>

      {/* Services */}
      <div className="text-left sm:text-left">
        <p className="text-black bg-purple-300 inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
          OUR SERVICES
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mt-2">
          <li><Link to="/ecommerce" className="hover:text-purple-300">E-commerce Solutions</Link></li>
          <li><Link to="/web-development" className="hover:text-purple-300">Web Development</Link></li>
          <li><Link to="/mobile-apps" className="hover:text-purple-300">Mobile App Development</Link></li>
          <li><Link to="/design" className="hover:text-purple-300">UI/UX Design</Link></li>
          <li><Link to="/ai" className="hover:text-purple-300">Artificial Intelligence</Link></li>
          <li><Link to="/cloud" className="hover:text-purple-300">Cloud & Hosting</Link></li>
          <li><Link to="/support" className="hover:text-purple-300">Customer Support</Link></li>
        </ul>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
      
      {/* Copyright */}
      <p className="text-center md:text-left">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-300">ShopNow Pvt. Ltd.</span> All Rights Reserved.
      </p>

      {/* Social Icons */}
      <div className="flex space-x-3 text-white text-lg">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-blue-500 rounded-full p-2 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://wa.me/918000000000"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-green-400 rounded-full p-2 transition"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-pink-500 rounded-full p-2 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-blue-400 rounded-full p-2 transition"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  </footer>
);

}

export default Footer;
