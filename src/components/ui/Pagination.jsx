import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  pageSize,
  className = ''
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-xs ${className}`}
      aria-label="Pagination Navigation"
    >
      {totalItems !== undefined && (
        <span className="text-[#444444] dark:text-[#CCCCCC] font-mono">
          Showing <strong className="text-[#000000] dark:text-[#FFFFFF]">{startItem}</strong> - <strong className="text-[#000000] dark:text-[#FFFFFF]">{endItem}</strong> of <strong className="text-[#000000] dark:text-[#FFFFFF]">{totalItems}</strong>
        </span>
      )}

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-[#444444] dark:text-[#CCCCCC] font-mono">
                ...
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${p}`}
              className={`min-w-[36px] h-9 px-2 font-mono text-xs rounded-btn font-medium transition-colors ${isActive
                  ? 'bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white'
                  : 'bg-transparent text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white hover:bg-[#F5F5F5] dark:hover:bg-[#111111]'
                }`}
            >
              {p}
            </button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
          className="p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
