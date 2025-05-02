import React from 'react';
import { Upload, X } from 'lucide-react';

const ImageUploadForm = React.memo(({ formData, handlers }) => {
  const { handleImageUpload, removeImage, handleSubmit, handlePrevStep, isSubmitting } = handlers;

  return (
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
          {formData.images.map((image, index) => (
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
  );
});

export default ImageUploadForm; 