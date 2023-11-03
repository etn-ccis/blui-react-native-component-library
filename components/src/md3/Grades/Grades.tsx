import React from 'react';
import { Platform, ViewProps } from 'react-native';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';


export type GradeProps = ViewProps & {
    // the text that you want to display
    label: string;
    // Text color for the Label (Default is theme.colors.onPrimary)
    fontColor?: string;
    // Background color of the Label (Default is theme.colors.primary)
    backgroundColor?: string;
    // the diameter of the circular view
    size?: number;
    // Theme value overrides specific to this component.
    theme?: $DeepPartial<MD3Theme>;
};

export type FixedGradeProps = Omit<GradeProps, 'label' | 'fontColor' | 'backgroundColor'>;

// GradeBase component definition
const GradeBase = (props: GradeProps): JSX.Element => {
    const defaultTheme = useTheme();
    const {
        label,
        fontColor,
        backgroundColor,
        size = 40,
        style,
        theme: themeOverride,
        ...otherViewProps
    } = props;

    const theme = useTheme(themeOverride || props.theme || defaultTheme);

    // Define styles for Avatar.Text component
    const avatarStyle = {
        backgroundColor: backgroundColor || theme.colors.primary,
    };

    // Define styles for text within Avatar.Text
    const textStyle = {
        color: fontColor || theme.colors.onPrimary,
        fontFamily: 'OpenSans-Bold', // Font family for text
        fontWeight: Platform.OS === 'ios' ? ('700' as const) : ('600' as const), // Font weight
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
GradeBase.APlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A+'} fontColor="#FFFFFF" backgroundColor="#198900" {...props} />
);
GradeBase.A = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A'} fontColor="#FFFFFF" backgroundColor="#198900" {...props} />
);
GradeBase.AMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A-'} fontColor="#FFFFFF" backgroundColor="#64a721" {...props} />
);
GradeBase.BPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B+'} fontColor="#524700" backgroundColor="#afc543" {...props} />
);
GradeBase.B = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B'} fontColor="#524700" backgroundColor="#FBE365" {...props} />
);
GradeBase.BMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B-'} fontColor="#524700" backgroundColor="#f6c543" {...props} />
);
GradeBase.CPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C+'} fontColor="#4B2800" backgroundColor="#f1a821" {...props} />
);
GradeBase.C = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C'} fontColor="#4B2800" backgroundColor="#ED8B00" {...props} />
);
GradeBase.CMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C-'} fontColor="#4B2800" backgroundColor="#dc6508" {...props} />
);
GradeBase.DPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D+'} fontColor="#FFFFFF" backgroundColor="#cb3f11" {...props} />
);
GradeBase.D = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D'} fontColor="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
GradeBase.DMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D-'} fontColor="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
GradeBase.F = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'F'} fontColor="#FFFFFF" backgroundColor="#9F45F6" {...props} />
);

export const Grade = GradeBase;

export default Grade;
