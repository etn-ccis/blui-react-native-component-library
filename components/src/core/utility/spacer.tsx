import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';

const spacerStyles = (props: SpacerProps): StyleSheet.NamedStyles<{ root: ViewStyle }> =>
    StyleSheet.create({
        root: {
            flexGrow: props.flex === undefined ? 1 : props.flex,
            flexShrink: props.flex === undefined ? 1 : props.flex,
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
    const { children, flex, height, styles = {}, width, ...otherViewProps } = props;
    const defaultStyles = spacerStyles(props);

    return (
        <View testID={'spacer-root'} style={[defaultStyles.root, styles.root]} {...otherViewProps}>
            {children}
        </View>
    );
};
