import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../context/CategoryContext';
import { createItem } from '../Fetchers/itemFetcher';

export const useListItem = () => {
    const { isAuthenticated, user } = useAuth();
    const { categories } = useCategories();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        priceUnit: 'day',
        location: '',
        images: [],
        features: [''],
        rules: [''],
    });

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
        }));
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const removeImage = (index) => {
        const newImages = [...formData.images];
        URL.revokeObjectURL(newImages[index].url);
        newImages.splice(index, 1);
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const removeFeature = (index) => {
        const newFeatures = [...formData.features];
        newFeatures.splice(index, 1);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addRule = () => {
        setFormData(prev => ({ ...prev, rules: [...prev.rules, ''] }));
    };

    const updateRule = (index, value) => {
        const newRules = [...formData.rules];
        newRules[index] = value;
        setFormData(prev => ({ ...prev, rules: newRules }));
    };

    const removeRule = (index) => {
        const newRules = [...formData.rules];
        newRules.splice(index, 1);
        setFormData(prev => ({ ...prev, rules: newRules }));
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!formData.title || !formData.description || !formData.category) {
                setError('Please fill out all required fields');
                return;
            }
            setError('');
            setStep(2);
        } else if (step === 2) {
            if (!formData.price || !formData.location) {
                setError('Please fill out all required fields');
                return;
            }
            setError('');
            setStep(3);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.images.length === 0) {
            setError('Please upload at least one image');
            return;
        }

        const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
        const filteredRules = formData.rules.filter(rule => rule.trim() !== '');

        setIsSubmitting(true);

        try {
            const itemData = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                priceUnit: formData.priceUnit || 'day',
                location: formData.location,
                images: formData.images.map(img => img.url),
                category: formData.category,
                features: filteredFeatures,
                rules: filteredRules,
                availability: 'Now',
                rating: 0,
                reviews: 0
            };

            await createItem(itemData);
            setStep(4);
        } catch (error) {
            setError('Failed to create item. Please try again.');
            console.error('Error creating item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlers = {
        updateField,
        handleImageUpload,
        removeImage,
        addFeature,
        updateFeature,
        removeFeature,
        addRule,
        updateRule,
        removeRule,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        setStep,
        setError,
    };

    return {
        isAuthenticated,
        step,
        error,
        formData,
        handlers,
        categories,
        isSubmitting,
        navigate,
    };
}; 