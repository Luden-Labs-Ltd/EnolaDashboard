export type TaskType = {
    title: string;
    id: number;
    active?: boolean;
    default?: boolean;
    description: string
    circle: string
    repeated: string
    startAt: string
    endAt: string
    schedule: string
    categoryId: string
}

export type TaskTypeApi = {
    id: number
    title: string
    description: string
    circle: string
    repeated: string
    start_at: string
    end_at: string
    schedule: string
    category_id: string
}