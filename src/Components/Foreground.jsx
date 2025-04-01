import React, { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaNotesMedical, FaBook, FaCalendarAlt } from 'react-icons/fa';
import Cards from './Cards';
import AddCardForm from './AddCardForm'; // Import AddCardForm
import AddButton from './AddButton';

const Foreground = () => {
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false); // Controls AddCardForm visibility
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
  // Icon mapping for dynamic selection
  const iconMap = {
    FaFileAlt: FaFileAlt,
    FaNotesMedical: FaNotesMedical,
    FaBook: FaBook,
    FaCalendarAlt: FaCalendarAlt,
  };

  // Initial cards
  const [cards, setCards] = useState([
    {
      id: 'card-' + crypto.randomUUID(), // Use crypto for unique ID generation
      title: 'Sample Card 1',
      description: 'This is sample card 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: FaFileAlt,
      download: {
        isOpen: true,
        fileName: 'sample1.pdf',
        fileSize: '1.5 MB',
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Manab Biswas', 'Last updated: 28/03/2025'],
        tagColor: 'green',
      },
    },
    {
      id: 'card-' + crypto.randomUUID(),
      title: 'Sample Card 2',
      titleColor: 'blue',
      description: 'This is sample card 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: FaBook,
      download: {
        isOpen: true,
        filePreview: "/icon.png",
        fileName: 'icon.png',
        fileSize: '0.1 MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Manab Biswas', 'Last updated: 28/03/2025'],
        tagColor: 'red',
      },
    },
    {
      id: 'card-' + crypto.randomUUID(),
      title: 'Sample Card 3',
      titleColor: 'red',
      description: 'A comprehensive overview of the project with extended description showcasing multiple features.',
      icon: FaBook,
      download: {
        isOpen: true,
        fileName: 'sample3.pdf',
        fileSize: '1.5 MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: ['Created by: Manab Biswas', 'Last updated: 28/03/2025'],
        tagColor: 'blue',
      },
    },
    {
      id: 'card-' + crypto.randomUUID(),
      title: 'Sample Card 4',
      description: 'Exploring the intricacies of modern web development and design principles.',
      icon: FaCalendarAlt,
      download: {
        isOpen: false,
        fileSize: '1.5 MB',
        close: true,
      },
      tag: {
        isOpen: true,
        tagDetails: ['Created by: Manab Biswas', 'Last updated: 01/04/2025'],
        tagColor: '',
      },
    },

  ]);

  // Function to add a new card
  const handleAddCard = (newCard) => {
    const card = {
      id: 'card-' + crypto.randomUUID(),
      title: newCard.title || 'Untitled',
      titleColor: newCard.titleColor || 'gray',
      description: newCard.description || 'No description provided.',
      icon: iconMap[newCard.iconType] || FaFileAlt,
      download: newCard.upload
        ? {
          isOpen: true,
          fileName: newCard.upload.fileName,
          fileSize: newCard.upload.fileSize,
          filePreview: newCard.upload.filePreview,
        }
        : { isOpen: false },
      tag: {
        isOpen: !!newCard.footerDetails,
        tagDetails: newCard.footerDetails
          ? [
            newCard.footerDetails.details,
            new Date(newCard.footerDetails.dateTime).toLocaleString(),
          ]
          : [],
        tagColor: newCard.tagColor || 'gray',
      },
    };

    setCards((prevCards) => [...prevCards, card]); // Append new card to state
    setShowForm(false); // Close the form after adding
  };

  // Function to delete a card by ID
  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div>
      {/* Cards List */}
      <div
        ref={ref}
        className="fixed top-0 left-0 z-10 w-full h-full flex gap-5 flex-wrap p-3 md:p-5 overflow-y-auto overflow-x-hidden"
      >
        <div className="h-0 bg-amber-50 w-full"></div>
        <AnimatePresence>
          {cards.map((item) => (
            <Cards
              key={item.id}
              data={item}
              reference={ref}
              dragVariants={dragVariants}
              onDelete={handleDeleteCard}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Add Button */}
      <AddButton onClick={() => setShowForm(true)}
        dragVariants={dragVariants} reference={ref}
      />

      {/* Add Card Form */}
      <AnimatePresence>
        {showForm && (
          <AddCardForm
            onAddCard={handleAddCard}
            onClose={() => setShowForm(false)} // Close the form
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Foreground;