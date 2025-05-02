import React from 'react';
import { Check } from 'lucide-react';

const ProgressSteps = React.memo(({ step }) => {
  return (
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
  );
});

export default ProgressSteps; 