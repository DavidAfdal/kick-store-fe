import React from 'react';
type AccordionProps = {
  title: string;
  onToggle: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

const Accordion = ({ title, children, onToggle,isOpen}: AccordionProps) => {
  
  return (
    <div className='border rounded-md mb-1'>
      <button
        className='w-full p-4 text-left bg-gray-200  
                           hover:bg-gray-300 transition duration-300'
        onClick={onToggle} type='button'
      >
        {title}
        <span
          className={`float-right transform ${isOpen ? 'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}
        >
          &#9660;
        </span>
      </button>
      {isOpen && <div className='p-4 bg-transparent'>{children}</div>}
    </div>
  );
};

export default Accordion;
