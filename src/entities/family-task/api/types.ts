export type FamilyTaskApi = {
  id: string;
  title: string;
  description: string | null;
  status: "initial" | "in_progress" | "completed";
  type: "no_time" | "exact_time" | "until_time";
  circle: string | null;
  category_id?: string | null;
  category: string | null;
  category_slug: string | null;
  category_name: string | null;
  category_icon?: string | null;
  repeated: boolean;
  schedule: string | null;
  start_at: string | null;
  end_at: string | null;
  status_changed_at: string | null;
  created_at: string;
  updated_at: string | null;
  creator: {
    id: string;
    full_name: string;
    phone_number: string;
  };
  assignee: {
    id: string;
    full_name: string;
    phone_number: string;
  } | null;
};

export type FamilyEventApi = FamilyTaskApi & {
  task: FamilyTaskApi;
  date?: string;
};

export type CategoryWithTaskTemplates = {
  id: string;
  title: string;
  icon?: string;
  tasks: string[];
};

export type BulkTaskItem = {
  title: string;
  category_id?: string;
  category_name?: string;
  category_slug?: string;
};
