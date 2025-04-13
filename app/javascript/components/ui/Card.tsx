import React, { useState } from 'react';
import SchedulerModal from './SchedulerModal';

interface Service {
    id: string;
    name: string;
    price: number;
    location: string;
}

interface Nutri {
    id: string;
    name: string;
    services: Service[];
}

export default function Card({ nutri }: { nutri: Nutri }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    console.log(nutri)
    return (
        <main className="py-2 px-4 md:px-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex gap-4 items-start">
                    <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
                    <div>
                        <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                            FOLLOW-UP
                        </span>
                        <h2 className="text-xl font-semibold">{nutri.name}</h2>
                        <p className="text-sm text-gray-500">
                            {nutri.services.map((service, index) => (
                                <span key={service.id}>
                                    {service.name}{index < nutri.services.length - 1 ? ', ' : ''}
                                </span>
                            ))}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-2">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            {nutri.services.map((service, index) => (
                                <span key={service.id}>
                                    {service.location}{index < nutri.services.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                        <div className="text-sm text-blue-600 font-medium mt-1 cursor-pointer hover:underline">
                            Online Follow-up
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>First appointment</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800"> {Math.min(...nutri.services.map(service => service.price))} €</div>
                    <div className="flex gap-2 mt-2">
                        <button
                            className="bg-orange-100 text-orange-600 hover:bg-orange-200 px-4 py-2 rounded"
                            onClick={openModal}
                        >
                            Schedule appointment
                        </button>

                        <button
                            className="bg-green-100 text-green-600 hover:bg-green-200 px-4 py-2 rounded"
                            onClick={() => window.open('https://example.com', '_blank')}
                        >
                            Website
                        </button>
                    </div>
                </div>
                <SchedulerModal isOpen={isModalOpen} onClose={closeModal} nutri={nutri} />

            </div>
        </main>
    )
}