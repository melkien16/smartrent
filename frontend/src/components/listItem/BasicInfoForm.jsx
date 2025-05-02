import React from 'react';
import { useCategories } from '../../context/CategoryContext';

const BasicInfoForm = React.memo(({ formData, handlers }) => {
  const { categories } = useCategories();
  const { updateField, handleNextStep } = handlers;

  return (
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
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
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
          value={formData.category}
          onChange={(e) => updateField('category', e.target.value)}
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
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
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
  );
});

export default BasicInfoForm; 