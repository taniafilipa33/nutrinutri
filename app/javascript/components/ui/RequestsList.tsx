import React from "react";
import CardRequest from "./CardRequest";



interface Appointment {
    id: string;
    requested_date: string;
    guest: {
        name: string;
    };
}

export default function RequestsList({ appointments, reloadAppointments }: { appointments: Appointment[], reloadAppointments: () => void; }) {
    if (!appointments || appointments.length === 0) return (<div> <span> No results</span></div>)

    return (
        <div className="flex flex-wrap gap-4">
            {appointments.map((appointment) => (
                <CardRequest key={appointment.id} appointment={appointment} reloadAppointments={reloadAppointments} />
            ))}
        </div>

    )
}