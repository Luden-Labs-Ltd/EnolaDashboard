interface Coordinator {
  boarded: boolean;
  formatted_phone_number: string;
  full_name: string;
  id: number;
  phone_number: string;
  token: string;
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
  patient: string | null;
  primary_caregiver: Coordinator;
  quote: Record<string, unknown>;
  reason: any[];
  supporter_count: number;
  supporters_invite_link: string;
  task_counter: TaskCounter;
  title: string;
  token: string;
}
