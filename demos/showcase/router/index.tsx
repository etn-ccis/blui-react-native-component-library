import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import {NavigationDrawer} from "./navigation-drawer";
import {App} from "../App";

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props: any): any => (
        <DrawerContentScrollView
            style={{marginTop: -5, minHeight: '100%', backgroundColor: 'red'}} >
            <NavigationDrawer {...props} />
        </DrawerContentScrollView>
    );

export const MainRouter = (): any => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="App"
            drawerContent={(props): any => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="App" component={App} />
        </Drawer.Navigator>
    </NavigationContainer>
);
