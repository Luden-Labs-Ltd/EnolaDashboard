import { TaskType, TaskTypeApi } from "../model";

export type ConvertedTasksState = {
  allTasks: TaskType[],
  tasksByCategory: Record<string, TaskType[]>
}

export const convertTasksData = (
  tasksApiData: TaskTypeApi[]
): ConvertedTasksState=> {

  const tasksByCategory: Record<string, TaskType[]> = {}

  const mappedTasks = tasksApiData.map((taskApi): TaskType => {
    const currentCategoryId = taskApi.category_id;

    const convertedTask: TaskType = {
      id: taskApi.id,
      categoryId: taskApi.category_id,
      title: taskApi.title,
      default: false,
      active: true,
      description: taskApi.description,
      circle: taskApi.circle,
      repeated: taskApi.repeated,
      startAt: taskApi.start_at,
      endAt: taskApi.end_at,
      schedule: taskApi.schedule,
    };

    if (tasksByCategory[currentCategoryId]) {
      tasksByCategory[currentCategoryId].push(convertedTask)
    }else{
      tasksByCategory[currentCategoryId] = [convertedTask]
    }
    return convertedTask;
  });

  return {
    allTasks: mappedTasks,
    tasksByCategory: tasksByCategory,
  };
};
