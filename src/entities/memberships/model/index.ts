import { CircleType } from "../api/types"

export interface Membership {
    id: number
    phoneNumber: string
    fullName: string
    age?: number | string
    gender: string
    primary: string,
    circle: CircleType
    location: any
    city: any
    individualDashboardLink: string
}