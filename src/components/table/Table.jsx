import React, { useState, useMemo } from 'react'

import { useTable, useSortBy, useExpanded, useFilters, useGlobalFilter } from 'react-table';
import { Collapse, Table } from 'reactstrap';

import DeleteUserButton from 'src/components/table/DeleteUserButton';
import UpdateUserModal from 'src/components/table/UpdateUserModal';
import GlobalFilter from 'src/components/table/GlobalFilter';

import prepareColumns from 'src/utils/prepareColumns';
import prepareTableColumns from 'src/utils/prepareTableColumns';

const CustomTable = ({ data, type, defaultCols }) => {
  const columns = useMemo(() => prepareTableColumns(data[0] || defaultCols), [data, defaultCols]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    hooks => {
      type === 'users' && hooks.visibleColumns.push(columns => [
        ...columns,
        {
          id: 'actions',
          Header: () => null,
          Cell: ({ row }) => (
            <div className="d-flex">
              <UpdateUserModal value={row.values} />
              <DeleteUserButton id={row.values.id} />
            </div>
          ),
        },
      ])
    }
  );
  const [expanded, setExpanded] = useState(null);
  const [isExpand, setIsExpande] = useState(false);

  const currentRow = expanded && data.find(d => {
    return d.id === expanded.row.values.id;
  });

  return (
    <Table {...getTableProps()} responsive bordered>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? <span>&#9662;</span>
                      : <span>&#9652;</span>
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);

          return (
            <React.Fragment key={row.getRowProps().key}>
              <tr>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      onClick={() => {
                        if (cell.value && typeof cell.value !== 'string' && cell.value.length > 0) {
                          if (!isExpand && row.isExpanded) {
                            setIsExpande(true);
                            return setExpanded({ ...cell, index: cell.row.index })
                          }
  
                          if (row.isExpanded) {
                            if (expanded && expanded.value[0].id === cell.value[0].id) {
                              setIsExpande(false);
                            }
  
                            return setExpanded({ ...cell, index: cell.row.index })
                          }

                          if (!row.isExpanded && isExpand && expanded && expanded.value[0].id === cell.value[0].id) {
                            return setIsExpande(false);
                          }
                          
                          setIsExpande(true);
                          setExpanded({ ...cell, index: cell.row.index })
                        }
                      }}
                    >{cell.render('Cell')}</td>
                  )
                })}
              </tr>
              <tr className="collapse-row">
                <td colSpan={visibleColumns.length} className="collapse-cell">
                  <Collapse isOpen={isExpand && currentRow && row.index === expanded.index}>
                    <div className="collapse-content">
                      <CustomTable
                        data={prepareColumns((expanded && expanded.value) || [])}
                        defaultCols={{}}
                      />
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
};

export default CustomTable;