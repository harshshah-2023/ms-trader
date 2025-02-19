import React from 'react'

export default function Footer() {
  return (
    <div classname="w-full">
        <div className="w-full text-center">
         
           
        </div>
       
        {/* <div className='w-full flex gap-6 item-center justify-center py-6 bg-blue-950'>
        <div classname="w-full  mx-10 justify-between text-white">
          <p>Ms Traders products </p>
          <p>contact- +91-1234567890</p>
          <p>Address- Old panvel, Navi mumbai,Raigard</p>
        </div>
            <div>
                <img className='w-20 pt-3 'alt="" />
            </div>
             <div className='flex gap-2 mt-2'>
                <p className='flex gap-1 items-center justify-center border border-gray-500 hover:border-black cursor-pointer duration-200 px-1 h-6 '>English</p>

            </div>
            <div className='flex -mt-1'>
                <img className='w-16 '  alt="" />
            </div>
        </div> */}


        <div>

        </div>

        <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Ms Traders</h2>
            <p className="text-gray-400 mt-2">Oder Beer-Bhusi Cow feed now for Cow health.</p>
            <p className="text-gray-400 mt-1">Mstrader@gmail.com</p>
          </div>

          <div className="flex space-x-8">
            <div>
              <h3 className="text-lg font-semibold">Features</h3>
              <ul className="text-gray-400 space-y-2 mt-2">
                <li>Nutritious</li>
                <li>Sustainable</li>
                <li>High-protein</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="text-gray-400 space-y-2 mt-2">
                <li>Blog</li>
                <li>Transport</li>
                <li>Product Glossary</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="text-gray-400 space-y-2 mt-2">
                <li>About</li>
                <li>Customers</li>
                <li>Contact us</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8">
          &copy; Copyright MsTrader. All rights reserved. Made with ❤ .
        </div>
      </footer>
      
    </div>
  )
}
