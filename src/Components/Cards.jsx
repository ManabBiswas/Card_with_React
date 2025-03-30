import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaDownload } from "react-icons/fa";

const Cards = ({ data, onDelete, reference, index, dragVariants }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Guard against multiple clicks on the delete button.
  const handleDelete = () => {
    if (isDeleting) return; // Prevent further action if already deleting.
    setIsDeleting(true);
    if (onDelete) {
      setTimeout(() => {
        onDelete(index);
      }, 300); // Wait for the exit animation to finish.
    }
  };

  // Return appropriate background classes for tag colors.
  const getTagColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'bg-gradient-to-r from-green-600 to-green-500';
      case 'blue':
        return 'bg-gradient-to-r from-blue-600 to-blue-500';
      case 'red':
        return 'bg-gradient-to-r from-red-600 to-red-500';
      default:
        return 'bg-gradient-to-r from-gray-700 to-gray-600';
    }
  };

  const getTitleColorClasses = (titleColor) => {
    switch (titleColor) {
      case 'green':
        return 'text-green-500';
      case 'blue':
        return 'text-blue-500';
      case 'red':
        return 'text-red-500';
      default:
        return 'text-white';
    }
  };
  
  const getIconColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-500';
      case 'blue':
        return 'text-blue-500';
      case 'red':
        return 'text-red-500';
      default:
        return 'text-purple-600'; // Default icon color
    }
  };
  
  const getDownloadBtnColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      case 'red':
        return 'text-red-600';
      default:
        return 'text-gray-700';
    }
  };

  

  return (
    <motion.div
      drag
      dragConstraints={reference}
      dragElastic={0.7}
      dragTransition={{
        bounceStiffness: 600,
        bounceDamping: 20,
      }}
      variants={dragVariants}
      initial="initial"
      animate={isDeleting ? 'exit' : 'initial'}
      whileDrag="drag"
      whileHover="hover"
      className="relative flex-shrink-0 m-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-3 shadow-lg overflow-hidden cursor-grab active:cursor-grabbing w-60 h-80"
    >
      {/* Header: Delete Button */}
      <div>
        <motion.button 
          whileHover={{
            scale: 1.1,
            rotate: 90,
          }}
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors hover:cursor-pointer"
          aria-labelledby="delete-card-label"
        >
          <FaTimes />
        </motion.button>
      </div>

      {/* Title with Icon */}
      <div className="flex items-start mb-3">
      <span className={`text-3xl mr-3 ${getIconColorClasses(data.titleColor || 'default')}`}>
          {React.createElement(data.icon || 'div')}
        </span>
        <h2 className={`text-lg font-semibold pr-8 ${getTitleColorClasses(data.titleColor || 'default')}`}>
          {data?.title || "Untitled"}
        </h2>
      </div>
      <hr className={` border-t-3 rounded-full  ${getIconColorClasses(data.titleColor || 'default')}`}/>

      {/* Description */}
      <p className="text-gray-400 font-medium text-sm md:text-base mt-2 leading-tight transition-colors duration-300">
        {data?.description || "No description provided"}
      </p>

      {/* Footer Section */}
      <div
        className={`absolute bottom-0 left-0 w-full p-2 ${
          data?.tag?.tagColor
            ? getTagColorClasses(data?.tag?.tagColor)
            : getTagColorClasses('gray')
        } transition-opacity duration-300`}
      >
        {/* Tag Details */}
        {data?.tag?.isOpen && data?.tag?.tagDetails && data.tag.tagDetails.length > 0 && (
          <div className="text-center mb-2">
            {data.tag.tagDetails.map((detail, idx) => (
              <p key={idx} className="text-gray-200 text-[12px] md:text-[14px] transition-colors">
                {detail}
              </p>
            ))}
          </div>
        )}

        {/* Download / File Section */}
        {data?.download?.isOpen && (
          <div className="flex items-center justify-between">
            {data.download.filePreview && (
              <img
                src={data.download.filePreview}
                alt="File Preview"
                className="mb-1 w-12 h-12 object-contain rounded-full"
              />
            )}
            <div className="flex flex-col p-2">
              {data.download.fileName && (
                <p className="text-gray-200 text-xs md:text-sm font-medium truncate max-w-[120px]">
                  {data.download.fileName}
                </p>
              )}
              {data.download.fileSize && (
                <p className="text-gray-200 text-xs md:text-sm">
                  {data.download.fileSize}
                </p>
              )}
            </div>
            <button className={`w-8 h-8 bg-blue-100 ${
              data?.tag?.tagColor
                ? getDownloadBtnColorClasses(data?.tag?.tagColor)
                : getDownloadBtnColorClasses('gray')
            } rounded-full flex items-center justify-center`}
            aria-labelledby="download-file-label">
              <FaDownload />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cards;