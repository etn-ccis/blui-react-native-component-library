import React from 'react';
import { ViewProps } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

export type GradeProps = ViewProps & {
    label: string;
    color?: string;
    backgroundColor?: string;
    size?: number;
};

export type FixedGradeProps = Pick<GradeProps, 'size'>;

const GradeBase = (props: GradeProps) => {
    const theme = useTheme();
    const { label, color = theme.colors.onPrimary, backgroundColor = theme.colors.primary, size = 40, style, ...otherViewProps } = props;
    
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
    <GradeBase label={'A+'} color="#FFFFFF" backgroundColor="#198900" size={props.size} />
);
GradeBase.A = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A'} color="#FFFFFF" backgroundColor="#198900" size={props.size} />
);
GradeBase.AMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'A-'} color="#FFFFFF" backgroundColor="#64a721" size={props.size} />
);
GradeBase.BPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B+'} color="#524700" backgroundColor="#afc543" size={props.size} />
);
GradeBase.B = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B'} color="#524700" backgroundColor="#FBE365" size={props.size} />
);
GradeBase.BMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'B-'} color="#524700" backgroundColor="#f6c543" size={props.size} />
);
GradeBase.CPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C+'} color="#4B2800" backgroundColor="#f1a821" size={props.size} />
);
GradeBase.C = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C'} color="#4B2800" backgroundColor="#ED8B00" size={props.size} />
);
GradeBase.CMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'C-'} color="#4B2800" backgroundColor="#dc6508" size={props.size} />
);
GradeBase.DPlus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D+'} color="#FFFFFF" backgroundColor="#cb3f11" size={props.size} />
);
GradeBase.D = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D'} color="#FFFFFF" backgroundColor="#BA1A1A" size={props.size} />
);
GradeBase.DMinus = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'D-'} color="#FFFFFF" backgroundColor="#BA1A1A" size={props.size} />
);
GradeBase.F = (props: FixedGradeProps): JSX.Element => (
    <GradeBase label={'F'} color="#FFFFFF" backgroundColor="#9F45F6" size={props.size} />
);

export const Grade = GradeBase;
export default Grade;
