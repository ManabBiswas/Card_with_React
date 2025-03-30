import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import Cards from './Cards';
import AddCardForm from './AddCardForm';

const Foreground = () => {
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false);
  
  // Initial cards with unique IDs
  const [cards, setCards] = useState([
    {
      id: 'card-' + Date.now() + '-1',
      title: 'Sample Card 1',
      description: 'This is sample card 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileName: 'sample1.pdf',
        fileSize: '1.5 MB',
        close: false,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'green',
      },
    },
    {
      id: 'card-' + Date.now() + '-2',
      title: 'Sample Card 2',
      description: 'This is sample card 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileName: 'sample2.pdf',
        fileSize: '1.5 MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'blue',
      },
    },
    {
      id: 'card-' + Date.now() + '-3',
      title: 'Sample Card 3',
      description: 'A comprehensive overview of the project with extended description showcasing multiple features.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileName: 'sample3.pdf',
        fileSize: '1.5 MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'green',
      },
    },
    {
      id: 'card-' + Date.now() + '-4',
      title: 'Sample Card 4',
      description: 'Exploring the intricacies of modern web development and design principles.',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: false,
        fileSize: '1.5 MB',
        close: true,
      },
      tag: {
        isOpen: true,
        tagDetails: ['Created by: Sample User', 'Last updated: 28/03/2025'],
        tagColor: 'red',
      },
    },
  ]);

  // Function to generate a unique ID
  const generateUniqueId = () => {
    return 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const handleAddCard = (newCard) => {
    // Generate a unique ID using our function
    const newId = generateUniqueId();
    
    // Add the default icon
    newCard.icon = FaAssistiveListeningSystems;
    
    // Transform newCard with the ID
    const card = {
      id: newId,
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
      tag: {
        isOpen: newCard.footerDetails ? true : false,
        tagDetails: newCard.footerDetails
          ? [
              newCard.footerDetails.details,
              new Date(newCard.footerDetails.dateTime).toLocaleString(),
            ]
          : [],
        tagColor: newCard.tagColor || 'green',
      },
    };

    // Append the new card
    setCards([...cards, card]);
  };

  // Delete function using the card ID
  const handleDeleteCard = (cardId) => {
    // Filter out the card with the specified ID
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
  };

  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-10 w-full h-full flex gap-5 flex-wrap p-3 md:p-5 overflow-y-auto"
      >
        <AnimatePresence>
          {cards.map((item) => (
            <Cards
              key={item.id} // Use the card's ID as the key
              data={item}
              reference={ref}
              cardId={item.id} // Pass the ID to the component
              onDelete={handleDeleteCard}
            />
          ))}
        </AnimatePresence>
      </div>

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