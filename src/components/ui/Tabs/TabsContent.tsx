import React from 'react';
import { useTabsContext } from './Tabs';

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { activeTab } = useTabsContext();

  return (
    <div
      role="tabpanel"
      data-value={value}
      className={`${className} ${activeTab === value ? 'block' : 'hidden'}`}
    >
      {children}
    </div>
  );
};

export default TabsContent;