/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { appliedTheme } from '../.storybook/config';
import * as Colors from '@brightlayer-ui/colors';
/* eslint-disable @typescript-eslint/no-var-requires  */
const backgroundImage = require('../assets/circles-bg.svg') as string;
import { updateTitle } from '../src/utils';
const packageJSON = require('@brightlayer-ui/react-native-components/package.json') as { version: string };

export const stories = storiesOf('Intro/Overview', module);

const autoNavToStory = (): void => {
    const banner = window.top.document.getElementsByClassName('simplebar-content')[1];
    banner.setAttribute('style', 'display: unset');

    // If we are currently on the 'Notes' tab.
    if (window.top.location.href.includes('/info/')) {
        window.top.history.replaceState(null, '', window.top.location.href.replace('/info/', '/story/'));
        // Click the canvas button
        //@ts-ignore
        banner.children[0].children[0].children[0].children[0].click(); // eslint-disable-line @typescript-eslint/no-unsafe-call
    }
    updateTitle();
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            color: Colors.white[50],
            backgroundColor: appliedTheme.palette.primary.main,
            backgroundImage: `url(${backgroundImage})`,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundPosition: 'center',
            backgroundSize: '200%',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 8px',
        },
        icon: {
            textAlign: 'center',
        },
        description: {
            maxWidth: 900,
            padding: 20,
            paddingBottom: 0,
            fontWeight: 400,
        },
        link: {
            minWidth: 100,
            fontWeight: 600,
            borderColor: Colors.white[50],
            textTransform: 'none',
            '&:hover': {
                borderColor: Colors.white[50],
            },
        },
        githubIcon: {
            width: 24,
            height: 24,
            marginRight: 8,
            fill: Colors.white[50],
        },
        github: {
            fontWeight: 400,
            color: Colors.white[50],
        },
        buttons: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 36,
        },
    })
);

stories.addParameters({
    options: {
        showPanel: false,
    },
});

stories.add('Brightlayer UI React Native Components', () => {
    autoNavToStory();
    const classes = useStyles();
    const icon = require('../assets/brightlayer-ui-icon.svg') as string;
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.icon}>
                    <img src={icon} alt="brightlayer-ui-icon" className={'rotate'} />
                </div>
                <Typography variant={'h2'}>
                    Brightlayer <strong>UI</strong>
                </Typography>
                <Typography variant={'h4'}>React Native Component Library</Typography>
                {packageJSON.version && <Typography variant={'subtitle1'}>v{packageJSON.version}</Typography>}
                <Typography variant={'subtitle1'} className={classes.description}>
                    Learn about our Brightlayer UI components in the API section.
                </Typography>

                <div className={classes.buttons}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.link}
                        target={'_blank'}
                        href={'https://github.com/etn-ccis/blui-react-native-component-library'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={classes.githubIcon}>
                            <title>github</title>
                            <rect width="24" height="24" fill="none" />
                            <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
                        </svg>
                        <Typography variant={'subtitle2'} className={classes.github}>
                            Github
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
});
