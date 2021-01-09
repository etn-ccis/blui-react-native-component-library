import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import { MobileStepper } from '@pxblue/react-native-components';
import { action } from '@storybook/addon-actions';
import { Button } from 'react-native-paper';

const steps = number('Steps', 5, { range: true, min: 2, max: 6, step: 1 });

const goBack = action('Back Button Clicked');
const goNext = action('Next Button Clicked');

const showBackButton = boolean('Show Back Button', true);
const showNextButton = boolean('Show Next Button', true);

let activeStep = 0;

storiesOf('MobileStepper', module)
  .addDecorator(withKnobs)
  .add(
    'with full config',
    () => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MobileStepper
          activeStep={activeStep}
          steps={steps}
          leftButton={
              // @TODO: get show back button to work
              <View style={{ flex: 1, backfaceVisibility: boolean('Show Back Button', true) ? 'visible' : 'hidden' }}>
                  <Button
                      style={{ width: 100, alignSelf: 'flex-start' }}
                      disabled={activeStep === 0}
                      onPress={(): void => {
                        activeStep--;
                        // @TODO: get goBack to trigger without having to switch tabs
                        goBack();
                      }}
                      mode="outlined"
                  >Back</Button>
              </View>
          }
          rightButton={
              // @TODO: get show next button to work
              <View style={{ flex: 1, backfaceVisibility: boolean('Show Next Button', true) ? 'visible' : 'hidden' }}>
              <Button
                  style={{ width: 100, alignSelf: 'flex-end' }}
                  disabled={activeStep === steps - 1}
                  onPress={(): void => {
                    activeStep++;
                    // @TODO: get goNext to trigger without having to switch tabs
                    goNext();
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