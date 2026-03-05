import { FamilyTaskApi } from "../api/types";
import { FamilyTask } from "../model";

export const convertFamilyTask = (task: FamilyTaskApi): FamilyTask => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  type: task.type,
  circle: task.circle,
  category: task.category,
  categorySlug: task.category_slug,
  categoryName: task.category_name,
  repeated: task.repeated,
  schedule: task.schedule,
  startAt: task.start_at,
  endAt: task.end_at,
  statusChangedAt: task.status_changed_at,
  createdAt: task.created_at,
  updatedAt: task.updated_at,
  creator: {
    id: task.creator.id,
    fullName: task.creator.full_name,
    phoneNumber: task.creator.phone_number,
  },
  assignee: task.assignee
    ? {
        id: task.assignee.id,
        fullName: task.assignee.full_name,
        phoneNumber: task.assignee.phone_number,
      }
    : null,
});

export const convertFamilyTasks = (tasks: FamilyTaskApi[]): FamilyTask[] =>
  tasks.map(convertFamilyTask);
