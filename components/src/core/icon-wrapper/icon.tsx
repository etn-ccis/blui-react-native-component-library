import * as React from 'react';
import { Image, I18nManager, Platform, ImageSourcePropType } from 'react-native';
import { IconComponentProps, IconFamily, IconSource, IconSourceBase } from '../__types__';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import PXBIcon from '@pxblue/react-native-vector-icons';
import { Body1 } from '../typography';
import { useTheme } from 'react-native-paper';

type IconProps = IconComponentProps & {
    source: IconSource;
    /**
     * @optional
     */
    theme?: ReactNativePaper.Theme;
};

const isImageSource = (source: any): boolean =>
    // source is an object with uri
    (typeof source === 'object' &&
        source !== null &&
        Object.prototype.hasOwnProperty.call(source, 'uri') &&
        typeof source.uri === 'string') ||
    // source is a module, e.g. - require('image')
    typeof source === 'number' ||
    // image url on web
    (Platform.OS === 'web' &&
        typeof source === 'string' &&
        (source.startsWith('data:image') || /\.(bmp|jpg|jpeg|png|gif|svg)$/.test(source)));

const isIconFamily = (source: JSX.Element | IconFamily | IconSourceBase): source is IconFamily =>
    (source as IconFamily).name !== undefined;

/**
 * Icon component
 *
 * The Icon component is an internal utility component used to render icons inside of other components.
 * It standardizes the implementation of the icon and handles all of the different ways
 * to specify the icon without having to duplicate this logic inside of every component that
 * utilizes icons.
 */
export const Icon: React.FC<IconProps> = (props) => {
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useTheme(themeOverride);
    const { color = theme.colors.text, size = 24, allowFontScaling = true, source, ...rest } = otherProps;
    const deviceDirection = I18nManager.isRTL ? 'rtl' : 'ltr';
    // const fontScale = scale ? PixelRatio.getFontScale() : 1;

    // const flipIcon = (directionProp === 'auto' && deviceDirection === 'rtl') || directionProp === 'rtl';
    const flipIconStyle = {
        transform: [{ scaleX: -1 }],
    };

    // JSX Element
    if (React.isValidElement(source)) {
        return source;
    }

    // IconFamily Object
    if (typeof source === 'object' && isIconFamily(source)) {
        const scale = source.allowFontScaling === undefined ? allowFontScaling : source.allowFontScaling;
        const flip = (source.direction !== 'ltr' && deviceDirection === 'rtl') || source.direction === 'rtl';
        switch (source.family) {
            case 'material-community':
                return (
                    <MatCommunity
                        name={source.name}
                        size={size}
                        allowFontScaling={scale}
                        color={color}
                        style={flip ? flipIconStyle : {}}
                    />
                );
            case 'pxblue':
                return (
                    <PXBIcon
                        name={source.name}
                        size={size}
                        allowFontScaling={scale}
                        color={color}
                        style={flip ? flipIconStyle : {}}
                    />
                );
            case 'material':
            default:
                return (
                    <MatIcon
                        name={source.name}
                        size={size}
                        allowFontScaling={scale}
                        color={color}
                        style={flip ? flipIconStyle : {}}
                    />
                );
        }
    }

    // Function component or wrapIcon output
    if (typeof source === 'function') {
        const Component = source;
        return <Component size={size} color={color} direction={deviceDirection} allowFontScaling={allowFontScaling} />;
    }

    // Image source
    if (isImageSource(source)) {
        return (
            <Image
                {...rest}
                source={source as ImageSourcePropType}
                style={[
                    {
                        width: size,
                        height: size,
                        // tintColor: color,
                        resizeMode: 'contain',
                    },
                ]}
                accessibilityElementsHidden
                importantForAccessibility={'no-hide-descendants'}
            />
        );
    }

    // String
    if (typeof source === 'string') {
        return <Body1 style={[{ fontSize: size, color: color }]}>{source}</Body1>;
    }

    return null;
};
