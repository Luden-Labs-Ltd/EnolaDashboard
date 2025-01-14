import { SorterObject } from "shared/types/sort";
import { FamilyApi } from "../api/types";
import { FamilyType, FullFamilyType } from "../model";
import { FamilyContextState } from "../model/providerFamily";

type ReturnDataForTableType = {
  familiesTableData: FamilyType[];
  sorterTableObject: SorterObject;
};
export const convertDataForTable = (
  familiesData: FamilyApi[]
): ReturnDataForTableType => {
  const sorterObject: SorterObject = {
    id: {
      isSortAvailable: true,
      apiName: "id",
      availableSorts: ["desc", "asc"],
      sortType: "number",
    },
    name: {
      isSortAvailable: true,
      apiName: "title",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
    caregiver: {
      isSortAvailable: false,
      apiName: "caregiver",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
    lastSeen: {
      isSortAvailable: false,
      apiName: "last_seen",
      availableSorts: ["desc", "asc"],
      sortType: "date",
    },
    lastActive: {
      isSortAvailable: false,
      apiName: "last_active",
      availableSorts: ["desc", "asc"],
      sortType: "date",
    },
    archived: {
      isSortAvailable: false,
      apiName: "archived",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
    memberships: {
      isSortAvailable: false,
      apiName: "memberships",
      availableSorts: ["desc", "asc"],
      sortType: "number",
    },
    supporters: {
      isSortAvailable: false,
      apiName: "supporters",
      availableSorts: ["desc", "asc"],
      sortType: "number",
    },
  };

  const familiesTableData = familiesData.map((family) => {
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

  return {
    familiesTableData,
    sorterTableObject: sorterObject,
  };
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
    reason: familyData.reason[0] || "-",
    primaryCaregiver: {
      phoneNumber: familyData?.primary_caregiver?.phone_number || "-",
      fullName: familyData.primary_caregiver?.full_name || "-",
      circle: familyData?.primary_caregiver?.circle ?? "-",
      city: familyData?.primary_caregiver?.city ?? "-",
    },
    patient: {
      phoneNumber: familyData.patient?.formatted_phone_number || "-",
      fullName: familyData.patient?.full_name ?? "-",
      city: familyData.patient.city ?? "-",
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
      coworkers,
    },
    location: familyData.location,
    phoneNumber: familyData.formatted_phone_number,
  };

  return {
    familyApi: familyData,
    family: convertedFamily,
  };
};
