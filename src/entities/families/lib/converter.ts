import { FamilyApi } from "../api/types";
import { FamilyType, FullFamilyType } from "../model";
import { FamilyContextState } from "../model/providerFamily";

export const convertDataForTable = (
  familiesData: FamilyApi[],
): FamilyType[] => {
  return familiesData.map((family) => {
    const completed = family.occurrences_by_status?.completed ?? 0;
    const inProgress = family.occurrences_by_status?.in_progress ?? 0;
    const initial = family.occurrences_by_status?.initial ?? 0;
    const currentTasksCount = completed + inProgress + initial;
    
    return {
      id: family.id,
      name: family.title,
      caregiver: family.primary_caregiver?.full_name ?? "no",
      lastSeen: new Date().toLocaleDateString(),
      lastActive: new Date().toLocaleDateString(),
      archived: String(family.archived),
      enrolmentSource: "enrolmentSource",
      tasks: currentTasksCount,
      memberships: family.membership_count ?? 0,
      supporters: family.supporter_count,
    };
  });
};

export const convertSingleFamilyData = (
  familyData: FamilyApi
): FamilyContextState => {
  const completed = familyData.occurrences_by_status?.completed ?? 0;
  const inProgress = familyData.occurrences_by_status?.in_progress ?? 0;
  const initial = familyData.occurrences_by_status?.initial ?? 0;

  const family = familyData.membership_by_role_count?.intimate ?? 0;
  const friends = familyData.membership_by_role_count?.private ?? 0;
  const coworkers = familyData.membership_by_role_count?.intimate ?? 0;


  const convertedFamily: FullFamilyType = {
    id: familyData.id,
    name: familyData.title,
    isArchived: familyData.archived,
    eventCount: familyData.event_count,
    firstName: familyData.first_name,
    lastName: familyData.last_name,
    membershipCount: familyData.membership_count,
    taskCount: familyData.task_count,
    primaryCaregiver: {
      phoneNumber: familyData.primary_caregiver?.phone_number,
      fullName: familyData.primary_caregiver?.full_name ?? "",
      id: familyData.primary_caregiver?.id ?? "",
    },
    coordinator: {
      phoneNumber: familyData.coordinator?.phone_number,
      fullName: familyData.coordinator?.full_name ?? "",
      id: familyData.coordinator?.id ?? "",
    },
    inviteLink: familyData.supporters_invite_link,
    lastSeen: new Date().toLocaleDateString(),
    lastActive: new Date().toLocaleDateString(),
    enrolmentSource: "enrolmentSource",
    tasksChart: {
      completed,
      inProgress,
      initial,
    },
    supportersChart: {
      family,
      friends,
      coworkers
    },
  };

  return {
    familyApi: familyData,
    family: convertedFamily,
  };
};
