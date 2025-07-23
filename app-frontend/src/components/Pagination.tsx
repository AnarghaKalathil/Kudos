import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-10 border border-border rounded-lg bg-white text-foreground font-medium shadow disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>
      <span className="text-base font-semibold text-foreground flex items-center gap-2">
        Page
        <input
          type="text"
          value={currentPage}
          readOnly
          className="w-10 text-center border border-border rounded-lg bg-white shadow px-2 py-1 font-bold focus:outline-none"
          style={{ minWidth: 40 }}
        />
        / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-10 border border-border rounded-lg bg-white text-foreground font-medium shadow disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 