import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SearchPage from './SearchPage';
import { UserRoleProvider } from '../hooks/UserRoleContext';
import HomePage from './HomePage';
import RequestsPage from './RequestsPage';
const App: React.FC = () => {
    return (
        <UserRoleProvider>
            <Router >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/requests" element={<RequestsPage />} />
                </Routes>
            </Router>
        </UserRoleProvider>
    );
};

export default App;