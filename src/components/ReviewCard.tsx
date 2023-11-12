import React from 'react';
import StarRating from './StarRating';

const ReviewCard = ({ children }: { children: React.ReactNode[] | React.ReactNode }) => {
  return <div>{children}</div>;
};

const ReviewCardContent = ({ children, rating, img }: { children: React.ReactNode[] | React.ReactNode; rating: number; img?: string }) => {
  return (
    <div className='bg-white p-4 rounded-tl-[25px] rounded-tr-[25px]'>
      <div className='flex items-center justify-between'>
        <div>{children}</div>
        <div className='w-[64px] h-[64px]'>
          <img src={img} alt='profileimg' className='object-cover object-center w-full h-full rounded-full' />
        </div>
      </div>
      <StarRating ratingx={rating} />
    </div>
  );
};

const ReviewCardImage = ({ img }: { img: string }) => {
  return (
    <div className='w-full h-[350px]'>
      <img src={img} alt='product image' className='object-cover object-center w-full h-full rounded-b-[25px]' />
    </div>
  );
};

ReviewCard.Content = ReviewCardContent;
ReviewCard.Image = ReviewCardImage;

export default ReviewCard;
