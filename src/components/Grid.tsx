import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columnsAmount: number;
}

interface GridItemsProps {
  className?: string;
  children: React.ReactNode;
}

const Grid = ({ children, columnsAmount, className }: GridProps) => {
  const columnVariants: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  return <div className={twMerge(`grid gap-4 ${columnVariants[columnsAmount]}`, className)}>{children}</div>;
};

const GridItem = ({ className, children }: GridItemsProps) => {
  return <div className={className}>{children}</div>;
};

Grid.items = GridItem;

export default Grid;
