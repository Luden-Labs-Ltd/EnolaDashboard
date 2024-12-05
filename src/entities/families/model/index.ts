export type FamilyType = {
    id: number;
    name: string;
    caregiver: string;
    lastSeen: string;
    lastActive: string;
    enrolmentSource: string;
    tasks: number;
    supporters: number;
}

type Person = {
    phoneNumber: string;
    fullName: string | null;
    id: number;
}

export type FullFamilyType = {
    id: number;
    name: string;
    coordinator: Person;
    primaryCaregiver: Person;
    patient: Person;
    inviteLink: string;
    lastSeen: string;
    lastActive: string;
    enrolmentSource: string;
    tasks: number;
    supporters: number;
}