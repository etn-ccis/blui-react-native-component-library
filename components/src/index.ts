/**
 Copyright (c) 2021-present, Eaton
 All rights reserved.
 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            primaryBase: string;
            primaryPalette: {
                light: string;
                main: string;
                dark: string;
            };
            accentPalette: {
                light: string;
                main: string;
                dark: string;
            };
            errorPalette: {
                light: string;
                main: string;
                dark: string;
            };
            divider: string;
            textPalette: {
                primary: string;
                secondary: string;
                onPrimary: {
                    light: string;
                    main: string;
                    dark: string;
                };
                disabled: string;
                hint: string;
            };
            actionPalette: {
                hover: string;
                active: string;
                background: string;
                disabled: string;
                disabledBackground: string;
            };
        }
        interface ThemeFonts {
            bold: ThemeFont;
        }
    }
}

export * from './core';
