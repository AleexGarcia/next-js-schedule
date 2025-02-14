'use client'
import Button from "@/app/components/button";
import { redirect } from "next/navigation";
import ScheduleCard from "./components/scheduleCard";
import { useState, useEffect } from "react";
import { instance } from "@/app/lib/axios";
import { AxiosResponse } from "axios";

type scheduleDTO = {
    createdAt: string;
    endDate: string;
    name: string;
    startDate: string;
    updatedAt: string;
    userId: string;
    _id: string;
    __v: number;
}

export default function Schedules() {
    const [schedules, setSchedules] = useState<Array<scheduleDTO>>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res: AxiosResponse<Array<scheduleDTO>, any> = await instance.get('schedules');
                if (res.status === 200) {
                    setSchedules(res.data);
                  
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const createSchedule = () => {
        redirect('/main/schedules/form/create');
    }
    const removeSchedule = async (id: string): Promise<void> => {
        try {
            const res = await instance.delete(`schedules/${id}`);
            if (res.status === 200) {
                const newSchedules = schedules.filter(item => item._id !== id);
                setSchedules(newSchedules);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="flex-grow flex flex-col gap-4 p-2 ">
            <div className="flex w-full justify-between items-center">
                <h1>My Schedules</h1>
                <Button onClick={createSchedule} label="Create a new schedule" custom="secundary" />
            </div>
            <div className="flex gap-4 flex-wrap">
                {schedules.map(({ name, startDate, endDate, _id }: scheduleDTO) => (
                    <ScheduleCard
                        key={_id}
                        id={_id}
                        name={name}
                        endDate={endDate}
                        startDate={startDate}
                        removeSchedule={removeSchedule}
                    />
                ))}
            </div>
        </section>
    )
}