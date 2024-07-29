import React from 'react';

export default function Highlight({ children }) {
  const content = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === 'p') {
      return child.props.children;
    }
    return child;
  });

  return (
    <span style={{ backgroundColor: "rgba(255, 235, 59, 0.4)", padding: "0 4px", borderRadius: "3px" }}>
      {content}
    </span>
  );
}