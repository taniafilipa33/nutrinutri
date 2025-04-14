import React from "react";
import Card from "./Card";
import { useTranslation } from 'react-i18next';

interface Service {
    id: string;
    name: string;
    price: number;
    location: string;
}


interface Nutri {
    id: string
    name: string;
    services: Service[];
}

export default function SearchList({ nutris }: { nutris: Nutri[] }) {
    const { t } = useTranslation();
    if (!nutris || nutris.length === 0) return (<div> <span>{t('no_results')}</span></div>)

    return (
        <div className="">
            {nutris.map((nutri) => (
                <Card key={nutri.id} nutri={nutri} />
            ))}
        </div>

    )
}