import styles from './Table.module.css';

interface TableColumn {
  header: string;
  accessor: string;
}

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  ariaLabel?: string;
}

const Table = <T,>({ columns, data, ariaLabel }: TableProps<T>) => {
  return (
    <div
      className={styles.tableContainer}
      role="table"
      aria-label={ariaLabel || "Data Table"} 
    >
      <table className={styles.table}>
        <thead>
          <tr role="row">
            {columns.map((col, index) => (
              <th
                key={index}
                role="columnheader"
                scope="col"
                aria-label={col.header} 
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} role="row">
              {columns.map((col, colIndex) => (
                <td
                  key={`${colIndex}-${rowIndex}`}
                  role="cell"
                  aria-labelledby={`header-${col.accessor}-${rowIndex}`}
                >
                  {row[col.accessor as keyof T] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;