# Drawer

The `<Drawer>` component is side-menu that houses navigation items. Its anatomy can be broken down into four subsections: `<DrawerHeader>`, `<DrawerSubheader>`, `<DrawerBody`>, and a `<DrawerFooter>`.
To integrate in-app navigation, the `<Drawer>` component needs to be paired with a navigation provider; we recommend using [React Navigation](https://reactnavigation.org/docs/getting-started).

To learn more about the Navigation design pattern, check out our [documentation](https://pxblue.github.io/patterns/navigation).

## Usage

```tsx
import { Drawer, DrawerHeader, DrawerBody, NavItem } from '@pxblue/react-native-components';
...
<Drawer activeItem={selectedItem} onItemSelect={(id) => {/* updateSelectedItem */}}>
    <DrawerHeader title={'Drawer Title'} subtitle={'Drawer Subtitle'} icon={<Menu/>} />
    <DrawerSubheader>{/* contents */ }</DrawerSubheader>
    <DrawerBody>
        <DrawerNavGroup title={'Navigation Group'} items={[{
            title: 'Identity Management',
            itemID: 'g1i1',
        }]} />
    </DrawerBody>
    <DrawerFooter>{/* contents */ }</DrawerFooter>
</Drawer>
}
```

## API 

The following props can be set at any level in the drawer hierarchy (`<Drawer>`, `<DrawerBody>`, `<DrawerNavGroup>`, `NavItem`, or `NestedNavItem`). If they are set on a parent, they will be used for all children. For more customization, you can set these props on individual children and they will override any value set on the parent.

<div style="overflow: auto;">

| Name                      | Description                                               | Type                    | Required | Default                                                      |
| ------------------------- | --------------------------------------------------------- | ----------------------- | -------- | ------------------------------------------------------------ |
| activeItem                | ItemID of the currently selected item                     | `string`                | no       |                                                              |
| activeItemBackgroundColor | Background color for the 'active' item                    | `string`                | no       | varies for light/dark theme                                  |
| activeItemBackgroundShape | shape of the active item background                       | `'round'` \| `'square'` | no       | round                                                        |
| activeItemFontColor       | Font color for the 'active' item                          | `string`                | no       | varies for light/dark theme                                  |
| activeItemIconColor       | Icon color for the 'active' item                          | `string`                | no       | varies for light/dark theme                                  |
| chevron                   | Whether to have chevrons for all menu items               | `boolean`               | no       | false                                                        |
| collapseIcon              | Icon used to collapse drawer                              | `JSX.Element`           | no       | `expandIcon` rotated 180 degrees                             |
| divider                   | Whether to show a line between all items                  | `boolean`               | no       | true                                                         |
| expandIcon                | Icon used to expand drawer                                | `JSX.Element`           | no       | `expand-more` at top-level, `arrow-drop-down` otherwise      |
| hidePadding               | Whether to hide the paddings reserved for menu item icons | `boolean`               | no       | true                                                         |
| itemFontColor             | The color used for the item text                          | `string`                | no       |                                                              |
| itemIconColor             | The color used for the icon                               | `string`                | no       |                                                              |

</div>


# DrawerHeader
The `<DrawerHeader>` is a subsection that appears at the top of `<Drawer>`. Its content can be provided by the `title`, `subtitle`, and `icon` props, or can be entirely custom content.

## API

<div style="overflow: auto">

| Prop Name         | Description                                    | Type                   | Required | Default                      |
| ----------------- | ---------------------------------------------- | ---------------------- | -------- | ---------------------------- |
| backgroundColor   | The color used for the background              | `string`               | no       | `theme.colors.primary`       |
| backgroundImage   | An image to display in the header              | `ImageSourcePropType`  | no       |                              |
| backgroundOpacity | The opacity of the background image            | `number`               | no       | `0.3`                        |
| fontColor         | The color of the text elements                 | `string`               | no       | `theme.colors.surface`       |
| icon              | A component to render for the icon             | `ReactNode`            | no       |                              |
| subtitle          | The text to show on the second line            | `string`               | no       |                              |
| title             | The text to show on the first line             | `string`               | no       |                              |
| titleContent      | Custom content for header title area           | `ReactNode`            | no       |                              |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name                     | Description                                    |
| ------------------------ | ---------------------------------------------- |
| root                     | Styles applied to the root element             |
| backgroundImageWrapper   | Styles applied to the background image wrapper |
| backgroundImage          | Styles applied to the background image         |
| content                  | Styles applied to the content wrapper          |
| textContent              | Styles applied to the text wrapper             |
| title                    | Styles applied to the title element            |
| subtitle                 | Styles applied to the subtitle element         |
| icon                     | Styles applied to the left icon element        |


# DrawerSubheader
The `<DrawerSubheader>` is an optional subsection that will appear below the `<DrawerHeader>` and above the `<DrawerBody>`.

# DrawerBody
The `<DrawerBody>` consists of `<DrawerNavGroup>` children and renders the navigation items found within the `<Drawer>`. 

## API
The `<DrawerBody>` supports all inheritable properties found within the `<Drawer>` API section and all properties from the React Native ScrollView.

# DrawerNavGroup
A `<DrawerNavGroup>` consists of a `title` or custom `titleContent` and houses the navigation items found in the `<Drawer>`.

## API 
The `<DrawerNavGroup>` supports all inheritable properties found within the `<Drawer>` API section. It also supports these additional props:

<div style="overflow: auto">

| Prop Name         | Description                                    | Type              | Required | Default                      |
| ----------------- | ---------------------------------------------- | ----------------- | -------- | ---------------------------- |
| items             | Navigation items to render                     | `NavItem[]`       | yes      |                              |
| title             | Text alternative to title                      | `string`          | no       |                              |
| titleContent      | Custom content for the title area              | `ReactNode`       | no       |                              |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name                     | Description                                         |
| ------------------------ | --------------------------------------------------- |
| root                     | Styles applied to the root element                  |
| content                  | Styles applied to the content wrapper               |
| textContent              | Styles applied to the text wrapper                  |
| title                    | Styles applied to the title element                 |
| divider                  | Styles applied to the divider elements              |
| navItem                  | Styles passed to the underlying NavItem (see below) |

## NavItem
A `<NavItem>` is a clickable link that appears within a `<DrawerNavGroup>`.  They can be used for navigation between pages, or can be a `NestedNavItem` that can expand or collapse other sub-`NavItem`s. 
A `<NavItem>` supports all inheritable properties found within the `<Drawer>` API section.  It also supports these additional props:

<div style="overflow: auto">

| Prop Name         | Description                                      | Type              | Required | Default                      |
| ----------------- | ------------------------------------------------ | ----------------- | -------- | ---------------------------- |
| hidden            | Sets whether to hide the nav item                | `boolean`         | no       |                              |
| icon              | Icon to display, not applicable to `NestNavItem` | `ReactNode`       | no       |                              |
| itemID            | ID used to distinguish item as unique            | `string`          | yes      |                              |
| items             | Sub items to show/hide when clicked              | `NestedNavItem[]` | no       |                              |

</div>

A `<NavItem>` is built using our `<InfoListItem>` component and inherits all of its properties. 
A `<NestedNavItem>` has all the same properties as a `<NavItem>` but does not support icons. 

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name                     | Description                                         |
| ------------------------ | --------------------------------------------------- |
| root                     | Styles applied to the root element                  |
| activeBackground         | Styles applied to the background of an active item  |
| expandIcon               | Styles applied to right content expand icon         |
| infoListItem             | Styles passed to the underlying InfoListItem        |

# DrawerFooter
The `<DrawerFooter>` is an optional subsection that will be pinned to the bottom of the `<Drawer`>.
