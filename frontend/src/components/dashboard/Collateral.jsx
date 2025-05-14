import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyCollateral, uploadOrUpdateCollateral } from '../../Fetchers/collateralFetcher';
import { toast } from 'react-hot-toast';
import { ShieldCheck, UploadCloud, Edit3, Info, AlertTriangle, DollarSign, FileText, Loader2, Banknote } from 'lucide-react';

const Collateral = () => {
    const { user } = useAuth();
    const [collateral, setCollateralData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        collateralType: 'ID',
        description: '',
        value: '',
        documents: [],
    });
    const [isEditing, setIsEditing] = useState(false);

    const fetchCollateralDetails = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getMyCollateral();
            if (data) {
                setCollateralData(data);
                setFormData({
                    collateralType: data.collateralType || 'ID',
                    description: data.description || '',
                    value: data.value || '',
                    documents: data.documents || [],
                });
                setIsEditing(false);
            } else {
                setFormData(prev => ({ ...prev, collateralType: 'ID' }));
                setIsEditing(true);
            }
        } catch (err) {
            setError('Failed to fetch collateral information.');
            toast.error(err.message || 'Failed to fetch collateral.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCollateralDetails();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDocumentChange = (e) => {
        const files = Array.from(e.target.files).map(file => file.name);
        setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
        toast.success(`${files.length} document(s) added (names only). Actual upload needed.`);
    };

    const removeDocument = (docName) => {
        setFormData(prev => ({ ...prev, documents: prev.documents.filter(doc => doc !== docName) }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.collateralType || !formData.value) {
            toast.error('Collateral type and value are required.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const updatedCollateralResponse = await uploadOrUpdateCollateral(formData);
            setCollateralData(updatedCollateralResponse.collateral);
            setFormData({
                collateralType: updatedCollateralResponse.collateral.collateralType || 'ID',
                description: updatedCollateralResponse.collateral.description || '',
                value: updatedCollateralResponse.collateral.value || '',
                documents: updatedCollateralResponse.collateral.documents || [],
            });
            toast.success('Collateral information saved successfully!');
            setIsEditing(false);
        } catch (err) {
            setError('Failed to save collateral information.');
            toast.error(err.message || 'Failed to save collateral.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin h-8 w-8 text-primary-600" />
                <p className="ml-2 text-gray-600">Loading collateral details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <Banknote size={32} className="text-primary-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Manage Collateral</h2>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    <span>{error}</span>
                </div>
            )}

            {!isEditing && collateral && (
                <div className="space-y-4 mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 className="text-xl font-medium text-gray-700">Current Collateral Details</h3>
                    <p><strong>Type:</strong> {collateral.collateralType}</p>
                    <p><strong>Description:</strong> {collateral.description || 'N/A'}</p>
                    <p><strong>Value:</strong> ${collateral.value ? parseFloat(collateral.value).toFixed(2) : '0.00'}</p>
                    <div>
                        <strong>Documents:</strong>
                        {collateral.documents && collateral.documents.length > 0 ? (
                            <ul className="list-disc list-inside ml-4 mt-1">
                                {collateral.documents.map((doc, index) => (
                                    <li key={index} className="text-sm text-gray-600">{doc}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No documents uploaded.</p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <Edit3 size={16} className="mr-2" /> Edit Collateral
                    </button>
                </div>
            )}

            {(isEditing || !collateral) && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-700">
                        {collateral ? 'Update Your Collateral' : 'Add Collateral Information'}
                    </h3>
                    <div>
                        <label htmlFor="collateralType" className="block text-sm font-medium text-gray-700 mb-1">
                            Collateral Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="collateralType"
                            id="collateralType"
                            value={formData.collateralType}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                            <option value="ID">ID</option>
                            <option value="Property">Property</option>
                            <option value="Cash">Cash</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Brief description of the collateral"
                        />
                    </div>

                    <div>
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                            Estimated Value ($) <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="number"
                                name="value"
                                id="value"
                                value={formData.value}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
                            Supporting Documents
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                    >
                                        <span>Upload files</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleDocumentChange} multiple />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                            </div>
                        </div>
                        {formData.documents && formData.documents.length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700">Uploaded documents (names only):</p>
                                <ul className="list-disc list-inside ml-4 mt-1">
                                    {formData.documents.map((doc, index) => (
                                        <li key={index} className="text-sm text-gray-600 flex items-center justify-between">
                                            {doc}
                                            <button type="button" onClick={() => removeDocument(doc)} className="ml-2 text-red-500 hover:text-red-700">
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p className="mt-2 text-xs text-gray-500 flex items-center">
                            <Info size={14} className="mr-1" /> For demonstration, only file names are stored. Actual file upload functionality needed.
                        </p>
                    </div>

                    <div className="flex items-center justify-end space-x-3">
                        {collateral && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({
                                        collateralType: collateral.collateralType || 'ID',
                                        description: collateral.description || '',
                                        value: collateral.value || '',
                                        documents: collateral.documents || [],
                                    });
                                    setError('');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Banknote size={18} className="mr-2" />}
                            {isSubmitting ? 'Saving...' : (collateral ? 'Update Collateral' : 'Save Collateral')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Collateral; 