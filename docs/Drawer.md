# Drawer

The `<Drawer>` component is side-menu that houses navigation items.  Its anatomy can be broken down into four subsections: `<DrawerHeader>`, `<DrawerSubheader>`, `<DrawerBody`>, and a `<DrawerFooter>`.
To add in-app navigation, the `<Drawer>` component needs to be paired with a navigation provider; we recommend using [React Navigation](https://reactnavigation.org/docs/getting-started).

To learn more about the Navigation design pattern, check out our [documentation](https://pxblue.github.io/patterns/navigation).

## Usage

```tsx
import React, { useState, useCallback } from 'react';
import { Drawer, DrawerHeader, DrawerBody, NavItem } from '@pxblue/react-native-components';

export const NavigationDrawer: React.FC = ({ navigation }) => {

    const [selected, setSelected] = useState('');
    const selectItem = useCallback((id: string) => {
        navigation.navigate(id);
        setSelected(id);
    }, [navigation]);

    const navGroupItems1: NavItem[] = [
        {
            title: 'Identity Management',
            itemID: 'g1i1',
        },
        {
            title: 'Calendar',
            itemID: 'g1i2',
        },
        {
            title: 'Accessibility',
            itemID: 'g1i3',
        }
    ];
  
    return <Drawer activeItem={selected} onItemSelect={(id: string): void => selectItem(id)}>
                <DrawerHeader title={'Drawer Title'} subtitle={'Drawer Subtitle'}
                    backgroundImage={headerBgImage}
                    icon={
                        <IconButton icon="menu" size={24} color={Colors.white[50]} onPress={(): void => {
                            navigation.closeDrawer();
                        }}/>
                    }
                />
                <DrawerBody>
                    <DrawerNavGroup items={navGroupItems1} title={'Group 1'} />
                </DrawerBody>
        </Drawer>
}
```

#### API 

The following props can be set at any level in the drawer hierarchy (`<Drawer>`, `<DrawerBody>`, `<DrawerNavGroup>`, `NavItem`, or `NestedNavItem`). If they are set on a parent, they will be used for all children. For more customization, you can set these props on individual children and they will override any value set on the parent.

<div style="overflow: auto;">

| Name                      | Description                                               | Type                  | Required | Default                                                      |
| ------------------------- | --------------------------------------------------------- | --------------------- | -------- | ------------------------------------------------------------ |
| activeItem                | ItemID of the currently selected item                     | `string`              | no       |                                                              |
| activeItemBackgroundColor | Background color for the 'active' item                    | `string`              | no       | varies for light/dark theme                                  |
| activeItemBackgroundShape | shape of the active item background                       | `'round'`\|`'square'` | no       | round                                                        |
| activeItemFontColor       | Font color for the 'active' item                          | `string`              | no       | varies for light/dark theme                                  |
| activeItemIconColor       | Icon color for the 'active' item                          | `string`              | no       | varies for light/dark theme                                  |
| chevron                   | Whether to have chevrons for all menu items               | `boolean`             | no       |                                                              |
| collapseIcon              | Icon used to collapse drawer                              | `JSX.Element`         | no       | `expandIcon` rotated 180 degrees                             |
| divider                   | Whether to show a line between all items                  | `boolean`             | no       | true                                                         |
| expandIcon                | Icon used to expand drawer                                | `JSX.Element`         | no       | `<ExpandMore />` at top-level, `<ArrowDropDown />` otherwise |
| hidePadding               | Whether to hide the paddings reserved for menu item icons | `boolean`             | no       |                                                              |
| itemFontColor             | The color used for the item text                          | `string`              | no       |                                                              |
| itemIconColor             | The color used for the icon                               | `string`              | no       |                                                              |

</div>


### DrawerHeader
The `<DrawerHeader>` is a subsection that appears at the top of `<Drawer>`.  Its content can be provided by the `title`, `subtitle`, and `icon` props, or can be entirely custom content.  

#### API

<div style="overflow: auto">

| Prop Name         | Description                                    | Type              | Required | Default                      |
| ----------------- | ---------------------------------------------- | ----------------- | -------- | ---------------------------- |
| backgroundColor   | The color used for the background              | `string`          | no       | `theme.colors.primary`       |
| backgroundImage   | An image to display in the header              | `string`          | no       |                              |
| backgroundOpacity | The opacity of the background image            | `number`          | no       | `0.3`                        |
| fontColor         | The color of the text elements                 | `string`          | no       | `theme.colors.surface`       |
| icon              | A component to render for the icon             | `ReactNode`       | no       |                              |
| subtitle          | The text to show on the second line            | `string`          | no       |                              |
| title             | The text to show on the first line             | `string`          | no       |                              |
| titleContent      | Custom content for header title area           | `ReactNode`       | no       |                              |

</div>

### DrawerSubheader
The `<DrawerSubheader>` is an optional subsection that will appear below the `<DrawerHeader>` and above the `<DrawerBody`>.  

### DrawerBody
The `<DrawerBody>` consists of `<DrawerNavGroup>` children and renders the navigation items found within the `<Drawer>`. 

#### API
The `<DrawerBody>` supports all inheritable properties found within the `<Drawer>` API section.

### DrawerNavGroup
The `<DrawerNavGroup>` consist of a `title` or custom `titleContent` and houses the navigation items found in the `<Drawer>`.

#### API 
The `<DrawerNavGroup>` supports all inheritable properties found within the `<Drawer>` API section.   It also supports these additional props:
<div style="overflow: auto">

| Prop Name         | Description                                    | Type              | Required | Default                      |
| ----------------- | ---------------------------------------------- | ----------------- | -------- | ---------------------------- |
| backgroundColor   | The color used for the background              | `string`          | no       | `theme.colors.primary`       |
| backgroundImage   | An image to display in the header              | `string`          | no       |                              |
| backgroundOpacity | The opacity of the background image            | `number`          | no       | `0.3`                        |
| fontColor         | The color of the text elements                 | `string`          | no       | `theme.colors.surface`       |
| icon              | A component to render for the icon             | `ReactNode`       | no       |                              |
| subtitle          | The text to show on the second line            | `string`          | no       |                              |
| title             | The text to show on the first line             | `string`          | no       |                              |
| titleContent      | Custom content for header title area           | `ReactNode`       | no       |                              |

</div>

### DrawerFooter
The `<DrawerFooter>` is an optional subsection that will be pinned to the bottom of the `<Drawer`>.  

