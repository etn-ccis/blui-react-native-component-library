import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';

const spacerStyles = (props: SpacerProps, flex: number): StyleSheet.NamedStyles<{ root: ViewStyle }> =>
    StyleSheet.create({
        root: {
            flex: flex,
            height: props.height || 'auto',
            width: props.width || 'auto',
        },
    });

export type SpacerProps = ViewProps & {
    /** Flex grow/shrink value for use in flex layouts */
    flex?: number;

    /** Height (in dp) for static layouts */
    height?: number;

    /** Width (in dp) for static layouts */
    width?: number;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
    };
};

/**
 * [Spacer](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--spacer) component
 *
 * This is a helpful utility component for adding spacer elements
 * when working within flexbox containers. You can give it a flexible
 * or a fixed size.
 */
export const Spacer: React.FC<SpacerProps> = (props) => {
    const {
        children,
        style,
        styles = {},
        // ignore unused vars so that we can do prop transferring to the root element
        /* eslint-disable @typescript-eslint/no-unused-vars */
        flex = 1,
        height,
        width,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...otherViewProps
    } = props;
    const defaultStyles = spacerStyles(props, flex);

    return (
        <View testID={'spacer-root'} style={[defaultStyles.root, styles.root, style]} {...otherViewProps}>
            {children}
        </View>
    );
};

Spacer.displayName = 'Spacer';
