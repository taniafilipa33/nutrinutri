import { answerAppointment } from '../../services/requests';
import { emit } from 'process';
import React, { useState } from 'react';


interface AppointmentCardProps {
    id: string;
    requested_date: string;
    guest: {
        name: string;
    };
}

export default function CardRequest({ appointment, reloadAppointments }: { appointment: AppointmentCardProps, reloadAppointments: () => void }) {
    const [showModal, setShowModal] = useState(false);

    const handleAnswer = async (answer: string) => {
        try {
            const data = await answerAppointment(appointment.id, answer);

        } catch (error) {
            console.error("Search failed:", error);
        }
        setShowModal(false);
        reloadAppointments();
    };
    return (
        <div className="border rounded-lg p-4 w-72 shadow-sm flex flex-col items-center text-center space-y-2">
            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
            <div className="text-gray-800 font-semibold">{appointment.guest.name}</div>
            <div className="text-sm text-gray-500">Online appointment</div>
            <div className="flex items-center text-sm text-gray-600 space-x-2">

                <span>{appointment.requested_date.split('T')[0]}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 space-x-2">

                <span>{appointment.requested_date.split('T')[1].split(':00')[0]}H</span>
            </div>
            <button
                className="bg-orange-100 text-orange-600 hover:bg-orange-200 px-4 py-2 rounded"
                onClick={() => setShowModal(true)}
            >
                Answer Request
            </button>
            {showModal && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 rounded-lg p-4 flex flex-col justify-center items-center space-y-3 shadow-lg z-10">
                    <p className="text-gray-700">Confirm this appointment?</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleAnswer("accepted")}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleAnswer("rejected")}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
