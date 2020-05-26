import React, {ReactNode} from 'react';
import { View, StyleSheet } from 'react-native';
import {H6, Subtitle} from '../typography';
import {Divider} from "react-native-paper";
import {Icon} from "react-native-elements";

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        minHeight: 56,
        backgroundColor: 'blue'
    },
    icon: {
        backgroundColor: 'red',
        display: 'flex',
        width: 56,
        height: 56,
        justifyContent: 'center'
    },
    content: {
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        paddingLeft: 16,
        flex: 1,
        height: '100%'
    },
});

export type DrawerHeaderProps = {
    backgroundImage?: string;
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
    titleContent?: ReactNode;
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const { title, subtitle, titleContent, backgroundImage } = props;

    const getIcon = (): ReactNode => (
        <View style={styles.icon}>
            <Icon name='menu' />
        </View>
    );

    const getHeaderContent = (): ReactNode =>
        titleContent ||
        <View style={styles.content}>
            <H6>{title}</H6>
            <Subtitle>{subtitle}</Subtitle>
        </View>;

    const getBackgroundImage = (): ReactNode => (
        <View>{backgroundImage}</View>
    );

    return (
        <View style={styles.root}>
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
