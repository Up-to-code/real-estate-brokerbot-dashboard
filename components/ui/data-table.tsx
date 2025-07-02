"use client"

import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  className?: string
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, any>[]
  className?: string
  emptyMessage?: string
}

export function DataTable({ columns, data, className, emptyMessage = "Nenhum dado disponível" }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className={cn("rounded-lg bg-white shadow", className)}>
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden rounded-lg bg-white shadow", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                  column.className,
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn("whitespace-nowrap px-6 py-4 text-sm text-gray-900", column.className)}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
