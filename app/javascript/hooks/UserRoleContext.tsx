import React, { createContext, useState, ReactNode, useContext } from 'react';

type UserRole = 'nutritionist' | 'patient' | null;

interface UserRoleContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
}


const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);


export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole>(null);

    return (
        <UserRoleContext.Provider value={{ role, setRole }}>
            {children}
        </UserRoleContext.Provider>
    );
};

export const useUserRole = () => {
    const context = useContext(UserRoleContext);
    if (!context) {
        throw new Error('useUserRole must be used within a UserRoleProvider');
    }
    return context;
};