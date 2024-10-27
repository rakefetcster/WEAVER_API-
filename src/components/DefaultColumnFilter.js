import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';

// Custom filter function for exact text matching
function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)} // Set undefined to remove the filter entirely
      placeholder={`Search...`}
      style={{
        width: '100%',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ddd',
      }}
    />
  );
}

function DataTable({ columns, data }) {
    const defaultColumn = useMemo(
      () => ({
        Filter: DefaultColumnFilter,
      }),
      []
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFilters,
      useSortBy
    );
  
    return (
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <th
                      key={key}
                      {...columnProps}
                      style={{
                        borderBottom: '1px solid #ddd',
                        cursor: 'pointer',
                        padding: '10px',
                        width: column.id === 'Pages_visited' ? 'short-column' : '', // Set width for specific column
                        whiteSpace: column.id === 'pages_visited' ? 'nowrap' : 'normal', // Optionally prevent text wrapping
                        overflow: 'hidden', // Hide overflow text
                        textOverflow: 'ellipsis', // Show ellipsis for overflowed text
                      }}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <tr key={key} {...rowProps}>
                {row.cells.map((cell) => {
                  const { key, ...cellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...cellProps}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  

export default DataTable;
