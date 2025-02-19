import React from 'react'

function ContactUs() {
  return (
    <div>

<div className="bg-gray-50">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">
        Assistance with product-related queries, troubleshooting, and orders.
        </p>
      </header>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 bg-gray-100 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Get In Touch</h2>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac purus.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-orange-500 text-2xl">📍</span>
                <p className="text-gray-700">Panvel, Navi Mumbai,Raigard</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-orange-500 text-2xl">📞</span>
                <p className="text-gray-700">+123-456-7890</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-orange-500 text-2xl">📧</span>
                <p className="text-gray-700">mstraders@gmail.com</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-orange-500 text-xl">🔵</a>
              <a href="#" className="text-orange-500 text-xl">🟠</a>
              <a href="#" className="text-orange-500 text-xl">🟡</a>
            </div>
          </div>

          {/* Right Section (Contact Form) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">Send a Message</h2>
            <form className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="E-mail Address"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Message"
                className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
              <button className="w-24 bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition duration-300">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <iframe
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.3208920103384!2d-0.11954318426779557!3d51.50332447963374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760344fbd40c15%3A0x6c7a9b6d9e0f7e63!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1623935096235!5m2!1sen!2suk"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer */}
      
    </div>


    </div>
  )
}

export default ContactUs