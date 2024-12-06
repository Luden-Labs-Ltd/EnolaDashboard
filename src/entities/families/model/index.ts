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
    firstName: string | null;
    lastName: string | null;
    isArchived: boolean;
    taskCount: number;
    eventCount: number;
    membershipCount: number;
    coordinator: Person;
    primaryCaregiver: Person;
    inviteLink: string;
    lastSeen: string;
    lastActive: string;
    enrolmentSource: string;
    tasksChart: ChartTaskInfoData;
    supportersChart: ChartSupportersInfoData;
}