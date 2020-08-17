import React from 'react';
import { ScrollView, StyleSheet, ScrollViewProps } from 'react-native';
import { DrawerNavGroup } from './drawer-nav-group';
import { DrawerInheritableProps, inheritDrawerProps } from './inheritable-types';

const defaultStyles = StyleSheet.create({
    root: {},
});
export type DrawerBodyProps = ScrollViewProps & DrawerInheritableProps;
export const DrawerBody: React.FC<DrawerBodyProps> = (props) => {
    const { children, style, ...scrollProps } = props;
    const childrenArray = React.Children.toArray(children);
    return (
        <ScrollView style={[defaultStyles.root, style]} {...scrollProps}>
            {childrenArray.map((child: any, index: number) => {
                if (!child) return null;
                if (child.type && child.type.displayName !== 'DrawerNavGroup') return child;
                return (
                    <DrawerNavGroup
                        {...inheritDrawerProps(props, child.props)}
                        {...child.props}
                        key={`NavGroup_${index}`}
                    />
                );
            })}
        </ScrollView>
    );
};

DrawerBody.displayName = 'DrawerBody';
