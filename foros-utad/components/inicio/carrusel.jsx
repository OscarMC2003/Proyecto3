import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-full"> {/* Utiliza h-full o max-h-[value] para controlar la altura */}
      <button 
        className="absolute left-0 z-10 h-full flex items-center px-4 focus:outline-none text-5xl text-blue-600" 
        onClick={goToPrevious}
      >
        &#60;
      </button>
      <button 
        className="absolute right-0 z-10 h-full flex items-center px-4 focus:outline-none text-5xl text-blue-600" 
        onClick={goToNext}
      >
        &#62;
      </button>
      <div className="overflow-hidden w-full h-full"> {/* Asegura que la altura y el ancho sean controlados */}
        <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="inline-block w-full h-full object-contain" 
              alt={`Slide ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
