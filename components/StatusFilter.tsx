'use client';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export default function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  const statuses = [
    { value: 'all', label: 'All Projects' },
    { value: 'active', label: 'Active' },
    { value: 'on hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedStatus === status.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}

