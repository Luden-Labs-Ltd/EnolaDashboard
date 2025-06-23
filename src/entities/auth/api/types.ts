import { RoleType } from "shared/types/role";

export interface ProfileApi {
  id: string;
  first_name: string;
  last_name: string;
  role: RoleType;
  gender: string;
  age: any;
  phone_number: string;
  formatted_phone_number: string;
  boarded: boolean;
  country_code: string;
  country_name: string;
  city: string;
  about: string;
  company: Company;
}

export interface Company {
  id: string;
  name: string;
  phone_number: string;
  formatted_phone_number: string;
  country_code: string;
  state: string;
  city: string;
  street_address_1: string;
  street_address_2: string;
  postal_code: string;
  programs: Program[];
}

export interface Program {
  active: boolean;
  family_enrolment_url: string;
  id: string;
  name: string;
}
