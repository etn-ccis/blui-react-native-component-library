import {H6} from "@pxblue/react-native-components";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {NavigationDrawer} from "./navigation-drawer";
import {App} from "../App";
import * as Colors from '@pxblue/colors';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props: any): any => (
   <View style={{height: '100%'}}>
      <NavigationDrawer {...props} />
   </View>
    );

export const MainRouter = (): any => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="App" drawerStyle={{backgroundColor: 'transparent'}}
            drawerContent={(props): any => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="App" component={App} />
        </Drawer.Navigator>
    </NavigationContainer>
);
