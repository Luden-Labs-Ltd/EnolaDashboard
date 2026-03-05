export type FamilyTaskStatus = "initial" | "in_progress" | "completed";

export type FamilyTaskType = "no_time" | "exact_time" | "until_time";

export type FamilyTask = {
  id: string;
  title: string;
  description: string | null;
  status: FamilyTaskStatus;
  type: FamilyTaskType;
  circle: string | null;
  category: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  repeated: boolean;
  schedule: string | null;
  startAt: string | null;
  endAt: string | null;
  statusChangedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  creator: {
    id: string;
    fullName: string;
    phoneNumber: string;
  };
  assignee: {
    id: string;
    fullName: string;
    phoneNumber: string;
  } | null;
};
