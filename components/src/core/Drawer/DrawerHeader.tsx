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
    TouchableOpacity,
    TouchableWithoutFeedbackProps,
    TouchableWithoutFeedback,
} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EdgeInsets, IconSource } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { useHeaderDimensions } from '../__hooks__/useHeaderDimensions';
import { Icon } from '../Icon';
import { useFontScale, useFontScaleSettings } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleRegular, fontStyleSemiBold } from '../Utility/shared';

const makeStyles = (
    props: DrawerHeaderProps,
    theme: ExtendedTheme,
    insets: EdgeInsets,
    height: number,
    fontScale: number
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    icon: ViewStyle;
    content: ViewStyle;
    textContent: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
    backgroundImageWrapper: ViewStyle;
    backgroundImage: ImageStyle;
}> =>
    StyleSheet.create({
        root: {
            paddingTop: insets.top,
            backgroundColor: props.backgroundColor || theme.colors.surface,
            height: height,
            borderTopRightRadius: 15,
        },
        icon: {
            marginLeft: 16,
            height: 56 * fontScale,
            width: 40 * fontScale,
            justifyContent: 'center',
        },
        content: {
            flexDirection: 'row',
            paddingLeft: insets.left,
            height: '100%',
        },
        textContent: {
            flexDirection: 'column',
            paddingVertical: 4 * fontScale,
            flex: 1,
            height: '100%',
            ...fontStyleSemiBold,
            justifyContent: 'center',
        },
        title: {
            color: props.fontColor || theme.colors.primary,
            lineHeight: 32,
            fontSize: 24,
            letterSpacing: 0,
            ...fontStyleSemiBold,
        },
        subtitle: {
            color: props.fontColor || theme.colors.onSurfaceVariant,
            lineHeight: 20,
            fontSize: 14,
            letterSpacing: 0,
            ...fontStyleRegular,
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

export type DrawerHeaderProps = TouchableWithoutFeedbackProps & {
    /**
     * The header background color
     *
     * @default: theme.colors.surface
     */
    backgroundColor?: string;
    /**
     * An image to blend with the colored background in the header
     */
    backgroundImage?: ImageSourcePropType;

    /**
     * Background image opacity to help blend background image into the background color
     *
     * @default: 0.3
     */
    backgroundOpacity?: number;

    /** Callback to execute when the drawer header is pressed */
    onPress?: () => void;

    /**
     * Color of the icon and header texts
     *
     * @default: Icon: theme.colors.onSurface
     * Title: theme.colors.primary
     * Subtitle: theme.colors.onSurfaceVariant
     */
    fontColor?: string;

    /** Icon  to the left of the header text */
    icon?: IconSource;

    /** Callback to execute when the icon is pressed */
    onIconPress?: () => void;

    /** First line of text in the header */
    title?: string;

    /** Second line of text in the header */
    subtitle?: string;

    /** Custom content to use in place of the header title / subtitle */
    titleContent?: ReactNode;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        headerContainer?: StyleProp<ViewStyle>;
        backgroundImageWrapper?: StyleProp<ViewStyle>;
        backgroundImage?: StyleProp<ImageStyle>;
        content?: StyleProp<ViewStyle>;
        textContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        icon?: StyleProp<ViewStyle>;
    };
    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

/**
 * [DrawerHeader](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--drawer) component
 *
 * The DrawerHeader holds the content at the top of your navigation Drawer. You can supply a title and subtitle to
 * use the default styles, or you can supply your own custom titleContent to render. This section will always be pinned
 * at the top of the Drawer.
 */
export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const {
        title,
        subtitle,
        titleContent,
        backgroundImage,
        fontColor,
        icon,
        onPress,
        onIconPress,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        backgroundOpacity = 0.3,
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useExtendedTheme(themeOverride);
    const insets = useSafeAreaInsets();
    const { REGULAR_HEIGHT } = useHeaderDimensions();
    const { disableScaling } = useFontScaleSettings();
    const fontScale = useFontScale();
    const defaultStyles = makeStyles(props, theme, insets, REGULAR_HEIGHT, fontScale);

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            return (
                <View style={[defaultStyles.icon, styles.icon]}>
                    <TouchableOpacity
                        testID={'drawer-header-navigation'}
                        onPress={onIconPress}
                        style={{ padding: 8, marginLeft: -8 }}
                        disabled={!onIconPress}
                    >
                        <Icon
                            source={icon}
                            size={24}
                            color={fontColor || theme.colors.onSurface}
                            allowFontScaling={!disableScaling}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }, [defaultStyles, styles, icon, fontColor, onIconPress]);

    const getHeaderContent = useCallback(
        (): ReactNode =>
            titleContent || (
                <View style={[defaultStyles.textContent, styles.textContent]}>
                    {title && (
                        <Text variant={'headlineSmall'} style={[defaultStyles.title, styles.title]} numberOfLines={1}>
                            {title}
                        </Text>
                    )}
                    {subtitle && (
                        <Text
                            variant={'bodyMedium'}
                            style={[defaultStyles.subtitle, styles.subtitle]}
                            numberOfLines={1}
                        >
                            {subtitle}
                        </Text>
                    )}
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
                        style={[defaultStyles.backgroundImage as ImageStyle, styles.backgroundImage]}
                    />
                </View>
            );
        }
    }, [backgroundImage, defaultStyles, styles]);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
                {getBackgroundImage()}
                <View style={[defaultStyles.content, styles.content, { paddingLeft: icon ? 0 : 16 }]}>
                    {icon && getIcon()}
                    {getHeaderContent()}
                </View>
                <Divider />
            </View>
        </TouchableWithoutFeedback>
    );
};

DrawerHeader.displayName = 'DrawerHeader';
