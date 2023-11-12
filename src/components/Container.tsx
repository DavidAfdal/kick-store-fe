import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<'section'>;

const Container = ({ className = '', children, ...restProps }: ContainerProps) => {
  return (
    <section className={twMerge('max-w-[1400px] mx-auto p-2 mb-[24px] lg:mb-[100px]', className)} {...restProps}>
      {children}
    </section>
  );
};

export default Container;
