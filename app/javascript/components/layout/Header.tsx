import { useUserRole } from '../../hooks/UserRoleContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const { role, setRole } = useUserRole();
    const navigate = useNavigate();

    const handleRoleSelection = (role: 'nutritionist' | 'patient') => {
        setRole(role);

        if (role === 'nutritionist') {
            navigate('/requests');
        } else {
            navigate('/search');
        }

    };
    return (
        <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        nutrinutri
                    </Link>
                    <nav className="flex space-x-6">

                        <button
                            onClick={() => handleRoleSelection('nutritionist')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            I am a Nutritionist
                        </button>
                        <button
                            onClick={() => handleRoleSelection('patient')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            I am a Patient
                        </button>
                    </nav>
                </div>
            </div>
        </header >
    );
};

export default Header;