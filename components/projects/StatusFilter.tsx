'use client';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  projectCounts?: {
    all: number;
    active: number;
    'on hold': number;
    completed: number;
  };
}

export default function StatusFilter({ selectedStatus, onStatusChange, projectCounts }: StatusFilterProps) {
  const statuses = [
    { value: 'all', label: 'All Projects' },
    { value: 'active', label: 'Active' },
    { value: 'on hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const getBadgeColor = (statusValue: string, isSelected: boolean) => {
    if (isSelected) {
      // When selected, use darker variants
      switch (statusValue) {
        case 'all':
          return 'bg-blue-800 text-white';
        case 'active':
          return 'bg-green-700 text-white';
        case 'on hold':
          return 'bg-yellow-600 text-white';
        case 'completed':
          return 'bg-gray-700 text-white';
        default:
          return 'bg-gray-700 text-white';
      }
    } else {
      // When not selected, use lighter, more vibrant colors
      switch (statusValue) {
        case 'all':
          return 'bg-blue-100 text-blue-700';
        case 'active':
          return 'bg-green-100 text-green-700';
        case 'on hold':
          return 'bg-yellow-100 text-yellow-700';
        case 'completed':
          return 'bg-gray-100 text-gray-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const count = projectCounts?.[status.value as keyof typeof projectCounts] ?? 0;
        const isSelected = selectedStatus === status.value;

        return (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>{status.label}</span>
            {count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getBadgeColor(
                  status.value,
                  isSelected
                )}`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

