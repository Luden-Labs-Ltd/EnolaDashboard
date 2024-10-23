import { FamilyApi } from "../api/types";
import { FamilyType, FullFamilyType } from "../model";

export const convertDataForTable = (
  familiesData: FamilyApi[]
): FamilyType[] => {
  return familiesData.map((family) => {
    const currentTasksCount =
      family.task_counter.completed +
      family.task_counter.in_progress +
      family.task_counter.initial;
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

export const convertSingleFamilyData = (
  familyData: FamilyApi
): FullFamilyType => {
  const currentTasksCount =
    familyData.task_counter.completed +
    familyData.task_counter.in_progress +
    familyData.task_counter.initial;
  return {
    id: familyData.id,
    name: familyData.title,
    primaryCaregiver: {
      phoneNumber: familyData.primary_caregiver.phone_number,
      fullName: familyData.primary_caregiver.full_name,
      id: familyData.primary_caregiver.id,
    },
    coordinator: {
      phoneNumber: familyData.coordinator.phone_number,
      fullName: familyData.coordinator.full_name,
      id: familyData.coordinator.id,
    },
    inviteLink: familyData.supporters_invite_link,
    lastSeen: new Date().toLocaleDateString(),
    lastActive: new Date().toLocaleDateString(),
    enrolmentSource: "enrolmentSource",
    tasks: currentTasksCount,
    supporters: familyData.supporter_count,
  };
};
