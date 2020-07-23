import React, { ReactNode, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle,
    ViewProps,
} from 'react-native';
import { H6, Subtitle1 } from '../typography';
import { Divider, Theme, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { EdgeInsets } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';

const makeStyles = (props: DrawerHeaderProps, theme: Theme, insets: EdgeInsets): any =>
    StyleSheet.create({
        root: {
            paddingTop: insets.top,
            backgroundColor: props.backgroundColor || theme.colors.primary,
        },
        icon: {
            height: 56,
            width: 52,
            paddingLeft: 4,
            justifyContent: 'center',
        },
        content: {
            flexDirection: 'row',
        },
        textContent: {
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
            lineHeight: 16,
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
            resizeMode: 'cover',
        },
    });

export type DrawerHeaderProps = ViewProps & {
    /** Colored background of the header */
    backgroundColor?: string;
    /** Image to blend with the colored background in the header */
    backgroundImage?: ImageSourcePropType;
    /** Opacity to use for blending the background image into the background color */
    backgroundOpacity?: number;
    /** Color to use for header text elements */
    fontColor?: string;
    /** Icon to use to the left of the header text */
    icon?: ReactNode;
    /** First line of text in the header */
    title?: string;
    /** Second line of text in the header */
    subtitle?: string;
    /** Custom content to use in place of the header text */
    titleContent?: ReactNode;
    /** Custom styles (same as styles.root) */
    style?: StyleProp<ViewStyle>;
    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        backgroundImageWrapper?: StyleProp<ViewStyle>;
        backgroundImage?: StyleProp<ImageStyle>;
        content?: StyleProp<ViewStyle>;
        textContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        icon?: StyleProp<ViewStyle>;
    };
    /** Overrides for theme */
    theme?: $DeepPartial<Theme>;
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const {
        title,
        subtitle,
        titleContent,
        backgroundImage,
        icon,
        backgroundOpacity,
        theme: themeOverride,
        styles = {},
        style,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const insets = useSafeArea();
    const defaultStyles = makeStyles(props, theme, insets);

    const getIcon = useCallback((): JSX.Element => <View style={[defaultStyles.icon, styles.icon]}>{icon}</View>, [
        defaultStyles,
        styles,
    ]);

    const getHeaderContent = useCallback(
        (): ReactNode =>
            titleContent || (
                <View style={[defaultStyles.textContent, styles.textContent]}>
                    <H6 style={[defaultStyles.title, styles.title]}>{title}</H6>
                    <Subtitle1 font={'light'} style={[defaultStyles.subtitle, styles.subtitle]}>{subtitle}</Subtitle1>
                </View>
            ),
        [title, subtitle, titleContent, defaultStyles, styles]
    );

    const getBackgroundImage = useCallback((): ReactNode | undefined => {
        if (backgroundImage) {
            return (
                <View style={[defaultStyles.backgroundImageWrapper, styles.backgroundImageWrapper]}>
                    <Image
                        source={backgroundImage}
                        resizeMethod={'resize'}
                        style={[defaultStyles.backgroundImage, styles.backgroundImage]}
                    />
                </View>
            );
        }
    }, [backgroundImage, backgroundOpacity, defaultStyles, styles]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getBackgroundImage()}
            <View style={[defaultStyles.content, styles.content]}>
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
