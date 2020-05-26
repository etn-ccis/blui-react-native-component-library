import React from 'react';
import {View} from "react-native";
import {DrawerNavGroup} from "./drawer-nav-group";

export const DrawerBody: React.FC<any> = (props) => {
    const children = React.Children.toArray(props.children);
    return (
        <View>
            {children.map((child: any, index: number) => {
                console.log(child);
                if (!child) {
                    return null;
                }

                if (child.type && child.type.displayName !== 'DrawerNavGroup') return child;
                const groupProps: any = child.props;
                return (
                    <DrawerNavGroup {...groupProps} key={`NavGroup_${index}`}/>
                )
            })}
            </View>
        );
};


DrawerBody.displayName = 'DrawerBody';
