import { createContext, useContext } from 'react';

type NavGroupContextType = {
    activeHierarchy: string[];
};

export const NavGroupContext = createContext<NavGroupContextType>({
    activeHierarchy: [],
});

/**
 * useNavGroupContext hook
 *
 * This hook will provide you with the activeHierarchy array that is set at the top level
 * of the NavGroup component. We expose this through a Context in order to avoid passing this prop
 * through every layer of the component hierarchy. This hook can only be called from within a
 * NavGroupContext.Provider.
 */
export const useNavGroupContext = (): NavGroupContextType => useContext(NavGroupContext);
