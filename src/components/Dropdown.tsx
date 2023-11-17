import React, { useState, useRef, useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';

type DropdownProps = { children: React.ReactNode };

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay closing the dropdown to allow moving the mouse to the dropdown
    setTimeout(() => {
      if (dropdownRef.current) {
        if (!dropdownRef.current.contains(document.activeElement)) {
          closeDropdown();
        }
      }
    }, 200); // Adjust the delay as needed
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='relative w-[24px] h-[24px]' ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button type='button' className='bg-white w-full h-full' id='options-menu' aria-haspopup='true' aria-expanded={isOpen}>
        <BsFillPersonFill className='text-2xl font-medium text-gray-700 focus:text-[#4A69E2] hover:text-[#4A69E2] ' />
      </button>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
          <div className='py-1' role='none'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
