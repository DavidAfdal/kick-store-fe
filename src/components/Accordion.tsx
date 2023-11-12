import React from 'react';
type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion = ({ title, children }: AccordionProps) => {
  const [opens, setOpens] = React.useState(true);
  return (
    <div className='border rounded-md mb-1'>
      <button
        className='w-full p-4 text-left bg-gray-200  
                           hover:bg-gray-300 transition duration-300'
        onClick={() => setOpens(!opens)}
      >
        {title}
        <span
          className={`float-right transform ${opens ? 'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}
        >
          &#9660;
        </span>
      </button>
      {opens && <div className='p-4 bg-transparent'>{children}</div>}
    </div>
  );
};

export default Accordion;
