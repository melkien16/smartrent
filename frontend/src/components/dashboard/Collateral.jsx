import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    getCollateralByUserId,
    createCollateral,
    updateCollateral,
    uploadCollateralDocument,
    removeCollateralDocument
} from '../../Fetchers/collateralFetcher';
import { toast } from 'react-hot-toast';
import { ShieldCheck, UploadCloud, Edit3, Info, AlertTriangle, DollarSign, FileText, Loader2, Banknote, X } from 'lucide-react';

const Collateral = () => {
    const { user } = useAuth();
    const [collateral, setCollateralData] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        collateralType: 'ID',
        description: '',
        value: '',
    });
    const [documents, setDocuments] = useState([]);
    const [uploadingDocs, setUploadingDocs] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const fetchCollateralDetails = async () => {
        if (!user?._id) return;

        setIsLoading(true);
        setError('');
        try {
            const collateralData = await getCollateralByUserId();

            if (collateralData) {
                setCollateralData(collateralData);
                setStatus(collateralData.status);
                setFormData({
                    collateralType: collateralData.collateralType || 'ID',
                    description: collateralData.description || '',
                    value: collateralData.value || '',
                });
                setDocuments(collateralData.documents || []);
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

    const handleDocumentUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setUploadingDocs(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return await uploadCollateralDocument(formData);
            });

            const uploadedDocs = await Promise.all(uploadPromises);
            setDocuments(prev => [...prev, ...uploadedDocs]);
            toast.success(`${files.length} document(s) uploaded successfully`);
        } catch (err) {
            toast.error(err.message || 'Failed to upload documents');
        } finally {
            setUploadingDocs(false);
        }
    };

    const handleRemoveDocument = async (documentId) => {
        try {
            await removeCollateralDocument(documentId);
            setDocuments(prev => prev.filter(doc => doc._id !== documentId));
            toast.success('Document removed successfully');
        } catch (err) {
            toast.error(err.message || 'Failed to remove document');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.collateralType || !formData.value) {
            toast.error('Collateral type and value are required.');
            return;
        }

        setIsSubmitting(true);
        setError('');
        try {
            const collateralData = {
                ...formData,
                value: parseFloat(formData.value)
            };

            let response;
            if (collateral) {
                response = await updateCollateral(collateralData);
            } else {
                response = await createCollateral(collateralData);
            }

            setCollateralData(response);
            toast.success('Collateral information saved successfully!');
            setIsEditing(false);
            await fetchCollateralDetails(); // Refresh all data
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
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Banknote size={32} className="text-primary-600 mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Manage Collateral</h2>
                </div>
                {status && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {status.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                )}
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
                        {documents.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                                {documents.map((doc) => (
                                    <li key={doc._id} className="flex items-center justify-between bg-white p-2 rounded border">
                                        <div className="flex items-center">
                                            <FileText size={16} className="text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-600">{doc.url.split('/').pop()}</span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveDocument(doc._id)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={uploadingDocs}
                                        >
                                            <X size={16} />
                                        </button>
                                    </li>
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
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleDocumentUpload}
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            disabled={uploadingDocs}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                {uploadingDocs && (
                                    <div className="flex items-center justify-center text-sm text-gray-500">
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        Uploading...
                                    </div>
                                )}
                            </div>
                        </div>
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
                                    });
                                    setError('');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                disabled={isSubmitting || uploadingDocs}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading || uploadingDocs}
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