import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Upload, AlertCircle, Info, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../context/CategoryContext';

const ListItemPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { categories } = useCategories();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('day');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState(['']);
  const [rules, setRules] = useState(['']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <Info size={40} />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Login Required</h1>
          <p className="mb-6 text-gray-600">
            You need to be logged in to list an item for rent.
          </p>
          <button 
            onClick={() => navigate('/auth')}
            className="btn-primary px-6 py-3"
          >
            Login or Sign Up
          </button>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // In a real app, you would upload these files to a server
    // For this demo, we'll use file objects and create URLs
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    // In a real app, you might need to revoke the URL to prevent memory leaks
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const updateRule = (index, value) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const removeRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!title || !description || !category) {
        setError('Please fill out all required fields');
        return;
      }
      // Clear error if validation passes
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!price || !location) {
        setError('Please fill out all required fields');
        return;
      }
      // Clear error if validation passes
      setError('');
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }
    
    // Filter out empty features and rules
    const filteredFeatures = features.filter(feature => feature.trim() !== '');
    const filteredRules = rules.filter(rule => rule.trim() !== '');
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      // In a real app, this would be an API call to create the listing
      console.log({
        title,
        description,
        category,
        price: Number(price),
        priceUnit,
        location,
        images,
        features: filteredFeatures,
        rules: filteredRules,
        owner: {
          id: user.id,
          name: user.name,
        },
      });
      
      // Show success page
      setStep(4);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">List Your Item</h1>
            <p className="mt-2 text-gray-600">
              Share your belongings and earn money when you're not using them
            </p>
          </div>

          {/* Progress Steps */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step >= 1 ? 'border-primary-500 bg-primary-500 text-white' : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step > 1 ? <Check size={18} /> : 1}
                </div>
                <div className={`h-1 flex-1 ${step > 1 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step >= 2 ? 'border-primary-500 bg-primary-500 text-white' : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step > 2 ? <Check size={18} /> : 2}
                </div>
                <div className={`h-1 flex-1 ${step > 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step >= 3 ? 'border-primary-500 bg-primary-500 text-white' : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step > 3 ? <Check size={18} /> : 3}
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <div className={`w-20 text-center ${step >= 1 ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
                  Basic Info
                </div>
                <div className={`w-20 text-center ${step >= 2 ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
                  Details
                </div>
                <div className={`w-20 text-center ${step >= 3 ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
                  Images
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center rounded-md bg-red-50 p-4 text-red-700">
              <AlertCircle size={20} className="mr-3 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="animate-fade-in rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="mb-4">
                <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                  Item Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className="input"
                  placeholder="e.g., Professional DSLR Camera"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  className="input min-h-[120px]"
                  placeholder="Describe your item in detail. Include condition, specifications, and any other important information."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Next: Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Pricing and Details */}
          {step === 2 && (
            <div className="animate-fade-in rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Pricing and Details</h2>
              
              <div className="mb-4">
                <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    $
                  </span>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    className="input rounded-l-none"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <select
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                    className="ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="hour">per hour</option>
                    <option value="day">per day</option>
                    <option value="week">per week</option>
                    <option value="month">per month</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  className="input"
                  placeholder="e.g., Seattle, WA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Item Features
                </label>
                <p className="mb-2 text-xs text-gray-500">
                  Add details about what's included with your item
                </p>
                
                {features.map((feature, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., Includes extra battery"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 rounded-md p-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <Plus size={16} className="mr-1" />
                  Add Feature
                </button>
              </div>
              
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rental Rules
                </label>
                <p className="mb-2 text-xs text-gray-500">
                  Set expectations for renters (e.g., ID required, security deposit, etc.)
                </p>
                
                {rules.map((rule, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., ID required"
                      value={rule}
                      onChange={(e) => updateRule(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeRule(index)}
                      className="ml-2 rounded-md p-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addRule}
                  className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <Plus size={16} className="mr-1" />
                  Add Rule
                </button>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Next: Images
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-fade-in rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Upload Images</h2>
              
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Item Photos <span className="text-red-500">*</span>
                </label>
                <p className="mb-4 text-xs text-gray-500">
                  Add at least one photo of your item. Better photos increase your chances of renting out your item.
                </p>
                
                <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={image.url}
                        alt={`Item photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-white/80 p-1 text-gray-700 hover:bg-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={24} className="mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">Click to upload</p>
                      <p className="text-xs text-gray-400">PNG, JPG, WEBP</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'List My Item'}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="animate-fade-in rounded-lg bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check size={40} />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Item Listed Successfully!</h2>
              <p className="mb-6 text-gray-600">
                Your item has been listed and is now visible to potential renters.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <button
                  onClick={() => navigate('/profile/me')}
                  className="btn-primary"
                >
                  View My Listings
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn-outline"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItemPage;