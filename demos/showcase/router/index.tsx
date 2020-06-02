import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavigationDrawer } from './navigation-drawer';
import { App } from '../App';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

export const MainRouter = (): any => (
    <NavigationContainer>
        <Drawer.Navigator
            initialRouteName="App"
            drawerStyle={{ backgroundColor: 'transparent' }}
            drawerContent={(props): any => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="App" component={App} />
        </Drawer.Navigator>
    </NavigationContainer>
);
