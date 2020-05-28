import React from 'react';
import {ScrollView} from "react-native";
import {DrawerNavGroup} from "./drawer-nav-group";
import {DrawerInheritableProps, inheritDrawerProps} from "./inheritable-types";

export const DrawerBody: React.FC<DrawerInheritableProps> = (props) => {
    const children = React.Children.toArray(props.children);
    return (
        <ScrollView>
            {children.map((child: any, index: number) => {
                if (!child) {
                    return null;
                }

                if (child.type && child.type.displayName !== 'DrawerNavGroup') return child;
                return (
                    <DrawerNavGroup {...inheritDrawerProps(props, child.props)} {...child.props} key={`NavGroup_${index}`}/>
                )
            })}
            </ScrollView>
        );
};


DrawerBody.displayName = 'DrawerBody';
