import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

// Helper function to format date for datetime-local inputs.
const formatDateTimeLocal = (date) => {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const AddCardForm = ({ onAddCard, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tagColor: 'green',
    wantToUploadFile: false,
    footerDescriptionTag: false,
    fileName: '',
    fileSize: '',
    filePreview: null,
    details: '',
    dateTime: formatDateTimeLocal(new Date()),
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Ensure mutual exclusivity of file upload and footer tag checkboxes.
    if (name === 'wantToUploadFile' && checked) {
      setFormData({
        ...formData,
        wantToUploadFile: true,
        footerDescriptionTag: false,
      });
    } else if (name === 'footerDescriptionTag' && checked) {
      setFormData({
        ...formData,
        footerDescriptionTag: true,
        wantToUploadFile: false,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
    
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrors({
          ...errors,
          file: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB`
        });
        return;
      }
      
      // Clear file error if exists
      if (errors.file) {
        setErrors({
          ...errors,
          file: ''
        });
      }
      
      setFormData({
        ...formData,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.wantToUploadFile && !formData.fileName) {
      newErrors.fileName = 'File name is required';
    }
    
    if (formData.footerDescriptionTag && !formData.details.trim()) {
      newErrors.details = 'Details are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Prepare new card data based on form selections.
    const newCard = {
      title: formData.title,
      description: formData.description,
      tagColor: formData.tagColor,
      upload: formData.wantToUploadFile
        ? {
            fileName: formData.fileName,
            fileSize: formData.fileSize,
            filePreview: formData.filePreview,
          }
        : null,
      footerDetails: formData.footerDescriptionTag
        ? {
            details: formData.details,
            dateTime: formData.dateTime,
          }
        : null,
    };

    onAddCard(newCard);
    onClose();
  };
  
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        staggerChildren: 0.07
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { 
        duration: 0.2 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border-2 border-purple-700 shadow-xl"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h2 
            className="text-2xl font-bold text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            variants={itemVariants}
          >
            Add New Card
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.3, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="relative text-red-400 hover:text-red-500 -top-3 -right-1"
            variants={itemVariants}
          >
            <IoClose size={28} />
          </motion.button>
        </div>
        <motion.hr className="border-purple-500/30 mb-4" variants={itemVariants} />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 font-semibold mb-1">Title</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter card title"
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter card description"
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.description ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </motion.div>

          {/* Tag Color */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 font-semibold mb-1">Tag Color</label>
            <div className="flex space-x-4 mt-2">
              {['green', 'blue', 'red'].map(color => (
                <motion.div 
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({...formData, tagColor: color})}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-transform border-2 ${
                    formData.tagColor === color ? 'border-white' : 'border-transparent'
                  } ${
                    color === 'green' ? 'bg-gradient-to-r from-green-600 to-green-500' :
                    color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
                    'bg-gradient-to-r from-red-600 to-red-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Checkbox Options for mutually exclusive features */}
          <motion.div className="flex space-x-6" variants={itemVariants}>
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="wantToUploadFile"
                name="wantToUploadFile"
                checked={formData.wantToUploadFile}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-500 rounded bg-gray-700"
              />
              <label htmlFor="wantToUploadFile" className="ml-2 text-gray-300 font-semibold">
                Upload File
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="footerDescriptionTag"
                name="footerDescriptionTag"
                checked={formData.footerDescriptionTag}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-500 rounded bg-gray-700"
              />
              <label htmlFor="footerDescriptionTag" className="ml-2 text-gray-300 font-semibold">
                Add Footer Details
              </label>
            </div>
          </motion.div>

          {/* Conditional Fields for File Upload */}
          {formData.wantToUploadFile && (
            <motion.div 
              variants={itemVariants}
              initial="hidden" 
              animate="visible"
              className="p-3 border border-dashed border-purple-500/50 rounded-lg bg-gray-700/30"
            >
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Upload File</label>
                <input 
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
              </div>
              <div className="mt-2">
                <label className="block text-gray-300 font-semibold mb-1">File Name</label>
                <input 
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleChange}
                  placeholder="Enter file name"
                  className={`w-full px-3 py-2 bg-gray-700 border ${errors.fileName ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.fileName && <p className="text-red-500 text-sm mt-1">{errors.fileName}</p>}
              </div>
              {formData.fileSize && (
                <p className="text-gray-300 mt-2">File Size: {formData.fileSize}</p>
              )}
              {formData.filePreview && (
                <div className="mt-3">
                  <img 
                    src={formData.filePreview}
                    alt="File Preview"
                    className="max-h-40 object-contain mx-auto rounded-lg"
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Conditional Fields for Footer Description Tag */}
          {formData.footerDescriptionTag && (
            <motion.div 
              variants={itemVariants}
              initial="hidden" 
              animate="visible"
              className="p-3 border border-dashed border-purple-500/50 rounded-lg bg-gray-700/30"
            >
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Details (Max 20 characters)
                </label>
                <input 
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="Enter details"
                  className={`w-full px-3 py-2 bg-gray-700 border ${errors.details ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                <p className="text-gray-400 text-xs mt-1">{formData.details.length}/20 characters</p>
              </div>
              <div className="mt-2">
                <label className="block text-gray-300 font-semibold mb-1">Date & Time</label>
                <input 
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div 
            variants={itemVariants}
            className="pt-2"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-md shadow-md hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add Card
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddCardForm;