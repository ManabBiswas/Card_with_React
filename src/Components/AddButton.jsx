import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from "react-icons/fa6";

const AddButton = ({ onClick, reference, dragVariants }) => {
  

  return (
    <motion.button
    drag
    dragDirectionLock={true} 
    dragConstraints={reference}
    dragElastic={0.7}
    dragTransition={{
      bounceStiffness: 600,
      bounceDamping: 20,
    }}
    variants={dragVariants}
      onClick={onClick} // Handles the showForm toggle
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-300 rounded-full flex items-center justify-center shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      aria-label="Add New Item"
    >
      <span className="sr-only">Add New Item</span> {/* Screen-reader only */}
      <FaPlus className="text-white text-2xl font-bold" />
    </motion.button>
  );
};

export default AddButton;