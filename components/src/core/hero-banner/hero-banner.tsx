import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import * as Colors from '@pxblue/colors';

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.black['50'],
    },
});

export type HeroBannerProps = {
    /** Toggles a bottom divider */
    divider?: boolean;

    /** Max number of children to show */
    limit?: number;

    /** The children components to render in the HeroBanner */
    children?: React.ReactElement | React.ReactElement[];

    /** Style configuration for the wrapper View */
    style?: StyleProp<ViewStyle>;
};

/**
 * HeroBanner component
 *
 * Wrapper for 1-4 Hero components that neatly spaces
 * and displays them in a row.
 */
export const HeroBanner: React.FC<HeroBannerProps> = (props) => {
    const { divider, children, limit, style } = props;
    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <React.Fragment>
            <View style={[styles.banner, style]}>
                {!!children && childrenArray.slice(0, limit || 4).map((child: React.ReactNode) => child)}
            </View>
            {divider && <View style={styles.divider} />}
        </React.Fragment>
    );
};
