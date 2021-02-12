/* eslint-disable @typescript-eslint/ban-ts-comment */
import { storiesOf } from '@storybook/react';
import React from 'react';
import { updateTitle } from '../src/utils';

export const stories = storiesOf('Components/Documentation', module);

const autoNavToDocs = (): void => {
    const banner = window.top.document.getElementsByClassName('simplebar-content')[1];
    banner.setAttribute('style', 'display: none');
    // If we are currently on the 'Canvas' tab.
    if (window.top.location.href.includes('/story/')) {
        window.top.history.replaceState(null, '', window.top.location.href.replace('/story/', '/info/'));

        // click the notes tab
        // @ts-ignore
        banner.children[0].children[0].children[0].children[1].click(); // eslint-disable-line @typescript-eslint/no-unsafe-call
    }
    updateTitle();
};

const getReadMe = (name: string): { default: string } => {
    const md: { default: string } = require(`./../../../docs/${name}`) as { default: string };

    // Locate all relative links that use href syntax and replace them with absolute URLs.
    md.default = md.default.replace(/\(.\/.*md\)/g, (substring: string) => {
        // Example: http://localhost:6006/?path=/info/components-hero--get-read-me-story
        const root = window.top.location.href.split('/?')[0];
        const path = `?path=/info/components-documentation-`;

        // Get component from link. (./HeroBanner.md) => HeroBanner
        const component = substring.split('/')[1].split('.')[0];
        // Storybook uses dash-limited-syntax in their URL schema.
        const dashed = component.replace(/\.?([A-Z])/g, (x) => `-${x.toLowerCase()}`);
        return `(${root}${path}${dashed})`;
    });
    return md;
};

const docFn = (): JSX.Element => <>{autoNavToDocs()}</>;

stories.add('Channel Value', docFn, { notes: { markdown: getReadMe('ChannelValue.md') } });
stories.add('Empty State', docFn, { notes: { markdown: getReadMe('EmptyState.md') } });
stories.add('Drawer', docFn, { notes: { markdown: getReadMe('Drawer.md') } });
stories.add('Header', docFn, { notes: { markdown: getReadMe('Header.md') } });
stories.add('Hero', docFn, { notes: { markdown: getReadMe('Hero.md') } });
stories.add('Icon Wrapper', docFn, { notes: { markdown: getReadMe('IconWrapper.md') } });
stories.add('Info List Item', docFn, { notes: { markdown: getReadMe('InfoListItem.md') } });
stories.add('List Item Tag', docFn, { notes: { markdown: getReadMe('ListItemTag.md') } });
stories.add('MobileStepper', docFn, { notes: { markdown: getReadMe('MobileStepper.md') } });
stories.add('Score Card', docFn, { notes: { markdown: getReadMe('ScoreCard.md') } });
stories.add('Spacer', docFn, { notes: { markdown: getReadMe('Spacer.md') } });
stories.add('Typography', docFn, { notes: { markdown: getReadMe('Typography.md') } });
stories.add('UserMenu', docFn, { notes: { markdown: getReadMe('UserMenu.md') } });
