import { TaskType } from "../model";

export const getTasks = async (): Promise<TaskType[]> => {
  const tasks: TaskType[] = [
    {
      title: "Task 1",
      id: "a1b2c3d4e5",
      active: true,
      default: false,
    },
    {
      title: "Task 2",
      id: "f6g7h8i9j0",
      active: false,
      default: false,
    },
    {
      title: "Task 3",
      id: "k1l2m3n4o5",
      active: true,
      default: true,
    },
    {
      title: "Task 4",
      id: "p6q7r8s9t0",
      active: false,
      default: false,
    },
    {
      title: "Task 5",
      id: "u1v2w3x4y5",
      active: true,
      default: false,
    },
  ];

  return tasks;
};
