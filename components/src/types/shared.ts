export type ThemeOverrides = {
    avatar: {
        background: string;
    };

    bottomNavigation: {
        inactive: string;
    };
    button: {
        contained: {
            text: {
                disabled: string;
            };
        };
    };
    chip: {
        outlined: {
            background: string;
        };
        flat: {
            background: string;
        };
    };
    snackbar: {
        accent: string;
    };
    toggleButtonGroup: {
        checked: {
            background: string;
        };
    };
};

export type ThemeOpacity = {
    disabled: number;
    divider: number;
    disabledBackground: number;
    actionOpacity: number;
};
