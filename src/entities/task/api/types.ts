import { CircleType } from "shared/types/circle";

export type CreateTasksApiDto = {
  category_id: string;
  title: string;
  description?: string;
  circle?: CircleType;
  repeated?: boolean;
  start_at?: boolean;
  end_at?: boolean;
  schedule: string;
};
