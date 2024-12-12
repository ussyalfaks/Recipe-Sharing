import React from 'react';

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div role="tablist" className={className}>
      {children}
    </div>
  );
};

export default TabsList;