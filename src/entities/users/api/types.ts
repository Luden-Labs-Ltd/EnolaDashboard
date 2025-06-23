import { RoleType } from "shared/types/role";

export interface CoordinatorApi {
  id: string;
  full_name: string;
  phone_number: string;
  formatted_phone_number: string;
  boarded: boolean;
  role: RoleType;
  first_name: string;
  last_name: string;
  gender: string;
  age: number | null;
  country_code: string;
  country_name: string;
  city: string;
  about: string;
}
