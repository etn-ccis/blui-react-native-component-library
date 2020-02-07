import { Typography, TypographyProps } from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export type ListItemTagProps = {
    /* The string label of the tag. */
    label: string;

    /* Color of the label. Default is white['50']. */
    fontColor?: string;

    /* Color of the label background. Default is blue['500'] */
    backgroundColor?: string;
} & TypographyProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            fontWeight: 'bold',
            letterSpacing: 1,
            borderRadius: 2,
            padding: 0,
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            lineHeight: 'inherit',
            color: theme.palette.primary.contrastText,
        },
    })
);

export const ListItemTag: React.FC<ListItemTagProps> = (props: ListItemTagProps): JSX.Element => {
    const {
        classes: userClasses = {},
        label,
        fontColor,
        backgroundColor,
        variant,
        style,
        noWrap,
        display,
        ...other
    } = props;
    const theme = useTheme();
    const defaultClasses = useStyles(theme);
    const { root: rootUserClass, ...otherUserClasses } = userClasses;
    return (
        <Typography
            classes={{ root: clsx(defaultClasses.root, rootUserClass), ...otherUserClasses }}
            style={Object.assign(
                {
                    color: fontColor,
                    backgroundColor: backgroundColor,
                    cursor: props.onClick ? 'pointer' : 'default',
                },
                style
            )}
            variant={variant || 'overline'}
            noWrap={noWrap === undefined ? true : noWrap}
            display={display || 'inline'}
            data-test={'list-item-tag'}
            {...other}
        >
            {label}
        </Typography>
    );
};

ListItemTag.propTypes = {
    label: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
};
