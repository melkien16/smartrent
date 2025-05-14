import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, MailCheck, PhoneCall, AlertCircle, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const VerificationStatusItem = ({ icon, title, status, statusColor, message, children }) => (
    <div className="flex items-start p-4 border-b border-gray-200 last:border-b-0">
        <div className={`mr-4 text-${statusColor}-500`}>{icon}</div>
        <div className="flex-1">
            <h4 className="font-medium text-gray-800">{title}</h4>
            <p className={`text-sm font-semibold text-${statusColor}-600`}>{status}</p>
            {message && <p className="text-xs text-gray-500 mt-1">{message}</p>}
            {children}
        </div>
    </div>
);

const Verification = () => {
    const { user, updateUserProfile } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmittingPhone, setIsSubmittingPhone] = useState(false);
    const [isUploadingId, setIsUploadingId] = useState(false);
    const [idFile, setIdFile] = useState(null);

    // Mocked verification statuses - in a real app, this would come from user data or an API
    const verificationData = {
        emailVerified: user?.isEmailVerified || false,
        phoneVerified: user?.isPhoneVerified || false,
        idVerified: user?.idVerificationStatus || 'not_started',
    };

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 10) {
            toast.error('Please enter a valid phone number');
            return;
        }

        try {
            setIsSubmittingPhone(true);
            // Here you would typically make an API call to verify the phone number
            // For now, we'll just update the user profile
            await updateUserProfile({ phoneNumber });
            toast.success('Phone number submitted successfully. Please check your phone for verification code.');
            // In a real app, you would trigger SMS verification here
        } catch (error) {
            console.error('Error submitting phone number:', error);
            toast.error('Failed to submit phone number. Please try again.');
        } finally {
            setIsSubmittingPhone(false);
        }
    };

    const handleIdUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Please upload a valid image (JPEG, PNG) or PDF file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setIdFile(file);
        try {
            setIsUploadingId(true);
            // Here you would typically upload the file to your server
            // For now, we'll just simulate the upload
            const formData = new FormData();
            formData.append('idDocument', file);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update user profile with verification status
            await updateUserProfile({ idVerificationStatus: 'pending' });
            toast.success('ID document uploaded successfully. Verification in progress.');
        } catch (error) {
            console.error('Error uploading ID:', error);
            toast.error('Failed to upload ID document. Please try again.');
        } finally {
            setIsUploadingId(false);
        }
    };

    const getStatusProps = (status) => {
        if (status === true || status === 'verified') return { text: 'Verified', color: 'green', icon: <ShieldCheck size={24} /> };
        if (status === 'pending') return { text: 'Pending', color: 'yellow', icon: <AlertCircle size={24} /> };
        if (status === 'failed') return { text: 'Failed', color: 'red', icon: <AlertCircle size={24} /> };
        return { text: 'Not Verified', color: 'gray', icon: <AlertCircle size={24} /> };
    };

    const emailStatus = getStatusProps(verificationData.emailVerified);
    const phoneStatus = getStatusProps(verificationData.phoneVerified);
    const idStatus = getStatusProps(verificationData.idVerified);

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <ShieldCheck size={32} className="text-primary-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Account Verification</h2>
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200">
                <VerificationStatusItem
                    icon={emailStatus.icon}
                    title="Email Verification"
                    status={emailStatus.text}
                    statusColor={emailStatus.color}
                    message={verificationData.emailVerified ? `Your email (${user?.email}) is verified.` : 'Please check your email inbox for a verification link.'}
                />
                <VerificationStatusItem
                    icon={phoneStatus.icon}
                    title="Phone Number Verification"
                    status={phoneStatus.text}
                    statusColor={phoneStatus.color}
                    message={verificationData.phoneVerified ? 'Your phone number is verified.' : 'Add and verify your phone number for enhanced security. Put your phone number in the field below. We will send you a verification code to your phone number.'}
                >
                    {!verificationData.phoneVerified && (
                        <form onSubmit={handlePhoneSubmit} className="mt-3">
                            <div className="flex gap-2">
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    disabled={isSubmittingPhone}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmittingPhone}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                                >
                                    {isSubmittingPhone ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    )}
                </VerificationStatusItem>
                <VerificationStatusItem
                    icon={idStatus.icon}
                    title="National ID Verification"
                    status={idStatus.text}
                    statusColor={idStatus.color}
                    message={
                        verificationData.idVerified === 'verified' ? 'Your ID has been successfully verified.' :
                            verificationData.idVerified === 'pending' ? 'Your ID is currently under review. This may take 1-2 business days.' :
                                verificationData.idVerified === 'failed' ? 'ID verification failed. Please contact support or try again.' :
                                    'Complete ID verification to unlock all platform features.'
                    }
                >
                    {verificationData.idVerified === 'not_started' && (
                        <div className="mt-3">
                            <label className="block">
                                <span className="sr-only">Choose ID document</span>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleIdUpload}
                                    disabled={isUploadingId}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-primary-50 file:text-primary-700
                                        hover:file:bg-primary-100
                                        disabled:opacity-50"
                                />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">
                                Upload a clear photo of your government-issued ID (max 5MB)
                            </p>
                        </div>
                    )}
                </VerificationStatusItem>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-700">Why Verify?</h4>
                <p className="text-sm text-blue-600 mt-1">
                    Verifying your account helps secure your profile, builds trust within the community, and may be required for certain transactions or features.
                </p>
            </div>
        </div>
    );
};

export default Verification; 