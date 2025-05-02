import React from 'react';
import {
  Activity,
  Users,
  BookOpen,
  Package,
  DollarSign,
  Star,
  Shield,
  AlertTriangle,
  BarChart2,
  MessageSquare,
  Settings
} from 'lucide-react';

const iconMap = {
  Activity,
  Users,
  BookOpen,
  Package,
  DollarSign,
  Star,
  Shield,
  AlertTriangle,
  BarChart2,
  MessageSquare,
  Settings
};

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="lg:w-64 flex-shrink-0">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = iconMap[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default React.memo(TabNavigation); 