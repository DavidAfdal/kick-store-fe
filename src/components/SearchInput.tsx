import React from 'react';
import { twMerge } from 'tailwind-merge';

type SearchInputProps = {
  className?: string;
  placeholder?: string;
} & React.ComponentProps<'input'>;

const SearchInput: React.FC<SearchInputProps> = ({ className, placeholder, ...restProps }) => {
  return (
    <div className='relative'>
      <input type='text' className={twMerge('pl-10 pr-4 py-2 border border-[#4A69E2] rounded-lg bg-transparent outline outline-1 outline-[#4A69E2]', className)} placeholder={placeholder} {...restProps} />
      <div
        className='absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none'
      >
        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' className='w-6 h-6 text-[#4A69E2]'>
          <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
