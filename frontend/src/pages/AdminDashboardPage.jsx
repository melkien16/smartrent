import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAdminStats } from '../hooks/useAdminStats';
import { useAdminData } from '../hooks/useAdminData';
import TabNavigation from '../components/admin/TabNavigation';
import Overview from '../components/admin/Overview';
import Users from '../components/admin/Users';
import Items from '../components/admin/Items';

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { users, setUsers, items, loading, error, searchQuery, setSearchQuery, selectedItems, handleItemSelect, handleDeleteSelected } = useAdminData(activeTab);
  const stats = useAdminStats(users);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'Activity' },
    { id: 'users', label: 'Manage Users', icon: 'Users' },
    { id: 'bookings', label: 'Manage Bookings', icon: 'BookOpen' },
    { id: 'items', label: 'Manage Items', icon: 'Package' },
    { id: 'payments', label: 'Payments & Commissions', icon: 'DollarSign' },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'Star' },
    { id: 'collateral', label: 'Collateral Approvals', icon: 'Shield' },
    { id: 'reports', label: 'Reports & Disputes', icon: 'AlertTriangle' },
    { id: 'analytics', label: 'Analytics & Insights', icon: 'BarChart2' },
    { id: 'messages', label: 'Messages & Support', icon: 'MessageSquare' },
    { id: 'settings', label: 'Platform Settings', icon: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview stats={stats} />;
      case 'users':
        return (
          <Users
            users={users}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setUsers={setUsers}
          />
        );
      case 'items':
        return (
          <Items
            items={items}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedItems={selectedItems}
            handleItemSelect={handleItemSelect}
            handleDeleteSelected={handleDeleteSelected}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-2 text-primary-600">
            <Shield className="h-6 w-6" />
            <span className="font-medium">Admin Control Panel</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 