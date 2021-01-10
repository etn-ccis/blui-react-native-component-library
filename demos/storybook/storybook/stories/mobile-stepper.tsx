import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { MobileStepper } from '@pxblue/react-native-components';
import { Button } from 'react-native-paper';

  storiesOf('MobileStepper', module)
  .addDecorator(withKnobs)
  .add(
    'with full config',
    () => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MobileStepper
          activeStep={1}
          steps={number('Steps', 5, { range: true, min: 2, max: 6, step: 1 })}
          leftButton={
              <View style={{ flex: 1}}>
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
              <View style={{ flex: 1 }}>
              <Button
                  style={{ width: 100, alignSelf: 'flex-end' }}
                  onPress={(): void => {
                    // Do nothing
                  }}
                  mode="contained"
              >Next</Button>
          </View>
          }
          variant={select('Variant', ['dots', 'text', 'progress'], 'dots')}>
        </MobileStepper>
      </View>
    )
  );