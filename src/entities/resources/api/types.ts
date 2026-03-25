export type ResourcesTypeApi = {
  id: number;
  name: string | null;
  provider: string | null;
  terms_of_service: string | null;
  access_requirements: string | null;
  email: string | null;
  link: string | null;
  category_id: string;
  contact_name: string | null;
  phone_number: string | null;
  formatted_phone_number: string | null;
  program_id: string;
  address: string | null;
};

export type CreateResourceDto = {
  category_id: string;
  name: string;
  provider?: string;
  contact_name?: string;
  phone_number?: string;
  terms_of_service?: string;
  access_requirements?: string;
  email?: string;
  link?: string;
  address?: string;
};


export type EditResourceDto = {
  category_id: string;
  name: string;
  provider?: string;
  contact_name?: string;
  phone_number?: string;
  terms_of_service?: string;
  access_requirements?: string;
  email?: string;
  link?: string;
  address?: string;
};
