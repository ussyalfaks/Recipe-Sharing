import React, { useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === TabsContent) {
        return React.cloneElement(child, {
          active: child.props.value === activeTab
        });
      }
    }
    return child;
  });

  return (
    <div className={className}>
      {childrenWithProps}
    </div>
  );
};

export default Tabs;