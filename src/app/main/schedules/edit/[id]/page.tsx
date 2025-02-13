import { instance } from "@/app/lib/axios";

export default async function EditSchedule({ params }: { params: { id: string } }) {
    const { id } = await params;

    const getScheduleById = async (id: string) => {
        try {
            const res = await instance.get(`schedules/${id}`);
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const schedules = await getScheduleById(id);

    return (
        <div>
            <h1>Pagina de Edição</h1>
            <div>
            </div>
            <div>
                {JSON.stringify(schedules)}
            </div>
            <span>{id}</span>
        </div>
    )
}