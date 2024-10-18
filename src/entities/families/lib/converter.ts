import { FamilyApi } from "../api/types";
import { FamilyType } from "../model";

export const convertDataForTable = (
  familiesData: FamilyApi[]
): FamilyType[] => {
  return familiesData.map((family) => {
    const currentTasksCount = family.task_counter.completed + family.task_counter.in_progress + family.task_counter.initial
    return {
      id: family.id,
      name: family.title,
      caregiver: family.primary_caregiver.full_name,
      lastSeen: new Date().toLocaleDateString(),
      lastActive: new Date().toLocaleDateString(),
      enrolmentSource: "enrolmentSource",
      tasks: currentTasksCount,
      supporters: family.supporter_count,
    };
  });
};
