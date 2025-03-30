import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="w-full h-screen bg-zinc-600 overflow-hidden">
      <motion.div 
        className="flex justify-center items-center h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut"
        }}
      >
        <h1 className=" akaya-kanadaka md:text-9xl text-8xl tracking-wider leading-loose text-zinc-900 font-semibold select-none">
          Hello, World!
        </h1>
      </motion.div>
    </div>
  );
};

export default Background;