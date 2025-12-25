export type CoordinatorType = {
  id: string;
  full_name: string;
  phone_number: string;
  formatted_phone_number: string;
  boarded: boolean;
  role: string;
  first_name: string;
  last_name: string;
  gender: string;
  age: string;
  country_code: string;
  country_name: string;
  city: string;
  about: string;
  program_ids: string[];
  lastSeen: string;
  dashboardAccess: boolean;
};

export type TableCoordinatorData = {
  id: string;
  full_name: string;
  phone_number: string;
  role: string;
  programs: string;
  lastSeen: string;
  dashboardAccess: string;
}
