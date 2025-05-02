import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useCategories } from '../../context/CategoryContext';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { getCategoryById } = useCategories();
  const category = getCategoryById(images[0]?.category);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-200">
      <div className="aspect-[4/3]">
        <img 
          src={images[currentImageIndex]} 
          alt="Item"
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Image navigation */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage} 
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Image indicator */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-1.5">
            {images.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Favorite button */}
      <button
        onClick={toggleFavorite}
        className={`absolute right-4 top-4 rounded-full bg-white p-2 shadow-sm transition-colors ${
          isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      
      {/* Category tag */}
      {category && (
        <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-medium ${category.color}`}>
          {category.name}
        </div>
      )}
    </div>
  );
};

export default React.memo(ImageGallery); 