export type FormDataSchedule = {
    name:string
    startDate: string;
    endDate: string;
    subjects: {
        name: string;
        themes: {
            name: string;
        }[];
    }[];

}
export type Subject = {
    name: string
    themes: Theme[];
}

export type Theme = {
    name: string
}