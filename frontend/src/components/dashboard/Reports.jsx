import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import {
    getAllReports,
    getUserReports,
    updateReportStatus,
    createReport,
} from '../../Fetchers/reportFetcher';

const Reports = () => {
    const { user, isAdmin } = useAuth();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        reason: '',
        details: '',
        reportedUser: '',
        item: '',
        booking: '',
    });

    const fetchReports = async () => {
        try {
            setLoading(true);
            const data = isAdmin ? await getAllReports() : await getUserReports();
            setReports(data);
        } catch (err) {
            setError('Failed to fetch reports');
            toast.error('Failed to fetch reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [isAdmin]);

    const handleCreateReport = async (e) => {
        e.preventDefault();
        try {
            await createReport(formData);
            toast.success('Report submitted successfully');
            setShowCreateForm(false);
            setFormData({
                reason: '',
                details: '',
                reportedUser: '',
                item: '',
                booking: '',
            });
            fetchReports();
        } catch (err) {
            toast.error('Failed to submit report');
        }
    };

    const handleStatusUpdate = async (reportId, newStatus) => {
        try {
            await updateReportStatus(reportId, newStatus);
            toast.success('Report status updated successfully');
            fetchReports();
        } catch (err) {
            toast.error('Failed to update report status');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
            reviewed: { color: 'bg-blue-100 text-blue-800', icon: ChevronDown },
            resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
            dismissed: { color: 'bg-red-100 text-red-800', icon: XCircle },
        };

        const { color, icon: Icon } = badges[status] || badges.pending;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                <Icon size={12} className="mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Reports</h2>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="btn-primary"
                >
                    {showCreateForm ? 'Cancel' : 'Create Report'}
                </button>
            </div>

            {/* Create Report Form */}
            {showCreateForm && (
                <form onSubmit={handleCreateReport} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reason</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Details</label>
                        <textarea
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            rows={4}
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">User ID (optional)</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.reportedUser}
                                onChange={(e) => setFormData({ ...formData, reportedUser: e.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Item ID (optional)</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.item}
                                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Booking ID (optional)</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.booking}
                                onChange={(e) => setFormData({ ...formData, booking: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn-primary">
                            Submit Report
                        </button>
                    </div>
                </form>
            )}

            {/* Reports List */}
            <div className="space-y-4">
                {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <AlertTriangle size={48} className="mb-4" />
                        <p className="text-lg">No reports found</p>
                        <p className="text-sm">Any reports you create will appear here</p>
                    </div>
                ) : (
                    reports.map((report) => (
                        <div key={report._id} className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        {getStatusBadge(report.status)}
                                        <span className="text-sm text-gray-500">
                                            Reported on {format(new Date(report.createdAt), 'MMM d, yyyy')}
                                        </span>
                                    </div>
                                    <h3 className="font-medium text-gray-900">{report.reason}</h3>
                                    <p className="text-gray-600">{report.details}</p>
                                    {report.reportedUser && (
                                        <p className="text-sm text-gray-500">
                                            Reported User: {report.reportedUser.name}
                                        </p>
                                    )}
                                    {report.item && (
                                        <p className="text-sm text-gray-500">
                                            Item: {report.item.title}
                                        </p>
                                    )}
                                </div>
                                {isAdmin && (
                                    <div className="flex space-x-2">
                                        <select
                                            value={report.status}
                                            onChange={(e) => handleStatusUpdate(report._id, e.target.value)}
                                            className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="dismissed">Dismissed</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reports;
