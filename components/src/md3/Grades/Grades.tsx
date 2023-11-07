/**
 * @format
 * @flow
 */

import React from 'react';
import { Platform, ViewProps } from 'react-native';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';

/**
 * Props for the Grade component.
 * @typedef {object} GradeProps
 * @prop {string} label - The text that you want to display.
 * @prop {string} [fontColor] - Text color for the Label (Default is theme.colors.onPrimary).
 * @prop {string} [backgroundColor] - Background color of the Label (Default is theme.colors.primary).
 * @prop {number} [size] - The diameter of the circular view.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 */
export type GradeProps = ViewProps & {
    label: string;
    fontColor?: string;
    backgroundColor?: string;
    size?: number;
    theme?: $DeepPartial<MD3Theme>;
};

/**
 * Props for the Grade component with label, fontColor, and backgroundColor excluded.
 * @typedef {object} FixedGradeProps
 * @prop {number} size - The diameter of the circular view.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 */
export type FixedGradeProps = Omit<GradeProps, 'label' | 'fontColor' | 'backgroundColor'>;

/**
 * GradeBase component definition.
 * @param {GradeProps} props - The props for the GradeBase component.
 * @prop {string} label - The text that you want to display.
 * @prop {string} [fontColor] - Text color for the Label (Default is theme.colors.onPrimary).
 * @prop {string} [backgroundColor] - Background color of the Label (Default is theme.colors.primary).
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {React.StyleProp<ViewStyle>} [style] - Additional style for the Grade component.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
const GradeBase = (props: GradeProps): JSX.Element => {
    const defaultTheme = useTheme();
    const { label, fontColor, backgroundColor, size = 40, style, theme: themeOverride, ...otherViewProps } = props;

    const theme = useTheme(themeOverride || props.theme || defaultTheme);

    // Define styles for Avatar.Text component

    const avatarStyle = {
        backgroundColor: backgroundColor || theme.colors.primary,
    };

    // Define styles for text within Avatar.Text
    const textStyle = {
        color: fontColor || theme.colors.onPrimary,
        fontFamily: 'OpenSans-Bold',
        fontWeight: Platform.OS === 'ios' ? ('700' as const) : ('600' as const),
    };

    /*
     * This component is primarily used for Grading. It is a stylized
     * Avatar with a colored background and text color.
     */
    return (
        <Avatar.Text
            label={label}
            style={[avatarStyle, style]}
            color={fontColor}
            labelStyle={textStyle}
            size={size}
            testID="grade"
            {...otherViewProps}
        />
    );
};

/*
 *This component is primarily used for Grading.
 *It is a stylized Grade with a predefined text, background color and text color.
 */

/**
 * APlus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.APlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A+'} fontColor="#FFFFFF" backgroundColor="#198900" {...props} />
);
/**
 * A Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.A = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A'} fontColor="#FFFFFF" backgroundColor="#198900" {...props} />
);
/**
 * AMinus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.AMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A-'} fontColor="#FFFFFF" backgroundColor="#64a721" {...props} />
);
/**
 * BPlus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.BPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B+'} fontColor="#524700" backgroundColor="#afc543" {...props} />
);
/**
 * B Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.B = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B'} fontColor="#524700" backgroundColor="#FBE365" {...props} />
);
/**
 * BMinus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.BMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B-'} fontColor="#524700" backgroundColor="#f6c543" {...props} />
);
/**
 * CPlus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.CPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C+'} fontColor="#4B2800" backgroundColor="#f1a821" {...props} />
);
/**
 * C Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.C = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C'} fontColor="#4B2800" backgroundColor="#ED8B00" {...props} />
);
/**
 * CMinus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.CMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C-'} fontColor="#4B2800" backgroundColor="#dc6508" {...props} />
);
/**
 * DPlus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.DPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D+'} fontColor="#FFFFFF" backgroundColor="#cb3f11" {...props} />
);
/**
 * D Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.D = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D'} fontColor="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
/**
 * DMinus Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.DMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D-'} fontColor="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
/**
 * F Grade component.
 * @param {FixedGradeProps} props - The props for the APlus Grade component.
 * @prop {number} [size=40] - The diameter of the circular view. Default is 40.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @returns {JSX.Element} The rendered component.
 */
GradeBase.F = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'F'} fontColor="#FFFFFF" backgroundColor="#9F45F6" {...props} />
);

export const Grade = GradeBase;

export default Grade;
