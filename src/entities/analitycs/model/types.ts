export interface AnalyticsData {
  id: number | null;
  program_id: number | null;
  families: Record<string, { active: number; inactive: number; total: number }>;
  tasks: Record<string, { opened: number; closed: number; total: number }>;
  supporters: Record<string, { active: number; inactive: number; total: number }>;
}

export interface AnalyticsFilters {
  date_gteq?: string;
  date_lteq?: string;
}
