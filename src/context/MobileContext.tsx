import React, { createContext, useState } from 'react';

interface MobileContextData {
    handleDrawerToggle: () => void,
    mobileOpen: boolean
}

export const MobileContext = createContext<MobileContextData>( {} as MobileContextData );

export const MobileProviver: React.FC = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    return (
        <MobileContext.Provider value={{handleDrawerToggle, mobileOpen}}>
            {children}
        </MobileContext.Provider>
    );
}

