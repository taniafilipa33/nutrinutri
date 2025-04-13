import { useState, useEffect } from "react";
import Layout from "./layout/Layout"
import React from "react";
import { useUserRole } from "../hooks/UserRoleContext";
import { getPendingRequests } from "../services/requests";
import RequestsList from "./ui/RequestsList";


export default function RequestsPage() {
    const { role } = useUserRole();
    const [requests, setRequests] = useState([]);


    const loadRequests = async () => {
        try {
            const data = await getPendingRequests();
            setRequests(data);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);



    if (role !== 'nutritionist') {
        return <h2>Unauthorized Access</h2>;
    }
    else return (
        <Layout>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p></p>
                <span className="text-xl">Peding Requests</span>
                <p></p>
                <span className="mb-58">Accept or reject pending requests</span>
                <RequestsList appointments={requests} reloadAppointments={loadRequests} />

            </div>
        </Layout>
    )
}
