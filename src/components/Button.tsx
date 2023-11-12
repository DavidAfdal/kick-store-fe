import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtoProps = {
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<'button'>;

const Button = ({ className = '', children, ...restProps }: ButtoProps) => {
  return (
    <button className={twMerge('bg-[#4A69E2] py-2 px-4 text-white rounded-md', className)} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
