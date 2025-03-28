import React, { useRef } from 'react';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import Cards from './Cards';

const Foreground = () => {
  // Corrected `useref` to `useRef`
  const ref = useRef(null);

  const data = [
    {
      description: 'This is My first card. Lorem ipsum dolor sit ametit. Nostrum, soluta?',
      title: 'Card 1',
      icon: FaAssistiveListeningSystems, // Directly import the icon
      download: {
        isOpen: true,
        fileSize: '1.5MB',
        close: false,
      },
      tag: {
        isOpen: false,
        tagDetails: [
          'Created by: Manab Biswas',
          'Last updated: 28/03/2025',
        ],
        tagColor: 'green',
      },
    },
    {
      description: 'This is My second card. Lorem ipsum dolor sit ametit. Nostrum, soluta?',
      title: 'Card 2',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileSize: '1.5MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: [
          'Created by: Manab Biswas',
          'Last updated: 28/03/2025',
        ],
        tagColor: 'green',
      },
    },
    {
      description: 'A comprehensive overview of the project with extended description showcasing multiple features and capabilities.',
      title: 'Card 3',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: true,
        fileSize: '1.5MB',
        close: true,
      },
      tag: {
        isOpen: false,
        tagDetails: [
          'Created by: Manab Biswas',
          'Last updated: 28/03/2025',
        ],
        tagColor: 'green',
      },
    },
    {
      description: 'Exploring the intricacies of modern web development and design principles.',
      title: 'Card 4',
      icon: FaAssistiveListeningSystems,
      download: {
        isOpen: false,
        fileSize: '1.5MB',
        close: true,
      },
      tag: {
        isOpen: true,
        tagDetails: [
          'Created by: Manab Biswas',
          'Last updated: 28/03/2025',
        ],
        tagColor: 'red',
      },
    },
  ];

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-10 w-full h-full flex gap-5 flex-wrap p-3 md:p-5 overflow-y-auto"
    >
      {data.map((item, index) => (
        <Cards key={`card-${index}`} data={item} reference={ref} />
      ))}
    </div>
  );
};

export default Foreground;