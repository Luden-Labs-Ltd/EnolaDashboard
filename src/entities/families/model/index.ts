export type FamilyType = {
    id: string;
    name: string;
    caregiver: string;
    lastSeen: string;
    lastActive: string;
    archived: string,
    enrolmentSource: string;
    tasks: number;
    supporters: number;
}

type Person = {
    phoneNumber: string;
    fullName: string | null;
    city: string | null;
    circle: string;
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
    id: string;
    name: string;
    reason: string;
    firstName: string | null;
    lastName: string | null;
    isArchived: boolean;
    taskCount: number;
    eventCount: number;
    membershipCount: number;
    patient: Omit<Person, 'circle'>;
    primaryCaregiver: Person;
    inviteLink: string;
    lastSeen: string;
    lastActive: string;
    enrolmentSource: string;
    tasksChart: ChartTaskInfoData;
    supportersChart: ChartSupportersInfoData;
    location: string | null;
    phoneNumber: string;
}