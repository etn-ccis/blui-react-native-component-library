import {withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import React from 'react';

export const stories = storiesOf('Channel Value', module);
stories.addDecorator(withKnobs);
stories.addParameters({
    notes: { markdown: require('./../../../docs/channelValue.md') },
});

stories.add('with value', () => (
       <div>TODO</div>
));
stories.add('with units', () => (
   <div>TODO</div>
));
stories.add('with icon', () => (
   <div>TODO</div>
));
stories.add('with extraLarge font size', () => (
   <div>TODO</div>
));
stories.add('with all props', () => (
    <div>TODO</div>
));
