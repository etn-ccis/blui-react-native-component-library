import React, {ReactNode, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {H6, Subtitle} from '../typography';
import {Divider, useTheme} from "react-native-paper";
import * as Colors from '@pxblue/colors';

const styles = StyleSheet.create({
    icon: {
        display: 'flex',
        width: 56,
        height: 56,
        justifyContent: 'center',
        color: 'red'
    },
    content: {
        color: 'blue',
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        paddingLeft: 16,
        flex: 1,
        height: '100%'
    },
});

export type DrawerHeaderProps = {
    backgroundColor?: string;
    backgroundOpacity?: number;
    backgroundImage?: string;
    fontColor?: string;
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
    titleContent?: ReactNode;
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const { title, subtitle, titleContent, backgroundImage, icon } = props;
    const theme = useTheme();
   // const color = props.fontColor || Colors.white[50];
    const bgColor = props.backgroundColor || theme.colors.primary;

    const getIcon = useCallback((): ReactNode => (
        <View style={styles.icon}>
            {icon}
        </View>
    ), []);

    const getHeaderContent = useCallback ((): ReactNode =>
        titleContent ||
        <View style={styles.content}>
            <H6 style={{color: Colors.white[50]}}>{title}</H6>
            <Subtitle>{subtitle}</Subtitle>
        </View>, [title, subtitle, titleContent]);

    const getBackgroundImage = useCallback((): ReactNode => (
        <View>{backgroundImage}</View>
    ), [backgroundImage]);

    return (
        <View style={{backgroundColor: bgColor }}>
            {getBackgroundImage()}
            <View style={{display: 'flex', flexDirection: 'row'}}>
                {getIcon()}
                {getHeaderContent()}
            </View>
            <Divider/>
        </View>
    );
};


DrawerHeader.displayName = 'DrawerHeader';
