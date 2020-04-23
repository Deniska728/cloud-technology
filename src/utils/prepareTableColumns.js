import React from 'react';

import dayjs from 'dayjs';

const prepareTableColumns = obj => {
  return Object.keys(obj).filter(f => f !== '__typename').map(field => {
    if (['reportedBugs', 'assignedBugs'].includes(field)) {
      return {
        Header: field,
        accessor: field,
        id: field,
        Cell: ({ value, row }) => {
          const isExpanded = value.length;
          const cell = isExpanded ? `${value.length} bugs` : '-';
          const rowProps = isExpanded ? row.getToggleRowExpandedProps() : row.getRowProps();

          return (
            <div {...rowProps} style={{ userSelect: 'none', cursor: 'pointer' }}>
              {cell}
            </div>
          );
        }
      };
    }

    if (['createdAt', 'updatedAt'].includes(field)) {
      return {
        Header: field,
        accessor: field,
        id: field,
        Cell: ({ value, row }) => {
          return (
            <div {...row.getRowProps()}>
              <span className="date-cell">
                {dayjs(value).format('DD.MM.YYYY HH:mm:ss')}
              </span>
            </div>
          );
        }
      };
    }

    return {
      Header: field,
      accessor: field,
      disableSortBy: field === 'id'
    };
  })
};

export default prepareTableColumns;