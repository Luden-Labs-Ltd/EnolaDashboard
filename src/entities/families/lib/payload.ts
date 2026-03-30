import type { CreateFamilyDto, EditFamilyInfoDto } from "../api/types";

type FamilyFormPerson = {
  fullName?: string;
  phoneNumber?: string;
  city?: string;
};

type FamilyPayloadInput = {
  title: string;
  problem: string;
  patient?: FamilyFormPerson;
  primaryCaregiver: FamilyFormPerson;
};

const normalizeValue = (value?: string) => {
  const trimmed = value?.trim() ?? "";
  return trimmed && trimmed !== "-" ? trimmed : "";
};

const splitFullName = (fullName?: string) => {
  const normalized = normalizeValue(fullName);
  if (!normalized) return {};

  const [firstName, ...rest] = normalized.split(/\s+/);
  const lastName = rest.join(" ");

  return {
    first_name: firstName,
    ...(lastName ? { last_name: lastName } : {}),
  };
};

const buildPatientPayload = (patient?: FamilyFormPerson) => {
  const phoneNumber = normalizeValue(patient?.phoneNumber);
  const city = normalizeValue(patient?.city);
  const nameParts = splitFullName(patient?.fullName);

  if (!phoneNumber && !nameParts.first_name && !city) return undefined;

  return {
    ...nameParts,
    ...(phoneNumber ? { phone_number: phoneNumber } : {}),
    ...(city ? { city } : {}),
  };
};

const buildCaregiverPayload = (primaryCaregiver: FamilyFormPerson) => {
  const phoneNumber = normalizeValue(primaryCaregiver.phoneNumber);
  const city = normalizeValue(primaryCaregiver.city);
  const nameParts = splitFullName(primaryCaregiver.fullName);

  return {
    ...nameParts,
    ...(phoneNumber ? { phone_number: phoneNumber } : {}),
    ...(city ? { city } : {}),
  };
};

export const buildFamilyPayload = (
  input: FamilyPayloadInput
): Omit<CreateFamilyDto, "program_id"> & Omit<EditFamilyInfoDto, "program_id"> => ({
  title: normalizeValue(input.title),
  reason: [normalizeValue(input.problem)].filter(Boolean),
  patient: buildPatientPayload(input.patient),
  primary_caregiver: buildCaregiverPayload(input.primaryCaregiver) as CreateFamilyDto["primary_caregiver"],
});
