import { TaskType, TaskTypeApi } from "../model";

const DEFAULT_TASKS: TaskType[] = [];

export const convertTasksData = (
  tasksApiData: TaskTypeApi[]
): TaskType[] => {
  const mappedCategories = tasksApiData.map((taskApi): TaskType => {
    const convertedTask: TaskType = {
      id: taskApi.id,
      categoryId: taskApi.category_id,
      title: taskApi.title,
      default: false,
      description: taskApi.description,
      circle: taskApi.circle,
      repeated: taskApi.repeated,
      startAt: taskApi.start_at,
      endAt: taskApi.end_at,
      schedule: taskApi.schedule,
    };
    return convertedTask;
  });

  return [...DEFAULT_TASKS, ...mappedCategories];
};
