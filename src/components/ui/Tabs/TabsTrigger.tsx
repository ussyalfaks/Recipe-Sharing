import React from 'react';
import { useTabsContext } from './Tabs';

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '', onClick }) => {
  const { activeTab, setActiveTab } = useTabsContext();

  const handleClick = () => {
    setActiveTab(value);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      role="tab"
      data-value={value}
      onClick={handleClick}
      className={className}
      aria-selected={activeTab === value}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;