import React from 'react';
import { useTabsContext } from './Tabs';

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <button
      role="tab"
      data-value={value}
      onClick={() => setActiveTab(value)}
      className={className}
      aria-selected={activeTab === value}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;