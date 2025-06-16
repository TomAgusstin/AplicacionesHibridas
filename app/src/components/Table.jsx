function Table(data){
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {data.map((col) => (
            <th key={col} style={{ border: '1px solid black', padding: '8px' }}>
              {col.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((fila, index) => (
          <tr key={index}>
            {columnas.map((col) => (
              <td key={col} style={{ border: '1px solid black', padding: '8px' }}>
                {fila[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

}

export default Table