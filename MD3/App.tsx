/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Avatar, Button, Card, Text, Provider as ThemeProvider /*, useTheme */ } from 'react-native-paper';

import { ChannelValue } from './components/ChannelValue';
import { MD3BluiLightTheme } from './md3-themes';

const styles = (): any =>
    StyleSheet.create({
        demoCard: {
            margin: 8,
        },
        demoCardContent: {
            padding: 16,
        },
    });

const App = (): JSX.Element => {
    // const theme = useTheme();
    const defaultStyles = styles();

    // eslint-disable-next-line no-console
    // console.log(theme.colors);

    return (
        <ThemeProvider theme={MD3BluiLightTheme}>
            <SafeAreaProvider>
                <Appbar.Header>
                    <Appbar.BackAction onPress={(): void => {}} />
                    <Appbar.Content title="Appbar" />
                    <Appbar.Action icon="calendar" onPress={(): void => {}} />
                    <Appbar.Action icon="magnify" onPress={(): void => {}} />
                </Appbar.Header>
                <SafeAreaView>
                    <ScrollView>
                        <Card style={defaultStyles.demoCard}>
                            <Card.Title title="ActivityIndicator" />
                            <Card.Content style={defaultStyles.demoCardContent}>
                                <ActivityIndicator animating={true} />
                            </Card.Content>
                        </Card>
                        <Card style={[defaultStyles.demoCard]}>
                            <Card.Title title="ChannelValue" />
                            <Card.Content style={[defaultStyles.demoCardContent, { paddingBottom: 8 }]}>
                                <ChannelValue value="85" units="kWh" unitSpace="hide" />
                                <ChannelValue value="85" units="kWh" unitSpace="show" />
                                <ChannelValue value="97" units="°F" icon={{ name: 'settings' }} />
                                <ChannelValue
                                    value="32"
                                    units="°C"
                                    icon={{ family: 'material-community', name: 'chart-pie' }}
                                />
                                <ChannelValue
                                    value="100"
                                    units="%"
                                    icon={{ family: 'brightlayer-ui', name: 'device' }}
                                />
                                <ChannelValue
                                    value="13.62"
                                    units="$"
                                    prefix
                                    icon={{ family: 'material-community', name: 'home' }}
                                    iconColor="red"
                                />
                            </Card.Content>
                        </Card>
                        <Card style={defaultStyles.demoCard}>
                            <Card.Title
                                title="Card Title"
                                subtitle="Card Subtitle"
                                left={(props: any): JSX.Element => <Avatar.Icon {...props} icon="folder" />}
                            />
                            <Card.Content style={defaultStyles.demoCardContent}>
                                <Text variant="titleLarge">Card title</Text>
                                <Text variant="bodyMedium">Card content</Text>
                            </Card.Content>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                            </Card.Actions>
                        </Card>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

export default App;
