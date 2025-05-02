import React from 'react';
import { Plus, X } from 'lucide-react';

const PricingDetailsForm = React.memo(({ formData, handlers }) => {
  const { updateField, addFeature, updateFeature, removeFeature, addRule, updateRule, removeRule, handleNextStep, handlePrevStep } = handlers;

  return (
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
            value={formData.price}
            onChange={(e) => updateField('price', e.target.value)}
            required
          />
          <select
            value={formData.priceUnit}
            onChange={(e) => updateField('priceUnit', e.target.value)}
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
          value={formData.location}
          onChange={(e) => updateField('location', e.target.value)}
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
        
        {formData.features.map((feature, index) => (
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
        
        {formData.rules.map((rule, index) => (
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
  );
});

export default PricingDetailsForm; 