import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import Cards from './Cards';
import AddCardForm from './AddCardForm';

const Foreground = () => {
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState([
    {
      title: 'Sample Card 1',
      description: 'This is sample card 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileSize: '1.5MB',
        close: false,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'green',
      },
    },
    {
      title: 'Sample Card 2',
      description: 'This is sample card 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileSize: '1.5MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'green',
      },
    },
    {
      title: 'Sample Card 3',
      description: 'A comprehensive overview of the project with extended description showcasing multiple features.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileSize: '1.5MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'green',
      },
    },
    {
      title: 'Sample Card 4',
      description: 'Exploring the intricacies of modern web development and design principles.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: false,
        fileSize: '1.5MB',
        close: true,
      },
      tag: {
        isOpen: true,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'red',
      },
    },
  ]);

  const handleAddCard = (newCard) => {
    // Add the default icon.
    newCard.icon = FaAssistiveListeningSystems;
    // Transform newCard from the form into the expected structure.
    const card = {
      title: newCard.title,
      description: newCard.description,
      icon: newCard.icon,
      download: newCard.upload
        ? {
            isOpen: true,
            fileName: newCard.upload.fileName,
            fileSize: newCard.upload.fileSize,
            filePreview: newCard.upload.filePreview,
            close: false,
          }
        : { isOpen: false },
      tag: newCard.footerDetails
        ? {
            isOpen: true,
            tagDetails: [
              newCard.footerDetails.details,
              newCard.footerDetails.dateTime,
            ],
            tagColor: newCard.tagColor || 'green',
          }
        : { isOpen: false },
    };

    // Append the new card using the spread operator.
    setCards([...cards, card]);
  };

  const handleDeleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const AddButton = () => (
    <motion.button
      onClick={() => setShowForm(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <IoAdd className="text-white text-2xl" />
    </motion.button>
  );

  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-10 w-full h-full flex gap-5 flex-wrap p-3 md:p-5 overflow-y-auto"
      >
        {cards.map((item, index) => (
          <Cards
            key={`card-${index}`}
            data={item}
            reference={ref}
            onDelete={() => handleDeleteCard(index)}
          />
        ))}
      </div>

      <AddButton />

      <AnimatePresence>
        {showForm && (
          <AddCardForm
            onAddCard={handleAddCard}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Foreground;