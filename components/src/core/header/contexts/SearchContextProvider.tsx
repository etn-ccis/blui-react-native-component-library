import { Ref, createContext, useContext } from 'react';
import { SearchableConfig } from '../header';
import { TextInput } from 'react-native';

type SearchContextType = {
    searchRef: Ref<TextInput>;
    query: string;
    searching: boolean;
    onQueryChange: (text: string) => void;
    searchConfig?: SearchableConfig;
    onSearch: () => void;
    onClear: () => void;
    onClose: () => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (context === null) {
        throw new Error('useSearch must be used within a SearchContextProvider');
    }
    return context;
};
