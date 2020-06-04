import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ViewProps } from 'react-native';
import { Divider } from 'react-native-paper';

const defaultStyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export type HeroBannerProps = ViewProps & {
    /** Toggles a bottom divider */
    divider?: boolean;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        divider?: StyleProp<ViewStyle>;
    };
};

/**
 * HeroBanner component
 *
 * Wrapper for Hero components that neatly spaces
 * and displays them in a row.
 */
export const HeroBanner: React.FC<HeroBannerProps> = (props) => {
    const { divider, children, styles = {}, style, ...viewProps } = props;
    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <React.Fragment>
            <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
                {childrenArray}
            </View>
            {divider && <Divider style={styles.divider} />}
        </React.Fragment>
    );
};
