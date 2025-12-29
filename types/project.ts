export interface Project {
  id: number;
  name: string;
  status: 'active' | 'on hold' | 'completed';
  deadline: string;
  assigned_team_member: string;
  budget: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectFormData {
  name: string;
  status: 'active' | 'on hold' | 'completed';
  deadline: string;
  assigned_team_member: string;
  budget: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  count: number;
  data: T;
  pagination: PaginationMeta;
}

