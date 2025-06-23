export type CoordinatorType = {
  id: number;
  token: string;
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
  families: Family;
};

export type TableCoordinatorData = {
  id: string;
  full_name: string;
  phone_number: string;
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
}

type Family = {
  id: number;
  title: string;
};

export type FullCoordinatorType = {
  id: number;
  token: string;
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
  families: Family;
};
