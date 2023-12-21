import React from 'react';
import { twMerge } from 'tailwind-merge';

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div className={twMerge('h-[20px] w-full bg-gray-400 rounded animate-pulse', className)}></div>
  );
};

export default Skeleton