
function ResultTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No rows returned.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="result-table-wrapper">
      <table className="result-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col}>
                  {row[col] !== null ? row[col].toString() : "NULL"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;