import React from 'react';
import { FilterButtonGroup } from './FilterButtonGroup'; 

export const AiFilterHeader = ({ config, activeFilters, onChange }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            {config.map((item) => (
                <FilterButtonGroup
                    key={item.id}
                    options={item.options}
                    activeValue={activeFilters[item.id]}
                    onClick={(value) => onChange(item.id, value)}
                />
            ))}
        </div>
    );
};