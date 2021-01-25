# User Menu

The `<UserMenu>` is an Avatar that opens a Menu when clicked. It is typically used in the top-right corner of an application and indicates who is logged in.

<!-- <img width="300" alt="User Menu component" src="./images/userMenu.png"> -->

## Usage

### Standard Usage

```tsx
import { UserMenu, InfoListItemProps, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@pxblue/colors';
...
const VpnKeyIcon = wrapIcon({ IconClass: MatIcon, name: 'vpn-key', flip: false });
const SettingsIcon = wrapIcon({ IconClass: MatIcon, name: 'settings', flip: false });
const ExitToAppIcon = wrapIcon({ IconClass: MatIcon, name: 'exit-to-app', flip: false });
...
const menuItems: InfoListItemProps[] = [
    { title: 'Change Password', IconClass: VpnKeyIcon, onPress: (): void => {} },
    { title: 'Preferences', IconClass: SettingsIcon, onPress: (): void => {} },
    { title: 'Log Out', IconClass: ExitToAppIcon, onPress: (): void => {} },
];
...
<UserMenu
    menuTitle={'John Smith'}
    menuSubtitle={'j.smith@example.com'}
    menuItems={menuItems}
    avatar={<Avatar.Text label={'PX'} size={40} color={Colors.white[50]} />}
/>
```

### Usage with Custom Menu

```tsx
import { UserMenu, InfoListItemProps, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@pxblue/colors';
...
const NumericOneBoxIcon = wrapIcon({ IconClass: MatIcon, name: 'looks-one', flip: false });
const NumericTwoBoxIcon = wrapIcon({ IconClass: MatIcon, name: 'looks-two', flip: false });
...
const [menuClose, setMenuClose] = useState(false);

const closeMenu = (): void => {
    setMenuClose(true);
    setTimeout((): void => setMenuClose(false), 0);
};
...
const customMenu = (): JSX.Element => (
        <View>
            <InfoListItem
                leftComponent={
                    <Avatar.Text
                        label={'PX'}
                        size={40}
                        color={Colors.white[50]}
                    />
                }
                title={'Custom Menu Title'}
                subtitle={'Custom Menu Subtitle'}
            />
            <Divider />
            <InfoListItem
                title={'Custom Menu Info List Item 1'}
                IconClass={NumericOneBoxIcon}
                onPress={(): void => closeMenu()}
            />
            <InfoListItem
                title={'Custom Menu Info List Item 2'}
                IconClass={NumericTwoBoxIcon}
                onPress={(): void => closeMenu()}
            />
        </View>
    );
...
<UserMenu
    menu={customMenu()}
    menuClose={menuClose}
    avatar={<Avatar.Text label={'PX'} size={40} color={Colors.white[50]} />}
/>
```

## API

<div style="overflow: auto">

| Prop Name       | Description                                                 | Type                  | Required | Default             |
| --------------- | ----------------------------------------------------------- | --------------------- | -------- | ------------------- |
| avatar          | Avatar to be displayed as UserMenu bottomsheet trigger      | `JSX.Element`         | yes      |                     |
| backgroundColor | Background color of the bottomsheet                         | `string`              | no       |                     |
| fontColor       | Color of font for the bottomsheet header and menu items     | `string`              | no       |                     | 
| iconColor       | Color of icons for the bottomsheet menu items               | `string`              | no       |                     | 
| menu            | Custom menu to display                                      | `JSX.Element`         | no       |                     |
| menuItems       | Menu items to display in the bottomsheet                    | `InfoListItemProps[]` | no       |                     |
| menuClose       | Boolean used to trigger menu close when using a custom menu | `boolean`             | no       |                     |
| menuTitle       | Title shown when bottomsheet is open                        | `string`              | no       |                     |
| menuSubtitle    | Subtitle shown when bottomsheet is open                     | `string`              | no       |                     |
</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name   | Description                         |
| ------ | ----------------------------------- |
| root   | Styles applied to the root element  |
| avatar | Styles applied to avatar wrapper    |