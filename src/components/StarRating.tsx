const StarRating = ({ ratingx }: { ratingx: number }) => {
  return (
    <div className='star-rating flex items-center'>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button type='button' key={index} className={`rating-button ${index <= ratingx ? 'on' : 'off'}`}>
            <span className='star'>&#9733;</span>
          </button>
        );
      })}
      <p className='ml-2'>{`${ratingx}.0`}</p>
    </div>
  );
};

export default StarRating;
