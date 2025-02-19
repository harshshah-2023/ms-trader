import React from 'react';
import { motion } from 'framer-motion';
import busibeerv from '../assets/beerbusivideo.mp4';
import busipic from '../assets/busibeer.jpg';

function Product() {
  return (
    <div className=''>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
        {/* Hero Section */}
        <motion.section 
          className="w-full max-w-6xl p-8 flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={busipic}
              alt="Fitness Tracker"
              className="w-80 border-white rounded-2xl"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Sustainable & Protein-Rich, Beer-Busi Feed for Stronger, Healthier Cows!
            </h2>
            <p className="text-gray-600 mt-4">
              A nutrient-rich, protein-packed beer byproduct feed designed to enhance cattle health, support muscle growth, and boost milk production—sustainably sourced for optimal nutrition.
            </p>
            <div className="flex justify-center md:justify-start mt-6 space-x-8">
              <div>
                <h3 className="text-4xl font-bold text-blue-600">50 % +</h3>
                <p className="text-gray-500">Extra Nutrition.</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-600">95% +</h3>
                <p className="text-gray-500">Extra Protein</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Product Info Section */}
        <motion.section 
          className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Beer Busi
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enhance Milk & Muscle Growth with Our Nutrient-Rich Brewery Byproduct!
          </p>
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/3 space-y-6 text-center md:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center md:justify-start">
                  <span className="mr-2">⏳</span> High-Protein Nutrition 
                </h3>
                <p className="text-gray-500">Boosts Milk Production</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center md:justify-start">
                  <span className="mr-2">💓</span> Cost-Effective Feed Solution
                </h3>
                <p className="text-gray-500">Improves Digestibility – Rich in fiber and essential nutrients.</p>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <video autoPlay loop muted className="w-3/4 md:w-full">
                <source src={busibeerv} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            <motion.div 
              className="md:w-1/3 space-y-6 text-center md:text-right"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center md:justify-end">
                  <span className="mr-2">🔋</span> Immune Health, Contains natural vitamins.
                </h3>
                <p className="text-gray-500">Reduces Feed Costs</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center md:justify-end">
                  <span className="mr-2">⏰</span> Enhances Weight Gain
                </h3>
                <p className="text-gray-500 pl-5">Provides essential nutrients for faster and healthier growth in cattle</p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Product;
