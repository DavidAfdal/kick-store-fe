import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  className?: string;
  placeholder: string;
  type: string;
} & React.ComponentProps<'input'>;

const Input = ({ className, placeholder, type, ...restProps }: InputProps) => {
  return <input type={type} className={twMerge('w-full border border-solid border-[#232321] rounded-md  p-4 bg-[#e7e7e3] outline-1 outline-[#232321] text-black', className)} placeholder={placeholder} {...restProps} />;
};

export default Input;
