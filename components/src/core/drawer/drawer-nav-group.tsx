import React, {ReactNode} from 'react';
import {Subtitle} from '../typography';
import {StyleSheet, View} from "react-native";
import {DrawerNavItem, NavItem} from './drawer-nav-item';
import {inheritProps, NavGroupInheritableProps} from "./inheritable-types";
import {Divider} from "react-native-elements";

export type DrawerNavGroupProps = {
    // internal API
    backgroundColor?: string;

    // List of navigation items to render
    items: NavItem[];

    // Text to display in the group header
    title?: string;

    // Custom element, substitute for title
    titleContent?: ReactNode;
} & NavGroupInheritableProps;

const styles = StyleSheet.create({
    subtitle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        height: 52,
        lineHeight: 36
    }
});

export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const { title, titleContent, items } = props;
   return (
        <View>
            {titleContent}
            {!titleContent && title &&
                <View>
                    <Divider/>
                    <Subtitle style={styles.subtitle}>{title}</Subtitle>
                    <Divider/>
                </View>
            }
            {items.map((item: NavItem, index: number) => (
                <DrawerNavItem
                    depth={0}
                    expanded={false}
                    navItem={inheritProps(props, item) as NavItem}
                    key={`nav${index}`}
                    navGroupProps={props} />)
            )}
        </View>
   );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
DrawerNavGroup.defaultProps = {
    items: []
};
