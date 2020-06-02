import React, { ReactNode, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H6, Subtitle } from '../typography';
import {Divider, Theme, useTheme} from 'react-native-paper';


const makeStyles = (props: DrawerHeaderProps, theme: Theme): any => StyleSheet.create({
    root: {
        backgroundColor: props.backgroundColor || theme.colors.primary
    },
    icon: {
        height: 56,
        width: 52,
        paddingLeft: 4,
        justifyContent: 'center',
    },
    content: {
        color: 'red',
        flexDirection: 'column',
        padding: 4,
        paddingLeft: 16,
        flex: 1,
        height: '100%',
    },
    title: {
        color: props.fontColor || theme.colors.surface,
        lineHeight: 30
    },
    subtitle: {
        color: props.fontColor || theme.colors.surface,
        lineHeight: 15,
        marginTop: -2
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        resizeMode: 'cover',
        height: '100%',
        opacity: props.backgroundOpacity,
    },
});

export type DrawerHeaderProps = {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundOpacity?: number;
    fontColor?: string;
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
    titleContent?: ReactNode;
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const theme = useTheme();
    const styles = makeStyles(props, theme);
    const { title, subtitle, titleContent, backgroundImage, icon, backgroundOpacity } = props;
    const getIcon = useCallback((): ReactNode => <View style={styles.icon}>{icon}</View>, []);

    const getHeaderContent = useCallback(
        (): ReactNode =>
            titleContent || (
                <View style={styles.content}>
                    <H6 style={styles.title}>{title}</H6>
                    <Subtitle style={styles.subtitle}>{subtitle}</Subtitle>
                </View>
            ),
        [title, subtitle, titleContent]
    );

    const getBackgroundImage = useCallback(
        (): ReactNode => (
            <Image
                // @ts-ignore
                source={backgroundImage}
                style={styles.backgroundImage}
            />
        ),
        [backgroundImage, backgroundOpacity]
    );

    return (
        <View style={styles.root}>
            {getBackgroundImage()}
            <View style={{ flexDirection: 'row' }}>
                {icon && getIcon()}
                {getHeaderContent()}
            </View>
            <Divider />
        </View>
    );
};

DrawerHeader.displayName = 'DrawerHeader';
DrawerHeader.defaultProps = {
    backgroundOpacity: 0.3,
};
