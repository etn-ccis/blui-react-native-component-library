import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import { MobileStepper } from '@pxblue/react-native-components';
import { Button } from 'react-native-paper';

storiesOf('MobileStepper', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MobileStepper
                activeStep={number('Active step', 0, { range: true, min: 0, max: 5, step: 1 })}
                steps={number('Steps', 5, { range: true, min: 2, max: 6, step: 1 })}
                leftButton={
                    <View style={{ flex: 1 }}>
                        <Button
                            style={{ width: 100, alignSelf: 'flex-start' }}
                            onPress={(): void => {
                                // do nothing
                            }}
                            mode="outlined"
                        >
                            Back
                        </Button>
                    </View>
                }
                rightButton={
                    <View style={{ flex: 1 }}>
                        <Button
                            style={{ width: 100, alignSelf: 'flex-end' }}
                            onPress={(): void => {
                                // Do nothing
                            }}
                            mode="contained"
                        >
                            Next
                        </Button>
                    </View>
                }
            ></MobileStepper>
        </View>
    ))
    .add('with variant', () => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MobileStepper
              activeStep={0}
              steps={6}
              leftButton={
                  <View style={{ flex: 1 }}>
                      <Button
                          style={{ width: 100, alignSelf: 'flex-start' }}
                          onPress={(): void => {
                              // do nothing
                          }}
                          mode="outlined"
                      >
                          Back
                      </Button>
                  </View>
              }
              rightButton={
                  <View style={{ flex: 1 }}>
                      <Button
                          style={{ width: 100, alignSelf: 'flex-end' }}
                          onPress={(): void => {
                              // Do nothing
                          }}
                          mode="contained"
                      >
                          Next
                      </Button>
                  </View>
              }
              variant={select('Variant', ['dots', 'text', 'progress'], 'dots')}
          ></MobileStepper>
      </View>
  ))
    .add('with full config', () => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MobileStepper
              activeStep={number('Active step', 0, { range: true, min: 0, max: 5, step: 1 })}
              steps={number('Steps', 5, { range: true, min: 2, max: 6, step: 1 })}
              leftButton={
                <View style={{ flex: 1, opacity: boolean('Show Back Button', true) ? 1 : 0 }}>
                    <Button
                        style={{ width: 100, alignSelf: 'flex-start' }}
                        onPress={(): void => {
                          // do nothing
                        }}
                        mode="outlined"
                    >Back</Button>
                </View>
            }
            rightButton={
                <View style={{ flex: 1, opacity: boolean('Show Next Button', true) ? 1 : 0 }}>
                <Button
                    style={{ width: 100, alignSelf: 'flex-end' }}
                    onPress={(): void => {
                      // do nothing
                    }}
                    mode="contained"
                >Next</Button>
            </View>
            }
              variant={select('Variant', ['dots', 'text', 'progress'], 'dots')}
          ></MobileStepper>
      </View>
  ));