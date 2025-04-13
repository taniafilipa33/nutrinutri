import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';


interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex bg-gradient-to-r from-teal-400 to-green-400 flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;