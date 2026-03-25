export interface MembershipApi {
  id: number
  phone_number: string
  full_name: string
  first_name?: string
  last_name?: string
  age?: number
  gender: GenderType
  primary: boolean
  circle: CircleType,
  reason: any[]
  location: any
  city: any
  individual_dashboard_link: string
  user: MembershipUser
}

export type CircleType = "intimate" | "public" | "private";
export type GenderType = "female" | "male" | "other";

export interface MembershipUser {
  id: number
  token: string
  full_name: string
  phone_number: string
  formatted_phone_number: string
}


export type AddMembershipDto = {
  first_name: string,
  last_name: string,
  phone_number: string,
  age:number,
  gender: GenderType,
  circle: CircleType,
  primary: boolean,
}


export type EditMembershipDto = {
  first_name: string,
  last_name: string,
  age:number,
  gender: GenderType,
  circle: CircleType,
  primary: boolean,
}
