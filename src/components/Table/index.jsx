import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const Table = (
  {
    columns,
    data,
    className,
    loading,
  },
) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={className}>
        <thead>
          <tr className="border-b">
            {
              columns.map((column) => (
                <th
                  key={column.value}
                  className={`uppercase text-left p-3 pr-4 font-bold ${column.className}`}
                >
                  {column.label}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex items-center w-full justify-center h-80">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {
                  data.map((item, index) => (
                    <tr key={index} className="border-b">
                      {
                        columns.map((column) => (
                          <td key={column.value} className="text-left p-3">
                            {column.render(item[column.value], item)}
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

Table.defaultProps = {
  className: '',
  loading: false,
};

export default Table;
