import { CircleType, GenderType } from "../api/types"

export interface Membership {
    id: number
    phoneNumber: string
    fullName: string
    firstName: string
    lastName: string
    age?: number | string
    gender: GenderType,
    primary: string,
    circle: CircleType
    location: any
    city: any
    individualDashboardLink: string
}