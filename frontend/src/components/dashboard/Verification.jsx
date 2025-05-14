import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, MailCheck, PhoneCall, AlertCircle } from 'lucide-react';

const VerificationStatusItem = ({ icon, title, status, statusColor, message }) => (
    <div className="flex items-start p-4 border-b border-gray-200 last:border-b-0">
        <div className={`mr-4 text-${statusColor}-500`}>{icon}</div>
        <div className="flex-1">
            <h4 className="font-medium text-gray-800">{title}</h4>
            <p className={`text-sm font-semibold text-${statusColor}-600`}>{status}</p>
            {message && <p className="text-xs text-gray-500 mt-1">{message}</p>}
        </div>
        {status === 'Pending' && (
            <button className="ml-4 text-xs text-primary-600 hover:text-primary-700 whitespace-nowrap">
                Resend Email
            </button>
        )}
        {status === 'Not Started' && title === 'ID Verification' && (
            <button className="ml-4 text-xs text-white bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded-md whitespace-nowrap">
                Start ID Verification
            </button>
        )}
    </div>
);

const Verification = () => {
    const { user } = useAuth();

    // Mocked verification statuses - in a real app, this would come from user data or an API
    const verificationData = {
        emailVerified: user?.isEmailVerified || false, // Assuming this field exists on user object
        phoneVerified: false, // Example
        idVerified: 'pending', // Example: 'verified', 'pending', 'failed', 'not_started'
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
                    message={verificationData.emailVerified ? `Your email (${user?.email}) is verified.` : 'Please check your inbox for a verification link.'}
                />
                <VerificationStatusItem
                    icon={phoneStatus.icon}
                    title="Phone Number Verification"
                    status={phoneStatus.text}
                    statusColor={phoneStatus.color}
                    message={verificationData.phoneVerified ? 'Your phone number is verified.' : 'Add and verify your phone number for enhanced security.'}
                />
                <VerificationStatusItem
                    icon={idStatus.icon}
                    title="ID Verification"
                    status={idStatus.text}
                    statusColor={idStatus.color}
                    message={
                        verificationData.idVerified === 'verified' ? 'Your ID has been successfully verified.' :
                            verificationData.idVerified === 'pending' ? 'Your ID is currently under review. This may take 1-2 business days.' :
                                verificationData.idVerified === 'failed' ? 'ID verification failed. Please contact support or try again.' :
                                    'Complete ID verification to unlock all platform features.'
                    }
                />
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