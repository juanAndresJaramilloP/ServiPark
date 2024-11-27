'use client';

import { createContext, useState, useContext } from 'react';

// Create a context to hold your variables and their setters
interface VariablesContextType {
    celdas_ocupadas_vehiculo: number;
    setCeldas_ocupadas_vehiculo: React.Dispatch<React.SetStateAction<number>>;
    celdas_ocupadas_motocicleta: number;
    setCeldas_ocupadas_motocicleta: React.Dispatch<React.SetStateAction<number>>;
    celdas_ocupadas_bicicleta: number;
    setCeldas_ocupadas_bicicleta: React.Dispatch<React.SetStateAction<number>>;
}

const VariablesContext = createContext<VariablesContextType>({
    celdas_ocupadas_vehiculo: 0,
    setCeldas_ocupadas_vehiculo: () => { },
    celdas_ocupadas_motocicleta: 0,
    setCeldas_ocupadas_motocicleta: () => { },
    celdas_ocupadas_bicicleta: 0,
    setCeldas_ocupadas_bicicleta: () => { },
});

// Create a provider component
export const VariablesProvider = ({ children }: { children: React.ReactNode }) => {
    const [celdas_ocupadas_vehiculo, setCeldas_ocupadas_vehiculo] = useState(0);
    const [celdas_ocupadas_motocicleta, setCeldas_ocupadas_motocicleta] = useState(0);
    const [celdas_ocupadas_bicicleta, setCeldas_ocupadas_bicicleta] = useState(0);

    return (
        <VariablesContext.Provider value={{
            celdas_ocupadas_vehiculo, setCeldas_ocupadas_vehiculo,
            celdas_ocupadas_motocicleta, setCeldas_ocupadas_motocicleta,
            celdas_ocupadas_bicicleta, setCeldas_ocupadas_bicicleta,
        }}>
            {children}
        </VariablesContext.Provider>
    );
};

// Custom hook to use the context
export const useVariables = () => useContext(VariablesContext);