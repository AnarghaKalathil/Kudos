import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  rows: any[];
  onDelete: (id: number) => void;
}

const DataTable: React.FC<Props> = ({ columns, rows, onDelete }) => {
  const isTwoCol = columns.length === 1; // Only one data column + actions

  return (
    <div className="w-full min-w-0 bg-white border rounded-xl shadow-sm p-2">
      <Table className="w-full min-w-0 text-lg text-foreground border-separate border-spacing-0">
        <TableHeader className="bg-muted/60">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className="px-4 py-2 font-semibold text-left border-b border-border bg-muted/60 whitespace-nowrap">{col.label}</TableHead>
            ))}
            <TableHead className="px-4 py-2 font-semibold text-right border-b border-border bg-muted/60 whitespace-nowrap w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="px-4 py-6 text-center text-muted-foreground">No data found.</TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                {columns.map((col, idx) => (
                  <TableCell key={col.key} className="px-4 py-2 border-b border-border whitespace-nowrap align-middle">
                    {row[col.key]}
                  </TableCell>
                ))}
                <TableCell className={`px-4 py-2 border-b border-border whitespace-nowrap align-middle text-right w-[120px]`}>
                  <Button variant="destructive" size="lg" className="w-[97px] text-base py-2 font-bold" onClick={() => onDelete(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
