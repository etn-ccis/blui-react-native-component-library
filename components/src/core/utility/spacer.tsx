import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';

const spacerStyles = (props: SpacerProps): StyleSheet.NamedStyles<{ root: ViewStyle }> =>
    StyleSheet.create({
        root: {
            flexGrow: props.flex,
            flexShrink: props.flex,
            flexBasis: props.flex === 0 ? 'auto' : 0,
            height: props.height || 'auto',
            width: props.width || 'auto',
        },
    });

export type SpacerProps = ViewProps & {
    /* Flex grow/shrink value for flex layouts */
    flex?: number;

    /** Height (in px) for static layouts */
    height?: number;

    /** Width (in px) for static layouts */
    width?: number;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
    };
};

export const Spacer: React.FC<SpacerProps> = (props) => {
    const {
        children,
        style,
        styles = {},
        // ignore unused vars so that we can do prop transferring to the root element
        /* eslint-disable @typescript-eslint/no-unused-vars */
        flex,
        height,
        width,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...otherViewProps
    } = props;
    const defaultStyles = spacerStyles(props);

    return (
        <View testID={'spacer-root'} style={[defaultStyles.root, styles.root, style]} {...otherViewProps}>
            {children}
        </View>
    );
};

Spacer.displayName = 'Spacer';
Spacer.defaultProps = {
    flex: 1,
};
