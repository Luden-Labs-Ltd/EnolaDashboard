import { MembershipApi } from "../api/types";
import { Membership } from "../model";

export const convertDataForTable = (
  membershipsData: MembershipApi[]
): Membership[] => {
  return membershipsData.map((membership) => {
    return {
      id: membership.id,
      phoneNumber: membership.user.formatted_phone_number,
      fullName: membership.full_name,
      age: membership.age ?? "unknown",
      gender: membership.gender,
      primary: String(membership.primary),
      circle: membership.circle,
      location: membership.location,
      city: membership.city,
      individualDashboardLink: membership.individual_dashboard_link,
    };
  });
};

// export const convertSingleFamilyData = (
//   familyData: FamilyApi
// ): FullFamilyType => {
//   const currentTasksCount =
//     familyData.task_counter.completed +
//     familyData.task_counter.in_progress +
//     familyData.task_counter.initial;
//   return {
//     id: familyData.id,
//     name: familyData.title,
//     primaryCaregiver: {
//       phoneNumber: familyData.primary_caregiver.phone_number,
//       fullName: familyData.primary_caregiver.full_name,
//       id: familyData.primary_caregiver.id,
//     },
//     coordinator: {
//       phoneNumber: familyData.coordinator.phone_number,
//       fullName: familyData.coordinator.full_name,
//       id: familyData.coordinator.id,
//     },
//     inviteLink: familyData.supporters_invite_link,
//     lastSeen: new Date().toLocaleDateString(),
//     lastActive: new Date().toLocaleDateString(),
//     enrolmentSource: "enrolmentSource",
//     tasks: currentTasksCount,
//     supporters: familyData.supporter_count,
//   };
// };
