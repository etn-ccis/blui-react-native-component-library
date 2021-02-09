import { createContext, useContext } from 'react';

type DrawerContextType = {
    activeItem?: string;
    onItemSelect?: (id: string) => void;
};

export const DrawerContext = createContext<DrawerContextType>({});

export const useDrawerContext = (): DrawerContextType => useContext(DrawerContext);
