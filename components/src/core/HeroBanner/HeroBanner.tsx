import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ViewProps } from 'react-native';
import { Divider } from 'react-native-paper';

const defaultStyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export type HeroBannerProps = ViewProps & {
    /**
     * Whether to show a dividing line below the banner
     *
     * @default: false
     */
    divider?: boolean;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        divider?: StyleProp<ViewStyle>;
    };
};

/**
 * [HeroBanner](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero) component
 *
 * The HeroBanner is a wrapper component that is used to properly space out
 * [Hero](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero) component children in a flex container row.
 */
export const HeroBanner: React.FC<HeroBannerProps> = (props) => {
    const { divider, children, styles = {}, style, ...viewProps } = props;
    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <React.Fragment>
            <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
                {childrenArray}
                {divider && (
                    <View style={defaultStyles.divider}>
                        <Divider />
                    </View>
                )}
            </View>
        </React.Fragment>
    );
};
