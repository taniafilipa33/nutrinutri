import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});


export const fetchNutritionists = async () => {

    const response = await api.get("/nutritionists");
    return response.data;
};


export const searchNutritionists = async (query: string, location: string) => {
    const response = await api.get("/nutritionists/search", {
        params: { query, location },
    });
    return response.data;
};

export const getPendingRequests = async () => {
    const response = await api.get("/appointments/search", {
        params: { status: "pending" },
    });
    return response.data;
};

export const requestAppointment = async (name: string, email: string, requested_date: string, service_id: string) => {
    const response = await api.post("/appointments", {
        name, email, requested_date, service_id
    });
    return response.data;
};


export const answerAppointment = async (id: string, status: string) => {
    const response = await api.patch(`/appointments/${id}`, {

        appointments: {
            status: status
        }

    });
    return response.data;
}

export const checkPendingRequests = async (email: string) => {
    const response = await api.get("/appointments/checkPending", {
        params: { email: email },
    });
    return response;
}