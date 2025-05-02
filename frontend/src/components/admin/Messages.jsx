import React from 'react';

const Messages = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Messages & Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Conversations</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                New Message
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-blue-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Having issues with my rental...</p>
              </div>
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Jane Smith</span>
                  <span className="text-xs text-gray-500">1d ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Payment dispute resolution...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">Active now</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 h-96 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Hi, I'm having issues with my rental. The item was damaged when I received it.</p>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
              </div>
              <div className="flex items-start justify-end">
                <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">I'm sorry to hear that. Could you please provide more details about the damage?</p>
                  <span className="text-xs text-gray-500">1h ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Messages); 