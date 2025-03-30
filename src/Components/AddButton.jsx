import React from 'react';
import { motion } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';

const AddButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-20"
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <IoAdd className="text-white text-2xl font-bold" />
    </motion.button>
  );
};

export default AddButton;