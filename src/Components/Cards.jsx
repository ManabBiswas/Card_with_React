import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { GiCloudDownload } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

const Cards = ({ data, onDelete, reference }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  // Handle card deletion
  const handleDelete = () => {
    setIsDeleted(true);
    if (onDelete) {
      onDelete();
    }
  };

  // If card is deleted, return null
  if (isDeleted) return null;

  // Function to get tag color classes
  const getTagColorClasses = (color) => {
    switch (color) {
      case 'green': return 'bg-gradient-to-r from-green-600 to-green-500';
      case 'blue': return 'bg-gradient-to-r from-blue-600 to-blue-500';
      case 'red': return 'bg-gradient-to-r from-red-600 to-red-500';
      default: return 'bg-gradient-to-r from-gray-700 to-gray-600';
    }
  };

  // Drag animation variants
  const dragVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    drag: { 
      scale: 1.05,
      rotate: 2,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      dragElastic={0.7} // Increased elastic effect
      dragTransition={{ 
        bounceStiffness: 600, // Higher stiffness for more responsive bounce
        bounceDamping: 20, // Lower damping for more pronounced bounce
      }}
      variants={dragVariants}
      initial="initial"
      whileDrag="drag"
      whileHover="hover"
      className="relative flex-shrink-0 m-2 w-36 h-48 md:w-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-3 shadow-lg transition-all duration-300 overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* Icon and Close Button */}
      <div className="flex justify-between items-start">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaAssistiveListeningSystems className="text-purple-400 text-3xl md:text-4xl transition-transform duration-300" />
        </motion.div>
        
        {/* Close/Delete Button */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoClose
            onClick={handleDelete}
            className="text-red-400 text-xl cursor-pointer hover:text-red-500 transition-colors"
            aria-label="Delete Card"
          />
        </motion.div>
      </div>

      {/* Title */}
      <h1 className="text-white font-bold text-lg md:text-xl mt-2 tracking-wide line-clamp-1 transition-colors duration-300">
        {data?.title}
      </h1>

      <hr className="border-purple-500 my-2 opacity-50" />

      {/* Description */}
      <p className="text-gray-400 font-medium text-sm md:text-base mt-2 leading-tight line-clamp-3 transition-colors duration-300">
        {data?.description}
      </p>

      {/* Footer */}
      <div
        className={`absolute bottom-0 left-0 w-full p-2 ${
          data?.tag?.tagColor
            ? getTagColorClasses(data?.tag?.tagColor)
            : 'bg-gradient-to-r from-gray-700 to-gray-600'
        } transition-opacity duration-300`}
      >
        {/* Tag Details */}
        {data?.tag?.isOpen && (
          <div className="text-center mb-1">
            {Object.values(data?.tag?.tagDetails || {}).map((detail, index) => (
              <p
                key={index}
                className="text-gray-200 text-[10px] md:text-[11px] truncate transition-colors"
              >
                {detail}
              </p>
            ))}
          </div>
        )}

        {/* Download Section */}
        {data?.download?.isOpen && (
          <div className="flex items-center justify-between">
            <h5 className="text-gray-200 text-sm md:text-base transition-colors">
              {data?.download?.fileSize}
            </h5>
            <motion.span 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center shadow-md transition-transform"
            >
              {data?.download?.close ? (
                <IoClose size="1.2em" className="text-white" />
              ) : (
                <GiCloudDownload size="1.2em" className="text-white" />
              )}
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cards;