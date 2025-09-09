import React from 'react';

export const FilterButtonGroup = ({ options, onClick, activeValue }) => {
  const activeClasses = 'bg-emerald-500 font-semibold text-white';
  const inactiveClasses = 'bg-white text-gray-800 hover:bg-gray-100';

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      {options.map((item) => {
        const isActive = activeValue === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onClick(item.value)}
            className={`px-4 py-2 transition-colors focus:outline-none whitespace-nowrap ${isActive ? activeClasses : inactiveClasses}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};