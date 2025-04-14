import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { EventEmitter } from "stream";
import { useTranslation } from "react-i18next";
interface SearcherProps {
    onSearch: (params: { query: string; location: string }) => void;
}

export default function Searcher({ onSearch }: SearcherProps) {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    const { t } = useTranslation();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ query, location });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center md:flex-row gap-2 md:gap-4 bg-gradient-to-r from-teal-400 to-green-400 p-4 rounded-lg items-center">
            <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder={t('search')} className="w-full md:w-72 px-4 py-2 rounded-md bg-white text-gray-700 placeholder-gray-400 shadow-sm outline-none" />
            <div className="relative w-full md:w-72">
                <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder={t('location')} className="w-full px-4 py-2 rounded-md bg-white text-gray-700 placeholder-gray-400 shadow-sm outline-none" />
            </div>
            <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-md transition"
            >
                {t('search')}
            </button>
        </form>
    );
}
