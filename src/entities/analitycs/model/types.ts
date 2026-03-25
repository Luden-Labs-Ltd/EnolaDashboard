export interface AnalyticsData {
  id: number | null;
  program_id: number | null;
  families: {
    activity: Array<{ date: string; count: number }>;
    active: number;
    inactive: number;
    total: number;
  };
  tasks: {
    activity: {
      opened: Array<{ date: string; count: number }>;
      closed: Array<{ date: string; count: number }>;
    };
    opened: number;
    closed: number;
    total: number;
  };
  supporters: {
    activity: Array<{ date: string; count: number }>;
    active: number;
    inactive: number;
    total: number;
  };
  users: Record<string, any>;
}

export interface AnalyticsFilters {
  date_gteq?: string;
  date_lteq?: string;
}
