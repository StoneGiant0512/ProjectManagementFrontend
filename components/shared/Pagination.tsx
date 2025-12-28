'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
      {/* Items per page selector */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-700 whitespace-nowrap">
          Show:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1); // Reset to first page when changing items per page
          }}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={100}>100</option>
        </select>
        <span className="text-sm text-gray-700 whitespace-nowrap hidden sm:inline">per page</span>
      </div>

      {/* Page info */}
      <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left whitespace-nowrap">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> projects
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="flex items-center gap-1 overflow-x-auto">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm">
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            currentPage === totalPages || totalPages === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

