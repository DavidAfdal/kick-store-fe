import React from 'react';
import { twMerge } from 'tailwind-merge';

type CheckBoxProps = {
  label: string;
  className?: string;
} & React.ComponentProps<'input'>;

const CheckBox: React.FC<CheckBoxProps> = ({ label, className, ...restProps }) => {
  return (
    <div className='flex gap-2 items-start'>
      <input type='checkbox' id='some_id' className={twMerge('w-4 h-4 border-2 border-[#232321] form-checkbox text-[#232321] rounded-sm  mt-1', className)} {...restProps} />
      <label htmlFor='some_id'>{label}</label>
    </div>
  );
};

export default CheckBox;
