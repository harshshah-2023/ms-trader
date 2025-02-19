import React from "react";
import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa"; // Importing the icons from react-icons

const AboutUsPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-300 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      {/* Flex Container for Horizontal Layout */}
      <div className="flex flex-col lg:flex-row justify-center gap-8 p-8">

        {/* Contact Form Block */}
        <div className="bg-gray-200 p-12 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 ml-4">
          <h2 className="text-2xl font-semibold mb-6 text-black">Get In Touch</h2>
          <form className="w-full space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg text-black">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-white rounded-lg bg-gray-200 text-black"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg text-black">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-white rounded-lg bg-gray-200 text-black"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg text-black">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border border-white rounded-lg bg-gray-200 text-black"
                placeholder="Your Message"
              />
            </div>
            <button type="submit" className="w-1/2 mx-auto py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 mt-4  ">
              Submit
            </button>
          </form>
        </div>

        {/* Social Links Block */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 ml-4">
  <h2 className="text-2xl font-semibold mb-6 text-black">Connect with Us</h2>

  <div className="mainbox1 grid grid-cols-2 gap-4">
    <div className="box1 flex flex-col items-center">
      <span className="mr-2 text-black"><i class="fa-brands fa-instagram"></i></span> {/* Instagram icon */}

      <a href="https://www.instagram.com" className="text-blue-600 ml-2" target="_blank" rel="noopener noreferrer">Follow us on Instagram</a>
    </div>

    <div className="box2 flex flex-col items-center">
      <span className="mr-2 text-black">✉️</span> {/* Email icon */}
      
      <a href="mailto:info@example.com" className="text-blue-600 ml-2">info@example.com</a>
    </div>

    <div className="box3 flex flex-col items-center">
      <span className="mr-2 text-black">📞</span> {/* Phone icon */}
      
      <a href="tel:+1234567890" className="text-blue-600 ml-2">+1 (234) 567-890</a>
    </div>

    <div className="box4 flex flex-col items-center">
      <span className="mr-2 text-black">📍</span> {/* Address icon */}
\
      <span className="text-blue-600 ml-2">123 Main St, City, Country</span>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default AboutUsPage;
