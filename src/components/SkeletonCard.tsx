const SkeletonCard = () => {
  return (
    <div className='w-full'>
      <div className='bg-white p-2 '>
        <div className='animate-pulse'>
          <div className='min-h-[300px] w-full bg-gray-400 rounded'></div>
        </div>
      </div>
      <div className='h-[20px] w-full bg-gray-400 rounded animate-pulse mt-2'></div>

      <div className='h-[40px] w-full bg-gray-400 rounded animate-pulse mt-2'></div>
    </div>
  );
};

export default SkeletonCard;
