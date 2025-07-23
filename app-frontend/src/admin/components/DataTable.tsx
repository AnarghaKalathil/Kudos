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

const ENTRIES_PER_PAGE = 6;

const DataTable: React.FC<Props> = ({ columns, rows, onDelete }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / ENTRIES_PER_PAGE));
  const paginatedRows = rows.slice((page - 1) * ENTRIES_PER_PAGE, page * ENTRIES_PER_PAGE);
  const isTwoCol = columns.length === 1; // Only one data column + actions

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setPage(Number(e.target.value));

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
          {paginatedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="px-4 py-6 text-center text-muted-foreground">No data found.</TableCell>
            </TableRow>
          ) : (
            paginatedRows.map((row) => (
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
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-1 mb-0 px-2 w-full">
          <Button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-2 rounded-md bg-muted text-foreground font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          <span className="text-base font-medium text-muted-foreground text-center flex items-center gap-2">
            Page
            <select
              value={page}
              onChange={handlePageSelect}
              className="mx-1 px-3 py-2 rounded-lg border border-border bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary text-lg font-semibold"
              style={{ minWidth: 60 }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-2 rounded-md bg-muted text-foreground font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
            variant="outline"
            size="sm"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
