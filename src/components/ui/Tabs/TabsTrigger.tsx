import React from 'react';

interface TabsTriggerProps {
  value: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, onClick, children, className = '' }) => {
  return (
    <button
      role="tab"
      data-value={value}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;