import React from 'react';
import { motion } from 'framer-motion';

const bounceVariant = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
  bounce: {
    y: [0, -20, 0, -15, 0], // Bounce effect with slight variations
    scale: [1, 0.95, 1], // Shrinking effect
    opacity: [1, 0.8, 1], // Fading effect when shrinking
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const Background = () => {
  return (
    <div className="w-full h-screen  bg-gradient-to-br from-zinc-700 via-gray-500 to-zinc-700 ">
      <motion.div
        className="flex flex-col justify-center items-center h-full space-y-4"
        variants={bounceVariant}
        initial="initial"
        animate="animate"
      >
        <motion.h1
  className="akaya-kanadaka md:text-9xl text-8xl tracking-widest leading-loose select-none bouncing-text font-akaya-kanadaka font-extrabold text-black"
  style={{
    // WebkitTextStroke: "0.1px #f2f0e6", // Inner thin border
    textShadow: "0px 0px 3px #ffffff", // Outer glow-like border
  }}
  variants={bounceVariant}
  animate="bounce"
>
  Hello, World!
</motion.h1>

      </motion.div>
    </div>
  );
};

export default Background;
