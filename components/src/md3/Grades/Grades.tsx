import React from 'react';
import { Platform, ViewProps } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

// Define the prop types for the Grade component
export type GradeProps = ViewProps & {
    label: string;
    fontColor?: string;
    backgroundColor?: string;
    size?: number;
};

// Omit certain props from GradeProps to create FixedGradeProps
export type FixedGradeProps = Omit<GradeProps, 'label' | 'fontColor' | 'backgroundColor'>;

// GradeBase component definition
const GradeBase = (props: GradeProps): JSX.Element => {
    const theme = useTheme();
    const {
        label,
        fontColor = theme.colors.onPrimary,
        backgroundColor = theme.colors.primary,
        size = 40,
        style,
        ...otherViewProps
    } = props;

    // Define styles for Avatar.Text component
    const avatarStyle = {
        backgroundColor,
    };

    // Define styles for text within Avatar.Text
    const textStyle = {
        color: fontColor,
        fontFamily: 'OpenSans-Bold', // Font family for text
        fontWeight: Platform.OS === 'ios' ? ('700' as const) : ('600' as const), // Font weight
    };
    // Render Avatar.Text component with specified props and styles
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

// Define grade Sub Components (APlus, A, AMinus, etc.)
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
