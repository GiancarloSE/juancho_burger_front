import React from 'react';

const StatusBadge = ({ status, text, type = "order" }) => {
  const getColorClasses = () => {
    if (type === "order") {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        preparing: 'bg-blue-100 text-blue-700 border-blue-300',
        ready: 'bg-green-100 text-green-700 border-green-300',
        delivered: 'bg-gray-100 text-gray-700 border-gray-300'
      };
      return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300';
    }
    
    if (type === "inventory") {
      const colors = {
        critical: 'bg-red-100 text-red-700 border-red-300',
        low: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        normal: 'bg-green-100 text-green-700 border-green-300'
      };
      return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300';
    }

    if (type === "promotion") {
      const colors = {
        active: 'bg-green-100 text-green-700',
        scheduled: 'bg-blue-100 text-blue-700',
        expired: 'bg-gray-100 text-gray-700'
      };
      return colors[status] || 'bg-gray-100 text-gray-700';
    }

    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getColorClasses()}`}>
      {text}
    </span>
  );
};

export default StatusBadge;