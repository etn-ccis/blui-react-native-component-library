import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {NavigationDrawer} from "./navigation-drawer";
import {App} from "../App";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
        <DrawerContentScrollView {...props}>
            <NavigationDrawer />
            <DrawerItemList {...props} />
            <DrawerItem label="Help" onPress={() => alert('Link to help')} />
        </DrawerContentScrollView>
    );

export const MainRouter = () => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="App"
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="App" component={App} />
        </Drawer.Navigator>
    </NavigationContainer>
);
