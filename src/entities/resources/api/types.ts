export type ResourcesTypeApi = {
  id: number;
  name: string;
  provider: string;
  terms_of_service: string;
  email: string;
  link: string;
  category_id: string;
  contact_name: string;
  phone_number: string;
  formatted_phone_number: string;
  program_id: string;
};

export type CreateResourceDto = {
  category_id: string;
  name: string;
  provider: string;
  terms_of_service: string;
  email: string;
  link: string;
};


export type EditResourceDto = {
  category_id: string;
  name: string;
  provider: string;
  terms_of_service: string;
  email: string;
  link: string;
};
