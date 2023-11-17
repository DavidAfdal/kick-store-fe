import React, { ReactNode } from 'react';
import Button from './Button';

type CardProps = {
  children: ReactNode;
  className?: string;
} & React.ComponentProps<'div'>;

const Card = ({ children, className, ...restProps }: CardProps) => {
  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
};

const CardImg = ({ src, alt, tags, diskon }: { src: string; alt: string; tags?: string; diskon?: number }) => {
  return (
    <figure className='bg-white p-2 rounded-[25px] mb-4'>
      <div className='max-h-[300px] w-full  relative'>
        {diskon ? (
          <div className='bg-[#FFA52F]  text-[#232321] absolute rounded-tl-[25px] rounded-br-[25px] font-semibold p-[15px]'>{`${diskon}% off`}</div>
        ) : tags !== undefined ? (
          <div className='bg-[#4A69E2]  text-white absolute rounded-tl-[25px] rounded-br-[25px] p-[15px]'>{tags}</div>
        ) : null}
        <img src={src} alt={alt} className='max-h-[300px] w-full object-cover object-center rounded-[25px]' />
      </div>
    </figure>
  );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <p className='mb-4 text-semibold md:text-base text-sm line-clamp-1'>{children}</p>;
};

const CardButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <Button className='text-xs bg-[#232321] text-white flex p-2 justify-center items-center w-full md:text-base' onClick={onClick}>
      {children}
    </Button>
  );
};

Card.Img = CardImg;
Card.Title = CardTitle;
Card.Button = CardButton;

export default Card;
