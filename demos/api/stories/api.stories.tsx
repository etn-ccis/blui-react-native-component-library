import { storiesOf } from '@storybook/react';
import { docFn, getReadMe } from './utils';

export const stories = storiesOf('Components/Documentation', module);

stories.add('Channel Value', docFn, { notes: { markdown: getReadMe('ChannelValue.md') } });
stories.add('Chip', docFn, { notes: { markdown: getReadMe('Chip.md') } });
stories.add('Collapsible Header Layout', docFn, { notes: { markdown: getReadMe('CollapsibleHeaderLayout.md') } });
stories.add('Drawer', docFn, { notes: { markdown: getReadMe('Drawer.md') } });
stories.add('Empty State', docFn, { notes: { markdown: getReadMe('EmptyState.md') } });
stories.add('Grade', docFn, { notes: { markdown: getReadMe('Grade.md') } });
stories.add('Header', docFn, { notes: { markdown: getReadMe('Header.md') } });
stories.add('Hero', docFn, { notes: { markdown: getReadMe('Hero.md') } });
stories.add('Icons', docFn, { notes: { markdown: getReadMe('Icons.md') } });
stories.add('Icon Switch', docFn, { notes: { markdown: getReadMe('IconSwitch.md') } });
stories.add('Info List Item', docFn, { notes: { markdown: getReadMe('InfoListItem.md') } });
stories.add('List Item Tag', docFn, { notes: { markdown: getReadMe('ListItemTag.md') } });
stories.add('Mobile Stepper', docFn, { notes: { markdown: getReadMe('MobileStepper.md') } });
stories.add('Overline', docFn, { notes: { markdown: getReadMe('Overline.md') } });
stories.add('Score Card', docFn, { notes: { markdown: getReadMe('ScoreCard.md') } });
stories.add('Spacer', docFn, { notes: { markdown: getReadMe('Spacer.md') } });
stories.add('User Menu', docFn, { notes: { markdown: getReadMe('UserMenu.md') } });
