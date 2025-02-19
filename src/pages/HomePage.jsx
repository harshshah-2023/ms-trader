import { Link } from "react-router-dom";
import backgroundImage from "../assets/test1.jpg";
import Product from "./Product";
import ContactUs from "./ContactUs";

const HomePage = () => {
  return (
    <div>

    
    <div className="flex flex-col min-h-screen w-full ">
      {/* Left Section with Background Image */}
      <div
        className="flex-1 bg-no-repeat bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Overlay Text and Buttons (Middle Left) */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white text-left z-10">
          <h1 className="text-4xl font-bold mb-6">
            Protein-Packed Cow Feed <span className="block">for Healthy Livestock</span>
          </h1>
          <div className="space-x-4">
            <Link to="/login" className="px-6 py-2 bg-blue-800 text-white rounded-lg">Login</Link>
            
          </div>
        </div>

        {/* Floating Cards Section */}
       
      </div>

      
       
    </div>
    
        <Product/>
        <ContactUs/>
   
    </div>
  );
};

export default HomePage;
