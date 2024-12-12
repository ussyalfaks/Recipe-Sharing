import React from 'react';

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  return (
    <div
      role="tabpanel"
      data-value={value}
      className={`${className} ${value === 'active' ? 'block' : 'hidden'}`}
    >
      {children}
    </div>
  );
};

export default TabsContent;