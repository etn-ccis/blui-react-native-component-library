import * as Colors from "@pxblue/colors";
import React, { ReactNode, useCallback } from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { H6, Subtitle } from '../typography';
import { Divider, Theme, useTheme } from 'react-native-paper';

const makeStyles = (props: DrawerHeaderProps, theme: Theme): any =>
    StyleSheet.create({
        root: {
            paddingTop: 45,
            backgroundColor: props.backgroundColor || theme.colors.primary,
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
            lineHeight: 30,
        },
        subtitle: {
            color: props.fontColor || theme.colors.surface,
            lineHeight: 15,
            marginTop: -2,
        },
        backgroundImageWrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: props.backgroundOpacity,
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
        },
    });

export type DrawerHeaderProps = {
    backgroundColor?: string;
    backgroundImage?: ImageSourcePropType;
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
        (): ReactNode | undefined => {
            if (backgroundImage) {
                return (
                    <View style={styles.backgroundImageWrapper}>
                        <Image source={backgroundImage} resizeMethod={'resize'} style={styles.backgroundImage} />
                    </View>
                )
            }
        },
        [backgroundImage, backgroundOpacity]
    );

    return (
        <View style={[styles.root, {}]}>
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
