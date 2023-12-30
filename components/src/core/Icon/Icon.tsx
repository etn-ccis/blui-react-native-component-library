import * as React from 'react';
import { Image, I18nManager, Platform, ImageSourcePropType } from 'react-native';
import { IconComponentProps, IconFamily, IconSource, IconSourceBase } from '../__types__';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import BLUIIcon from '@brightlayer-ui/react-native-vector-icons';
import { Text } from 'react-native-paper';
import { useFontScaleSettings } from '../__contexts__/font-scale-context';
import { calculateHeight } from '../Utility/shared';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

export type IconProps = IconComponentProps & {
    /** An object to specify the source of the icon */
    source: IconSource;
    /** Theme value overrides specific to this component. */
    /**
     * @optional
     */
    theme?: ExtendedTheme;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const theme = useExtendedTheme(themeOverride);
    const { maxScale, disableScaling } = useFontScaleSettings();
    const {
        color = theme.colors.onSurface,
        size = 24,
        allowFontScaling = !disableScaling,
        source,
        ...rest
    } = otherProps;
    const deviceDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

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
        const flip = (source.direction === 'auto' && deviceDirection === 'rtl') || source.direction === 'rtl';
        switch (source.family) {
            case 'material-community':
                return (
                    <MatCommunity
                        name={source.name}
                        size={size}
                        allowFontScaling={scale}
                        color={color}
                        style={flip ? flipIconStyle : {}}
                        maxFontSizeMultiplier={maxScale}
                    />
                );
            case 'brightlayer-ui':
                return (
                    <BLUIIcon
                        name={source.name}
                        size={size}
                        allowFontScaling={scale}
                        color={color}
                        style={flip ? flipIconStyle : {}}
                        maxFontSizeMultiplier={maxScale}
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
                        maxFontSizeMultiplier={maxScale}
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
        return (
            <Text
                variant={'bodyMedium'}
                style={[
                    {
                        fontSize: size,
                        color: color,
                        lineHeight: calculateHeight(size),
                    },
                ]}
            >
                {source}
            </Text>
        );
    }

    return null;
};
