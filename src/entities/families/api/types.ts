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


interface MembershipCount {
  public: number;
  private: number;
  intimate: number;
}

interface TaskCounter {
  completed: number;
  in_progress: number;
  initial: number;
}

export interface FamilyApi {
  current_membership: null;
  id: number;
  membership_count: MembershipCount;
  membership_request_count: number;
  patient: Patient;
  primary_caregiver: Coordinator;
  coordinator: Coordinator;
  quote: Record<string, unknown>;
  reason: any[];
  supporter_count: number;
  supporters_invite_link: string;
  task_counter: TaskCounter;
  title: string;
  token: string;
}



export type EditFamilyDto = {
  title: string,
  phone_number?: string,
  archived: boolean,
}