import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, DollarSign, ThumbsUp, PlusCircle, Wallet, MessageSquare } from 'lucide-react';

const Overview = ({ stats, user, setActiveTab, setTransactionType, setShowTransactionModal }) => {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    setActiveTab('wallet');
    setTransactionType('withdraw');
    setShowTransactionModal(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
      
      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">New Rental Request</p>
                <p className="text-sm text-gray-500">Camera Equipment from John Doe</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">2 hours ago</div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Payment Received</p>
                <p className="text-sm text-gray-500">$75.00 for Drone rental</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">1 day ago</div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ThumbsUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">New Review</p>
                <p className="text-sm text-gray-500">5 stars for your Camera listing</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">2 days ago</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Listing Performance</span>
                <span className="text-sm font-medium text-gray-700">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Response Rate</span>
                <span className="text-sm font-medium text-gray-700">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                <span className="text-sm font-medium text-gray-700">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/list-item" 
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <PlusCircle className="h-6 w-6 text-primary-600 mr-2" />
            <span>Add New Listing</span>
          </Link>
          <button 
            onClick={handleWithdraw}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Wallet className="h-6 w-6 text-blue-600 mr-2" />
            <span>Withdraw Earnings</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <MessageSquare className="h-6 w-6 text-green-600 mr-2" />
            <span>View Messages</span>
          </button>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.userListedItems.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <img src={listing.images[0]} alt={listing.title} className="h-16 w-16 object-cover rounded-lg" />
                <div className="ml-4">
                  <h4 className="font-medium">{listing.title}</h4>
                  <p className="text-sm text-gray-500">${listing.price}/{listing.priceUnit}</p>
                  <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.isAvailable ? 'Active' : 'Rented'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview; 