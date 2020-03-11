import { storiesOf } from '@storybook/react';
import React from 'react';
import { updateTitle } from '../src/utils';

export const stories = storiesOf('API/Documentation', module);

const autoNavToDocs = (): void => {
    const banner = window.top.document.getElementsByClassName('simplebar-content')[1];
    banner.setAttribute('style', 'display: none');
    // If we are currently on the 'Canvas' tab.
    if (window.top.location.href.includes('/story/')) {
        window.top.history.replaceState(null, '', window.top.location.href.replace('/story/', '/info/'));
        //@ts-ignore
        banner.children[0].children[0].children[0].children[1].click(); // click the Notes tab.
    }
    updateTitle();
};

const getReadMe = (name: string): any => {
    const md = require(`./../../../docs/${name}`);

    // Locate all relative links that use href syntax and replace them with absolute URLs.
    md.default = (md.default).replace(/\(.\/.*md\)/g, (substring: string) => {
        // Example: http://localhost:6006/?path=/info/components-hero--get-read-me-story
        const root = window.top.location.href.split('/?')[0];
        const path = `?path=/info/api-documentation--`;

        // Get component from link. (./HeroBanner.md) => HeroBanner
        const component = substring.split('/')[1].split('.')[0];
        // Storybook uses dash-limited-syntax in their URL schema.
        const dashed = component.replace(/\.?([A-Z])/g, (x) => `-${x.toLowerCase()}`);
        return `(${root}${path}${dashed})`;
    });
    return md;
};

const docFn = (): JSX.Element => <>{autoNavToDocs()}</>;

stories.add('Channel Value', docFn, { notes: { markdown: getReadMe('channelValue.md') } });
stories.add('Empty State', docFn, { notes: { markdown: getReadMe('emptyState.md') } });
stories.add('Header', docFn, { notes: { markdown: getReadMe('header.md') } });
stories.add('Hero', docFn, { notes: { markdown: getReadMe('hero.md') } });
stories.add('Icon Wrapper', docFn, { notes: { markdown: getReadMe('iconWrapper.md') } });
stories.add('Info List Item', docFn, { notes: { markdown: getReadMe('infoListItem.md') } });
stories.add('Score Card', docFn, { notes: { markdown: getReadMe('scoreCard.md') } });
stories.add('Theme', docFn, { notes: { markdown: getReadMe('theme.md') } });
stories.add('Typography', docFn, { notes: { markdown: getReadMe('typography.md') } });
