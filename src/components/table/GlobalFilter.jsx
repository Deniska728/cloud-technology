import React from 'react';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        className="search-input"
        onChange={e => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  )
};

export default GlobalFilter;