interface Caregiver {
  age: number | null;
  circle: string;
  city: string | null;
  first_name: string | null;
  full_name: string | null;
  gender: string | null;
  id: number;
  individual_dashboard_link: string;
  last_name: string | null;
  location: string | null;
  phone_number: string;
  primary: boolean;
}

interface Patient {
  boarded: boolean;
  city: string | null;
  country_code: string | null;
  country_name: string | null;
  first_name: string | null;
  formatted_phone_number: string;
  full_name: string;
  last_name: string | null;
  phone_number: string;
}

export interface FamilyApi {
  id: number;
  title: string;
  phone_number: string;
  formatted_phone_number: string;
  task_count: number;
  event_count: number;
  membership_count: number;
  current_membership: null;
  first_name: string | null;
  last_name: string | null;
  location: string | null;
  membership_request_count: number;
  patient: Patient;
  primary_caregiver: Caregiver;
  quote: Record<string, unknown>;
  reason: any[];
  supporter_count: number;
  supporters_invite_link: string;
  occurrences_by_status: OccurrencesByStatus;
  membership_by_role_count: MembershipByRoleCount;
  company_id: string;
  program_id: any;
  archived: boolean;
}

export interface OccurrencesByStatus {
  initial: number;
  in_progress: number;
  completed: number;
}
export interface MembershipByRoleCount {
  public: number;
  private: number;
  intimate: number;
}

export type EditFamilyDto = {
  title: string;
  phone_number?: string;
  archived: boolean;
};


type PatientDto = {
  first_name: string;
  phone_number: string;
  city: string;
}
export type EditFamilyInfoDto = {
  title: string;
  reason: string[];
  patient: PatientDto | undefined;
  primary_caregiver: {
    first_name: string;
    phone_number: string;
    city: string;
  };
  program_id: string;
};

export type CreateFamilyDto = {
  title: string;
  reason: string[];
  patient: PatientDto | undefined;
  primary_caregiver: {
    first_name: string;
    phone_number: string;
    city: string;
  };
  program_id: string;
};
