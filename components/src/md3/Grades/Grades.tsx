import React from 'react';
import { Avatar } from 'react-native-paper';

export type CustomGradeProps = {
    label: string;
    color: string;
    backgroundColor: string;
    size: number;
};

export type GradeProps = {
    label?: string;
    size?: number;
};
export const CustomGrade: React.FC<CustomGradeProps> = ({ label, color, backgroundColor, size }) => {
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
            style={avatarStyle}
            color={color}
            labelStyle={textStyle}
            size={size || 40}
            testID="grade"
        />
    );
};

export const Grades = {
    aPlus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'A+'} color="#FFFFFF" backgroundColor="#198900" size={props.size || 40} />
    ),
    a: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'A'} color="#FFFFFF" backgroundColor="#198900" size={props.size || 40} />
    ),
    aMinus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'A-'} color="#FFFFFF" backgroundColor="#64a721" size={props.size || 40} />
    ),
    bPlus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'B+'} color="#524700" backgroundColor="#afc543" size={props.size || 40} />
    ),
    b: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'B'} color="#524700" backgroundColor="#FBE365" size={props.size || 40} />
    ),
    bMinus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'B-'} color="#524700" backgroundColor="#f6c543" size={props.size || 40} />
    ),
    cPlus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'C+'} color="#4B2800" backgroundColor="#f1a821" size={props.size || 40} />
    ),
    c: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'C'} color="#4B2800" backgroundColor="#ED8B00" size={props.size || 40} />
    ),
    cMinus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'C-'} color="#4B2800" backgroundColor="#dc6508" size={props.size || 40} />
    ),
    dPlus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'D+'} color="#FFFFFF" backgroundColor="#cb3f11" size={props.size || 40} />
    ),
    d: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'D'} color="#FFFFFF" backgroundColor="#BA1A1A" size={props.size || 40} />
    ),
    dMinus: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'D-'} color="#FFFFFF" backgroundColor="#BA1A1A" size={props.size || 40} />
    ),
    f: (props: GradeProps): JSX.Element => (
        <CustomGrade label={props.label || 'F'} color="#FFFFFF" backgroundColor="#9F45F6" size={props.size || 40} />
    ),
    custom: (props: CustomGradeProps): JSX.Element => (
        <CustomGrade
            label={props.label}
            color={props.color}
            backgroundColor={props.backgroundColor}
            size={props.size}
        />
    ),
};

export default Grades;
