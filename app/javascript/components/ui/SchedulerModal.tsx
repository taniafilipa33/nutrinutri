import { checkPendingRequests, requestAppointment } from "../../services/requests";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
interface Services {
    id: string;
    name: string;
    location: string;
}


interface Nutri {
    id: string
    name: string;
    services: Services[]
}


interface SchedulerModalProps {
    isOpen: boolean;
    onClose: () => void;
    nutri: Nutri;
}
export default function SchedulerModal({ isOpen, onClose, nutri }: SchedulerModalProps) {
    const { t } = useTranslation();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dateTime, setDateTime] = useState<string>("");
    const [service, setService] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            try {
                const validation = await checkPendingRequests(email);
                const data = await requestAppointment(name, email, dateTime, service);
                onClose();
            } catch (error) {
                alert("you already have a pending request");
            }

        } catch (error2) {
            console.error("Search failed:", error2);
        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {t('schedule_appointment')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            {t('name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t('email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                            {t('date_time')}
                        </label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            className="w-full px-3 py-2 border rounded-md"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            {t('service')}
                        </label>
                        <select required onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border rounded-md">
                            <option value="" disabled selected>Select a service</option>
                            {nutri.services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded"
                        >
                            {t('confirm')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



