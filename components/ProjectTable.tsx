'use client';

import { Project } from '@/types/project';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
  sortField?: keyof Project | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: keyof Project) => void;
}

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
  isLoading,
  sortField,
  sortDirection = 'asc',
  onSort,
}: ProjectTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      'on hold': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof Project;
    children: React.ReactNode;
  }) => {
    if (!onSort) {
      return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
    }

    const isActive = sortField === field;
    return (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
        onClick={() => onSort(field)}
      >
        <div className="flex items-center gap-2">
          <span>{children}</span>
          <span className="flex flex-col">
            <svg
              className={`w-3 h-3 ${isActive && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 12l5-5 5 5H5z" />
            </svg>
            <svg
              className={`w-3 h-3 -mt-1 ${isActive && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M15 8l-5 5-5-5h10z" />
            </svg>
          </span>
        </div>
      </th>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No projects found</p>
        <p className="text-sm mt-2">Try adjusting your filters or add a new project</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader field="name">Project Name</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <SortableHeader field="deadline">Deadline</SortableHeader>
            <SortableHeader field="assigned_team_member">Team Member</SortableHeader>
            <SortableHeader field="budget">Budget</SortableHeader>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{project.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(project.status)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(project.deadline)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.assigned_team_member}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCurrency(project.budget)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(project)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

