import { FamilyApi } from "../api/types";
import { FamilyType } from "../model";
import { FamilyContextState } from "../model/providerFamily";

export const convertDataForTable = (
  familiesData: FamilyApi[]
): FamilyType[] => {
  return familiesData.map((family) => {
    const completed = family.task_counter?.completed ?? 0;
    const inProgress = family.task_counter?.in_progress ?? 0;
    const initial = family.task_counter?.initial ?? 0;
    const currentTasksCount = completed + inProgress + initial;
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
): FamilyContextState => {
  const completed = familyData.task_counter?.completed ?? 0;
  const inProgress = familyData.task_counter?.in_progress ?? 0;
  const initial = familyData.task_counter?.initial ?? 0;
  const currentTasksCount = completed + inProgress + initial;

  const patientFullName =
    !familyData.patient.first_name && !familyData.patient.last_name
      ? null
      : `${familyData.patient.first_name ?? "-"} ${
          familyData.patient.last_name ?? "-"
        }`;

  const convertedFamily = {
    id: familyData.id,
    name: familyData.title,
    primaryCaregiver: {
      phoneNumber: familyData.primary_caregiver.phone_number,
      fullName: familyData.primary_caregiver.full_name ?? "",
      id: familyData.primary_caregiver.id,
    },
    coordinator: {
      phoneNumber: familyData.coordinator.phone_number,
      fullName: familyData.coordinator.full_name ?? "",
      id: familyData.coordinator.id,
    },
    patient: {
      phoneNumber: familyData.patient.phone_number ?? "",
      fullName: patientFullName,
      id: Math.random(),
    },
    inviteLink: familyData.supporters_invite_link,
    lastSeen: new Date().toLocaleDateString(),
    lastActive: new Date().toLocaleDateString(),
    enrolmentSource: "enrolmentSource",
    tasks: currentTasksCount,
    supporters: familyData.supporter_count,
  };

  return {
    familyApi: familyData,
    family: convertedFamily,
  };
};
