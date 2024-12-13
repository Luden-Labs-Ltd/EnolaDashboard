interface Coordinator {
  boarded: boolean;
  formatted_phone_number: string;
  full_name: string;
  id: number;
  phone_number: string;
  token: string;
}

interface Patient {
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  formatted_phone_number: string | null;
  location: string | null;
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
  primary_caregiver: Coordinator;
  coordinator: Coordinator;
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


export type CreateFamilyDto = {
  title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  program_id: string;
  address?: string;
  location?: string;
};
