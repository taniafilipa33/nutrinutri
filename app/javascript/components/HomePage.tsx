import React from 'react';
import Layout from './layout/Layout';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
    const { t } = useTranslation();
    return (
        <Layout>
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
            </div>
        </Layout>
    );
};
