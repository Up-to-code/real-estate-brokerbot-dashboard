import React from "react";

interface DataTableProps {
  columns: { key: string; label: string }[];
  data: any[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => (
  <table className="min-w-full border">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="border px-4 py-2">{col.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {columns.map((col) => (
            <td key={col.key} className="border px-4 py-2">{row[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
); 