import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { FaAssistiveListeningSystems } from 'react-icons/fa';
// import { GiCloudDownload } from 'react-icons/gi';
// import { IoClose } from 'react-icons/io5';
import { FaTimes, FaDownload } from "react-icons/fa";

const Cards = ({ data, onDelete, reference, index }) => {
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

  const getDownloadBtnColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      case 'red':
        return 'text-red-600';
      default:
        return 'text-gray-700 ';
    }
  };

  const dragVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    drag: {
      scale: 1.05,
      rotate: 2,
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
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
      className="relative flex-shrink-0 m-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-3 shadow-lg  overflow-hidden cursor-grab active:cursor-grabbing  w-60 h-80  bg-white"
    >
      {/* Header: Icon and Delete Button */}
      <div>
        <motion.button whileHover={{
          scale: 1.1,
          rotate: 90,
        }}
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors hover:cursor-pointer"
        >
          <FaTimes />
        </motion.button>
      </div>

      {/* Title */}
      <div className="flex items-start mb-3">
        <span className="text-3xl text-purple-600 mr-3">
          {React.createElement(data.icon)}
        </span>
        <h2 className="text-lg font-semibold text-white pr-8">
          {data?.title || "Untitled"}
        </h2>
      </div>
      <hr className="border-purple-500 my-2 opacity-50" />

      {/* Description */}
      <p className="text-gray-400 font-medium  text-sm md:text-base mt-2 leading-tight transition-colors duration-300">
        {data?.description || "No description provided"}
      </p>

      {/* Footer Section */}
      <div
        className={`absolute bottom-0 left-0 w-full p-2 ${data?.tag?.tagColor
          ? getTagColorClasses(data?.tag?.tagColor)
          : getTagColorClasses('green')
          } transition-opacity duration-300`}
      >
        {/* Tag Details */}
        {data?.tag?.isOpen && data?.tag?.tagDetails && (
          <div className="text-center mb-2">
            {data.tag.tagDetails.map((detail, index) => (
              <p key={index} className="text-gray-200 text-[12px] md:text-[14px] transition-colors">
                {detail}
              </p>
            ))}
          </div>
        )}

        {/* Download / File Section */}
        {data?.download?.isOpen && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col p-2">
              {data.download.filePreview && (
                <img
                  src={data.download.filePreview}
                  alt="File Preview"
                  className="mb-1 w-12 h-12 object-cover rounded-full"
                />
              )}
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
              <button className={`w-8 h-8 bg-blue-100  ${data?.tag?.tagColor
          ? getDownloadBtnColorClasses(data?.tag?.tagColor)
          : getDownloadBtnColorClasses('gray')
          } rounded-full flex items-center justify-center`}>
                <FaDownload />
              </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cards;