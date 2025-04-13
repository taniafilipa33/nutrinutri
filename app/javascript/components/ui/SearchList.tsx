import React from "react";
import Card from "./Card";

interface Service {
    id: string;
    name: string;

    location: string;
}


interface Nutri {
    id: string
    name: string;
    services: Service[];
}

export default function SearchList({ nutris }: { nutris: Nutri[] }) {
    if (!nutris || nutris.length === 0) return (<div> <span> No results</span></div>)
    console.log(nutris)
    return (
        <div className="">
            {nutris.map((nutri) => (
                <Card key={nutri.id} nutri={nutri} />
            ))}
        </div>

    )
}