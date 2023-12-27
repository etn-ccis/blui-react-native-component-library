/**
 * @format
 * @flow
 */

import React from 'react';
import { Platform, ViewProps } from 'react-native';
import { Avatar } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

/**
 * Props for the Grade component.
 * @typedef {object} GradeProps
 * @prop {string} label - The text that you want to display.
 * @prop {string} [fontColor] - Text color for the Label (Default is theme.colors.onPrimary).
 * @prop {string} [backgroundColor] - Background color of the Label (Default is theme.colors.primary).
 * @prop {number} [size] - The diameter of the circular view.
 * @prop {$DeepPartial<ExtendedTheme>} [theme] - Theme value overrides specific to this component.
 */
export type GradeProps = ViewProps & {
    /**
     * The text shown in the circle
     */
    label: string;
    /**
     * The color of the text label
     * @default theme.colors.onPrimary
     */
    fontColor?: string;
    /**
     * The color of the text label
     * @default theme.colors.primary
     */
    backgroundColor?: string;
    /**
     * The size of the circle in px
     * @default 40
     */
    size?: number;
    /**
     * Theme value overrides
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

export type FixedGradeProps = Omit<GradeProps, 'label' | 'fontColor' | 'backgroundColor'>;

const GradeBase = (props: GradeProps): JSX.Element => {
    const defaultTheme = useExtendedTheme();
    const { label, fontColor, backgroundColor, size = 40, style, theme: themeOverride, ...otherViewProps } = props;

    const theme = useExtendedTheme(themeOverride || props.theme || defaultTheme);

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

/**
 * A component used to render an A+ Grade
 */
GradeBase.APlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A+'} fontColor="#FFFFFF" backgroundColor="#198900" {...props} />
);
/**
 * A component used to render an A Grade
 */
GradeBase.A = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A'} fontColor="#FFFFFF" backgroundColor="#198900" {...props} />
);
/**
 * A component used to render an A- Grade
 */
GradeBase.AMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A-'} fontColor="#FFFFFF" backgroundColor="#64a721" {...props} />
);
/**
 * A component used to render a B+ Grade
 */
GradeBase.BPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B+'} fontColor="#524700" backgroundColor="#afc543" {...props} />
);
/**
 * A component used to render a B Grade
 */
GradeBase.B = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B'} fontColor="#524700" backgroundColor="#FBE365" {...props} />
);
/**
 * A component used to render a B- Grade
 */
GradeBase.BMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B-'} fontColor="#524700" backgroundColor="#f6c543" {...props} />
);
/**
 * A component used to render a C+ Grade
 */
GradeBase.CPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C+'} fontColor="#4B2800" backgroundColor="#f1a821" {...props} />
);
/**
 * A component used to render a C Grade
 */
GradeBase.C = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C'} fontColor="#4B2800" backgroundColor="#ED8B00" {...props} />
);
/**
 * A component used to render a C- Grade
 */
GradeBase.CMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C-'} fontColor="#4B2800" backgroundColor="#dc6508" {...props} />
);
/**
 * A component used to render a D+ Grade
 */
GradeBase.DPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D+'} fontColor="#FFFFFF" backgroundColor="#cb3f11" {...props} />
);
/**
 * A component used to render a D Grade
 */
GradeBase.D = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D'} fontColor="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
/**
 * A component used to render a D- Grade
 */
GradeBase.DMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D-'} fontColor="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
/**
 * A component used to render an F Grade
 */
GradeBase.F = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'F'} fontColor="#FFFFFF" backgroundColor="#9F45F6" {...props} />
);

/**
 * A component used to render a score/grade inside of an Avatar. Includes several sub-components with predefined styles for several common grades.
 */
export const Grade = GradeBase;

/**
 * A component used to render a score/grade inside of an Avatar. Includes several sub-components with predefined styles for several common grades.
 */
export default Grade;
