'use client'
import Button from "@/app/components/button";
import { redirect } from "next/navigation";
import ScheduleCard from "./components/scheduleCard";
import { useState, useEffect } from "react";

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
            const res = await fetch('http://localhost:3000/api/schedules');
            const data = await res.json();
            setSchedules(data);
        }
        fetchData();
    }, [])

    const createSchedule = () => {
        redirect('/home/schedules/create');
    }
    const removeSchedule = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`http://localhost:3000/api/schedules/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.ok) {
                setSchedules([...schedules.filter(item => item._id !== id)]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="flex-grow flex flex-col gap-4 p-2 ">
            <div className="flex w-full justify-between items-center">
                <h1>My Schedules</h1>
                <Button onClick={createSchedule} label="Create a new schedule" type="secundary" />
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