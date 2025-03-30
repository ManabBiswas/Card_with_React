import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from "react-icons/fa6";

const AddButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-300 rounded-full flex items-center justify-center shadow-lg z-100"
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      aria-labelledby="add-item-label"
    ><span className="sr-only">Add New Item</span> {/* Screen-reader only */}
      <FaPlus  className="text-white text-3xl font-bold" />
    </motion.button>
  );
};

export default AddButton;