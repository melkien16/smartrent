import React, { useState, useEffect } from 'react';
import { getAllReports, updateReportStatus } from '../../Fetchers/reportFetcher';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getAllReports();
      setReports(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (reportId) => {
    try {
      await updateReportStatus(reportId, 'Resolved');
      await fetchReports(); // Refresh the list
    } catch (err) {
      setError('Failed to update report status');
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = typeFilter === 'All Types' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || report.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reports & Disputes</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <select
            className="select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Item Issues</option>
            <option>User Complaints</option>
            <option>Payment Disputes</option>
          </select>
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        {error && (
          <div className="text-red-600 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">Loading reports...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{report._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.reporter?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                      {report.status !== 'Resolved' && (
                        <button
                          onClick={() => handleResolve(report._id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredReports.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No reports found matching the selected filters
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Reports); 