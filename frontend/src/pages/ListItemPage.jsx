import React from 'react';
import { AlertCircle } from 'lucide-react';
import AuthRedirect from '../components/listItem/AuthRedirect';
import ProgressSteps from '../components/listItem/ProgressSteps';
import BasicInfoForm from '../components/listItem/BasicInfoForm';
import PricingDetailsForm from '../components/listItem/PricingDetailsForm';
import ImageUploadForm from '../components/listItem/ImageUploadForm';
import SuccessMessage from '../components/listItem/SuccessMessage';
import { useListItem } from '../hooks/useListItem';

const ListItemPage = () => {
  const { isAuthenticated, step, error, formData, handlers } = useListItem();
  
  if (!isAuthenticated) return <AuthRedirect />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">List Your Item</h1>
          <p className="mb-8 text-center text-gray-600">
            Share your belongings and earn money when you're not using them
          </p>
          
          {step < 4 && <ProgressSteps step={step} />}
          
          {error && (
            <div className="mb-6 flex items-center rounded-md bg-red-50 p-4 text-red-700">
              <AlertCircle size={20} className="mr-3 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {step === 1 && <BasicInfoForm formData={formData} handlers={handlers} />}
          {step === 2 && <PricingDetailsForm formData={formData} handlers={handlers} />}
          {step === 3 && <ImageUploadForm formData={formData} handlers={handlers} />}
          {step === 4 && <SuccessMessage />}
        </div>
      </div>
    </div>
  );
};

export default ListItemPage;