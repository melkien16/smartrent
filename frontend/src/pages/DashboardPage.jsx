import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBalance } from '../context/BalanceContext';
import { useUserStats } from '../hooks/useUserStats';
import { useTransaction } from '../hooks/useTransaction';
import { Calendar, Package, DollarSign, AlertCircle, Clock, PlusCircle, MinusCircle, X } from 'lucide-react';
import ItemGrid from '../components/items/ItemGrid';
import { mockItems } from '../data/mockItems';
import { mockRentals } from '../data/mockRentals';
import {
  LayoutDashboard,
  Wallet as WalletIcon,
  Shield,
  Star,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  FileBox,
  InboxIcon,
  Wallet,
  Settings,
  Inbox
} from 'lucide-react';
import TransactionModal from '../components/TransactionModal';
import WithdrawalSuccess from '../components/WithdrawalSuccess';
import { toast } from 'react-hot-toast';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';
import TabNavigation from '../components/dashboard/TabNavigation';
import Overview from '../components/dashboard/Overview';
import Rentals from '../components/dashboard/Rentals';
import Listings from '../components/dashboard/Listings';
import WalletComponent from '../components/dashboard/Wallet';
import StatCard from '../components/dashboard/StatCard';
import Subscription from '../components/dashboard/Subscription';
import Messages from '../components/dashboard/Messages';
import Reviews from '../components/dashboard/Reviews';
import RentalRequests from '../components/dashboard/RentalRequests';

const DashboardPage = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { balance, addFunds, deductFunds, fetchBalance } = useBalance();
  const {
    userListedItems,
    userRentedItems,
    activeRentals,
    activeListings,
    totalEarnings,
    pendingRequests
  } = useUserStats(user);

  const {
    showTransactionModal,
    setShowTransactionModal,
    transactionType,
    setTransactionType,
    handleTransaction,
    transactionLoading,
    error,
    showWithdrawalSuccess,
    withdrawalAmount,
    handleCloseWithdrawalSuccess,
    resetTransactionState
  } = useTransaction();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showCollateralModal, setShowCollateralModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const stats = {
    activeRentals: userRentedItems.length,
    activeListings: userListedItems.length,
    totalEarnings: userListedItems.reduce((sum, item) => sum + (item?.price || 0), 0),
    pendingRequests: mockRentals.pending.filter(rental => rental?.item?.owner?.id === user?.id).length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'rentals', label: 'My Rentals', icon: Package },
    { id: 'rental-requests', label: 'Rental Requests', icon: Inbox },
    { id: 'listings', label: 'My Listings', icon: FileBox },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'reports', label: 'Reports', icon: AlertTriangle },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'subscription', label: 'Subscription', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview
          stats={{ userListedItems, userRentedItems, activeRentals, activeListings, totalEarnings, pendingRequests }}
          user={user}
          setActiveTab={setActiveTab}
          setTransactionType={setTransactionType}
          setShowTransactionModal={setShowTransactionModal}
        />;
      case 'rentals':
        return <Rentals
          userRentedItems={userRentedItems}
          setActiveTab={setActiveTab}
        />;
      case 'rental-requests':
        return <RentalRequests />;
      case 'listings':
        return <Listings
          userListedItems={userListedItems}
        />;
      case 'wallet':
        return <WalletComponent
          balance={balance}
          setTransactionType={setTransactionType}
          setShowTransactionModal={setShowTransactionModal}
          user={user}
        />;
      case 'messages':
        return <Messages />;
      case 'reviews':
        return <Reviews />;
      case 'subscription':
        return <SubscriptionPlans />;
      default:
        return <div>Coming soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TransactionModal
        showModal={showTransactionModal}
        setShowModal={setShowTransactionModal}
        transactionType={transactionType}
        handleTransaction={handleTransaction}
        loading={transactionLoading}
        error={error}
        resetTransactionState={resetTransactionState}
      />

      {showWithdrawalSuccess && (
        <WithdrawalSuccess
          amount={withdrawalAmount}
          onClose={handleCloseWithdrawalSuccess}
        />
      )}
    </div>
  );
};

export default DashboardPage; 