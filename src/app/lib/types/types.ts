export type FormDataSchedule = {
    name:string
    startDate: string;
    endDate: string;
    subjects: {
        id?: string;
        name: string;
        themes: {
            name: string;
        }[];
    }[];

}
export type Subject = {
    name: string
    id?: string
    themes: Theme[];
}

export type Theme = {
    name: string
    id?:string;
}