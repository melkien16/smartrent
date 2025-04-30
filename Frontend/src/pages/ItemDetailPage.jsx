import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, AlertCircle, Star, User, ChevronLeft, ChevronRight, Heart, Shield } from 'lucide-react';
import { featuredItems, recentItems } from '../data/mockData';
import { useCategories } from '../context/CategoryContext';
import { useAuth } from '../context/AuthContext';

const ItemDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { getCategoryById } = useCategories();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalDays, setTotalDays] = useState(1);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch item data
  useEffect(() => {
    // In a real app, this would be an API call
    const foundItem = [...featuredItems, ...recentItems].find(item => item.id === id);
    
    // Simulate API delay
    setTimeout(() => {
      setItem(foundItem || null);
      setLoading(false);
    }, 300);
  }, [id]);

  // Calculate total days and cost when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate days difference
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setTotalDays(diffDays || 1);
    }
  }, [startDate, endDate]);

  const nextImage = () => {
    if (!item) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!item) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would update in a database
  };

  const handleRentNow = () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/auth';
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      setError('End date must be after start date');
      return;
    }

    // In a real app, this would create a booking request
    alert('Booking request sent! The owner will respond to your request soon.');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-primary-200"></div>
          <p className="mt-4 text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-500">
            <AlertCircle size={40} />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Item Not Found</h1>
          <p className="mb-6 text-gray-600">
            Sorry, we couldn't find the item you're looking for. It may have been removed or doesn't exist.
          </p>
          <Link to="/explore" className="btn-primary">
            Browse Other Items
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(item.category);

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/explore" className="text-gray-500 hover:text-primary-600">Explore</Link>
            {category && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <Link 
                  to={`/explore?category=${category.id}`} 
                  className="text-gray-500 hover:text-primary-600"
                >
                  {category.name}
                </Link>
              </>
            )}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 line-clamp-1">{item.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column: Images and Details */}
          <div className="md:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-200">
              <div className="aspect-[4/3]">
                <img 
                  src={item.images[currentImageIndex]} 
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Image navigation */}
              {item.images.length > 1 && (
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
                    {item.images.map((_, index) => (
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
            
            {/* Item Details */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{item.title}</h1>
                <div className="flex items-center">
                  <Star size={18} className="mr-1 text-yellow-400" fill="currentColor" />
                  <span className="font-medium text-gray-900">{item.rating}</span>
                  <span className="ml-1 text-gray-500">
                    ({item.reviews} {item.reviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
              
              <div className="mb-4 flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1" />
                <span>{item.location}</span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{item.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="mb-3 text-xl font-semibold text-gray-900">Features</h2>
                <ul className="space-y-2">
                  {item.features ? (
                    item.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-500"></div>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No specific features listed for this item</li>
                  )}
                </ul>
              </div>
              
              {item.rules && (
                <div className="mb-8">
                  <h2 className="mb-3 text-xl font-semibold text-gray-900">Rental Rules</h2>
                  <ul className="space-y-2">
                    {item.rules.map((rule, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-accent-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Owner Information */}
              {item.owner && (
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h2 className="mb-3 text-lg font-semibold text-gray-900">About the Owner</h2>
                  <div className="flex items-center">
                    <img 
                      src={item.owner.avatar} 
                      alt={item.owner.name}
                      className="mr-4 h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.owner.name}</h3>
                      <div className="mt-1 flex items-center">
                        <Star size={14} className="mr-1 text-yellow-400" fill="currentColor" />
                        <span className="text-sm">{item.owner.rating} rating</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Typically responds {item.owner.responseTime}
                      </p>
                      <Link 
                        to={`/profile/${item.owner.id}`}
                        className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        <User size={14} className="mr-1" />
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column: Booking and Price */}
          <div>
            <div className="sticky top-20 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                <span className="ml-1 text-gray-600">/{item.priceUnit}</span>
              </div>
              
              <div className="mb-6">
                <div className="mb-4 flex items-center rounded-md bg-green-50 p-2 text-sm text-green-800">
                  <Calendar size={16} className="mr-2 flex-shrink-0" />
                  Available {item.availability}
                </div>
                
                {error && (
                  <div className="mb-4 flex items-center rounded-md bg-red-50 p-2 text-sm text-red-700">
                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                    {error}
                  </div>
                )}
                
                <form>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="input"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setError('');
                      }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="input"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setError('');
                      }}
                      min={startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  {(startDate && endDate) && (
                    <div className="mb-6 space-y-2 rounded-md bg-gray-50 p-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">${item.price} x {totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                        <span className="font-medium">${item.price * totalDays}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">${Math.round(item.price * totalDays * 0.1)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${item.price * totalDays + Math.round(item.price * totalDays * 0.1)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    className="btn-primary w-full"
                    onClick={handleRentNow}
                  >
                    {isAuthenticated ? 'Rent Now' : 'Login to Rent'}
                  </button>
                </form>
              </div>
              
              <div className="flex items-center justify-center space-x-2 rounded-md bg-gray-50 p-3 text-sm text-gray-600">
                <Shield size={16} className="text-primary-500" />
                <span>All rentals are protected by smartRent guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;