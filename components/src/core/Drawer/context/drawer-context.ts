import { createContext, useContext } from 'react';

type DrawerContextType = {
    activeItem?: string;
    onItemSelect?: (id: string) => void;
};

export const DrawerContext = createContext<DrawerContextType>({});

/**
 * useDrawerContext hook
 *
 * This hook will provide you with the activeItem that is set at the top-level of the Drawer. It also provides access
 * to the onItemSelect callback function. We expose this through a Context in order to avoid passing this prop
 * through every layer of the component hierarchy. This hook can only be called from within a
 * DrawerContext.Provider.
 */
export const useDrawerContext = (): DrawerContextType => useContext(DrawerContext);
