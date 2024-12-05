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

type ChartTaskInfoData = {
    inProgress: number;
    initial: number;
    completed: number;
}

type ChartSupportersInfoData = {
    family: number;
    friends: number;
    coworkers: number;
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
    tasksChart: ChartTaskInfoData;
    supportersChart: ChartSupportersInfoData;
}