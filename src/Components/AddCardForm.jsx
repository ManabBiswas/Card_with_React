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
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(`File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB`);
        return;
      }
      setFormData({
        ...formData,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border-2 border-purple-700 shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white text-center">Add New Card</h2>
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="relative text-red-400 hover:text-red-500 -top-3 -right-1"
          >
            <IoClose size={28} />
          </motion.button>
        </div>
        <hr className="text-white" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Title</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter card title"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Enter card description"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Tag Color */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Tag Color</label>
            <select
              name="tagColor"
              value={formData.tagColor}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </div>

          {/* Checkbox Options for mutually exclusive features */}
          <div className="flex space-x-6">
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
                Want to Upload File
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
                Footer Description Tag
              </label>
            </div>
          </div>

          {/* Conditional Fields for File Upload */}
          {formData.wantToUploadFile && (
            <>
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Upload File</label>
                <input 
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-1">File Name</label>
                <input 
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleChange}
                  required
                  placeholder="Enter file name"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formData.fileSize && (
                <p className="text-gray-300">File Size: {formData.fileSize}</p>
              )}
              {formData.filePreview && (
                <div className="mt-2">
                  <img 
                    src={formData.filePreview}
                    alt="File Preview"
                    className="max-h-40 object-contain"
                  />
                </div>
              )}
            </>
          )}

          {/* Conditional Fields for Footer Description Tag */}
          {formData.footerDescriptionTag && (
            <>
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
                  required
                  placeholder="Enter details"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Date & Time</label>
                <input 
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-md shadow-md hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add Card
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddCardForm;