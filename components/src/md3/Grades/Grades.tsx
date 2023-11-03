import React from 'react';
import { ViewProps } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

export type GradeProps = ViewProps & {
    label: string;
    color?: string;
    backgroundColor?: string;
    size?: number;
};

export type FixedGradeProps = Omit<GradeProps, 'label' | 'color' | 'backgroundColor'>;

const GradeBase = (props: GradeProps): JSX.Element => {
    const theme = useTheme();
    const {
        label,
        color = theme.colors.onPrimary,
        backgroundColor = theme.colors.primary,
        size = 40,
        style,
        ...otherViewProps
    } = props;

    const avatarStyle = {
        backgroundColor,
    };

    const textStyle = {
        color,
        fontFamily: 'OpenSans-Bold',
        fontWeight: '700' as const,
    };

    return (
        <Avatar.Text
            label={label}
            style={[avatarStyle, style]}
            color={color}
            labelStyle={textStyle}
            size={size}
            testID="grade"
            {...otherViewProps}
        />
    );
};

GradeBase.APlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A+'} color="#FFFFFF" backgroundColor="#198900" {...props} />
);
GradeBase.A = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A'} color="#FFFFFF" backgroundColor="#198900" {...props} />
);
GradeBase.AMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A-'} color="#FFFFFF" backgroundColor="#64a721" {...props} />
);
GradeBase.BPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B+'} color="#524700" backgroundColor="#afc543" {...props} />
);
GradeBase.B = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B'} color="#524700" backgroundColor="#FBE365" {...props} />
);
GradeBase.BMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B-'} color="#524700" backgroundColor="#f6c543" {...props} />
);
GradeBase.CPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C+'} color="#4B2800" backgroundColor="#f1a821" {...props} />
);
GradeBase.C = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C'} color="#4B2800" backgroundColor="#ED8B00" {...props} />
);
GradeBase.CMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C-'} color="#4B2800" backgroundColor="#dc6508" {...props} />
);
GradeBase.DPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D+'} color="#FFFFFF" backgroundColor="#cb3f11" {...props} />
);
GradeBase.D = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D'} color="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
GradeBase.DMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D-'} color="#FFFFFF" backgroundColor="#BA1A1A" {...props} />
);
GradeBase.F = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'F'} color="#FFFFFF" backgroundColor="#9F45F6" {...props} />
);

export const Grade = GradeBase;
export default Grade;
