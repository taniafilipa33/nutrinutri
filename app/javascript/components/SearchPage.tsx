import { useState, useEffect } from "react";
import Layout from "./layout/Layout"
import React from "react";
import SearchList from "./ui/SearchList";
import Searcher from "./ui/Searcher";
import { fetchNutritionists, searchNutritionists } from "../services/requests";
import { useUserRole } from "../hooks/UserRoleContext";
import { useTranslation } from 'react-i18next';

export default function SearchPage() {
    const { role } = useUserRole();
    const [nutris, setNutris] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const loadNutritionists = async () => {
            try {
                const data = await fetchNutritionists();
                setNutris(data);
            } catch (error) {
                console.error("Failed to fetch nutritionists:", error);
            }
        };
        loadNutritionists();
    }, []);


    const handleSearch = async ({ query, location }: { query: string; location: string }) => {
        try {
            const data = await searchNutritionists(query, location);
            setNutris(data);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };
    if (role !== 'patient') {
        return <h2>{t('unnauthorized_access')}</h2>;
    }
    else return (
        <Layout>
            <Searcher onSearch={handleSearch}></Searcher>
            <SearchList nutris={nutris} />
        </Layout>
    )
}
