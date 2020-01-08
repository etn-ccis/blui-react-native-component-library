import React from 'react';
import PropTypes from "prop-types";

import {withStyles} from '@material-ui/core/styles';
import {Drawer, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
// Material-UI Icons
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DrawerHeader from "./DrawerHeader";
import DrawerSubheader from "./DrawerSubheader";
import DrawerBody from "./DrawerBody";
import DrawerFooter from "./DrawerFooter";
import Hidden from "@material-ui/core/Hidden";
import Backdrop from "@material-ui/core/Backdrop";
import {InfoListItem} from "../index";
import * as PXBColors from "@pxblue/colors";

class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
    }

    isDrawerOpen() {
        return this.state.hover || this.props.open;
    }

    findChildByType(type) {
        const empty = <></>;
        return React.Children.map(this.props.children, child => {
            if (child.type) {
                const name = child.type.displayName;
                if (name && name.includes(type)) {
                    return child;
                }
            }
        }) || [empty];
    }

    getHeader() {
        const header = this.findChildByType('DrawerHeader')[0];
        return <>
            {header && React.cloneElement(header)}
        </>;
    }

    getSubHeader() {
        const subheader = this.findChildByType('DrawerSubheader')[0];
        return <>
            {subheader && React.cloneElement(subheader)}
        </>;
    }

    getBody() {
        const body = this.findChildByType('DrawerBody')[0];
        return <>
            {body && React.cloneElement(body, {
                createRouteItems: (items) => this.createRouteItems(items),
                open: this.isDrawerOpen(),
                onSelect: () => {
                    this.setState({ hover: false });
                }
            })}
        </>;
    }

    getFooter() {
        const footer = this.findChildByType('DrawerFooter')[0];
        return <>
            {footer && React.cloneElement(footer, {
                createRouteItems: (items) => this.createRouteItems(items),
                open: this.isDrawerOpen()
            })}
        </>;
    }

    getDrawerContents() {
        const { classes } = this.props;

       return  <div className={classes.drawerWidthFull} style={{
            flexDirection: 'column', display: 'flex', height: '100%'
        }}>
            <div style={{flexShrink: '0'}}>{this.getHeader()}</div>
            <div
                style={{ flexDirection: 'column', flex: '1 0 auto'}}
                onMouseEnter={() => {
                    this.hoverDelay = setTimeout(() => this.setState({hover: true}), 500);
                }}
                onMouseLeave={() => {
                    clearTimeout(this.hoverDelay);
                    this.setState({hover: false});
                }}
            >
                <div style={{flexShrink: '0'}}>{this.getSubHeader()}</div>
                <div style={{flex: '1 0 auto'}}>{this.getBody()}</div>
                <div style={{flexShrink: '0'}}>{this.getFooter()}</div>
            </div>
        </div>
    }

    getMobileNavigationMenu() {
        const { classes } = this.props;
        return (
            <Drawer
                open={this.isDrawerOpen()}
                classes={{ paper: classes.drawer }}>
                <div className={this.isDrawerOpen() ? classes.drawerWidthFull : classes.drawerWidthCollapsed}
                     style={{
                         height: '100%',
                         overflow: 'hidden'
                     }}>
                    {this.getDrawerContents()}
                </div>
            </Drawer>
        );
    }

    getDesktopNavigationMenu() {
        const { classes } = this.props;
        return <Drawer variant="permanent"
                       open={this.isDrawerOpen()}
                       classes={{paper: classes.paper}}>
            <div
                className={
                    this.state.hover
                        ? classes.drawerWidthFull
                        : this.isDrawerOpen()
                            ? classes.drawerWidthFull
                            : classes.drawerWidthCollapsed
                }
                style={{
                    height: '100%'
                }}
            >
                {this.getDrawerContents()}
            </div>
        </Drawer>
    }

    render() {
        return (
            <>
            <Hidden smUp>
                {this.getMobileNavigationMenu()}
                <Backdrop open={this.isDrawerOpen()}/>
            </Hidden>

            <Hidden xsDown>
                {this.getDesktopNavigationMenu()}
            </Hidden>
            </>
        );
    }
}

const styles = theme => {
    return {
    paper: {
        overflow: 'hidden',
        position: 'unset'
    },
    toolbar: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
        },
        paddingLeft: theme.spacing(2),
    },
    drawerWidthFull: {
        width: theme.spacing(45),
        transition: 'width 175ms cubic-bezier(.4, 0, .2, 1)',
    },
    drawerWidthCollapsed: {
        width: theme.spacing(7),
        overflow: 'hidden',
        transition: 'width 175ms cubic-bezier(.4, 0, .2, 1)',
    },
    drawer: {
        maxWidth: '85%',
        width: theme.spacing(45),
    }
}};

export default withStyles(styles, { withTheme: true })(SideNav);
