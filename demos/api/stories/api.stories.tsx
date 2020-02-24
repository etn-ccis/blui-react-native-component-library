import { storiesOf } from '@storybook/react';
import React from 'react';

export const stories = storiesOf('API/Documentation', module);

const autoNavToDocs = () => {
   const banner = window.top.document.getElementsByClassName('simplebar-content')[1];
   banner.setAttribute('style', 'display: none');
   // If we are currently on the 'Canvas' tab.
   if (window.top.location.href.includes('/story/')) {
      window.top.history.replaceState(null, '', window.top.location.href.replace('/story/', '/info/'));
      //@ts-ignore
      banner.children[0].children[0].children[0].children[1].click(); // click the Notes tab.
   }
};

const docFn = () => <>{autoNavToDocs()}</>;

stories.add('Channel Value', docFn, { notes: { markdown: require('./../../../docs/channelValue.md') } });
stories.add('Empty State', docFn, { notes: { markdown: require('./../../../docs/emptyState.md') } });
stories.add('Header', docFn, { notes: { markdown: require('./../../../docs/header.md') } });
stories.add('Hero', docFn, { notes: { markdown: require('./../../../docs/hero.md') } });
stories.add('Icon Wrapper', docFn, { notes: { markdown: require('./../../../docs/iconWrapper.md') } });
stories.add('Info List Item', docFn, { notes: { markdown: require('./../../../docs/infoListItem.md') } });
stories.add('Score Card', docFn, { notes: { markdown: require('./../../../docs/scoreCard.md') } });
stories.add('Theme', docFn, { notes: { markdown: require('./../../../docs/theme.md') } });
stories.add('Typography', docFn, { notes: { markdown: require('./../../../docs/typography.md') } });
