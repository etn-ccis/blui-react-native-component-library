import {createStyles, makeStyles, Typography} from "@material-ui/core";
import {storiesOf} from '@storybook/react';
import React from 'react';
import {appliedTheme} from '../.storybook/config';
/* eslint-disable @typescript-eslint/no-var-requires  */
const backgroundImage = require('../assets/circles-bg.svg');

export const stories = storiesOf('Intro/Welcome', module);

const autoNavToStory = (): void => {
    const banner = window.top.document.getElementsByClassName('simplebar-content')[1];
    banner.setAttribute('style', 'display: unset');

    // If we are currently on the 'Notes' tab.
    if (window.top.location.href.includes('/info/')) {
        window.top.history.replaceState(null, '', window.top.location.href.replace('/info/', '/story/'));
        //@ts-ignore
        banner.children[0].children[0].children[0].children[0].click(); // Click the 'Canvas' button
    }
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            //@ts-ignore
            color: appliedTheme.palette.secondary[50],
            //@ts-ignore
            backgroundColor: appliedTheme.palette.primary[500],
            backgroundImage: `url(${backgroundImage})`,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        },
        icon: {
            textAlign: 'center'
        }
    })
);

stories.addParameters({
    options: {
        showPanel: false,
    },
});

stories.add('to pxblue', () => {
    autoNavToStory();
    const classes = useStyles();
    /* eslint-disable @typescript-eslint/no-var-requires  */
    const icon = require('../assets/pxb-icon.svg');
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.icon}>
                    <img src={icon} alt="pxb-icon" className={'rotate'} />
                </div>
                <Typography variant={'h1'}>Power Xpert <strong>Blue</strong></Typography>
                <Typography variant={'h2'}>React Native Component Library</Typography>
            </div>
        </div>
    )
});
