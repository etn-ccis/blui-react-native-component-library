# Info List Item

The `<InfoListItem>` is intended to be used in List views. It positions a title as well as optional subtitle(s), icon, and status stripe. The [IconClass](./IconWrapper.md) property will accept any valid icon from [`react-native-vector-icons`](https://www.npmjs.com/package/react-native-vector-icons) or [`@pxblue/icons-svg`](https://www.npmjs.com/package/@pxblue/icons-svg).

<img width="400" alt="Info List Item component" src="./images/infoListItem.png">

## Usage

```tsx
import Leaf from '@pxblue/icons-svg/leaf.svg';
import { wrapIcon } from '@pxblue/react-native-components';
const LeafIcon = wrapIcon({ IconClass: Leaf });
...
<InfoListItem
    title={'Title'}
    IconClass={LeafIcon}
    subtitle={'A subtitle'}
    statusColor={PXBColors.red[500]}
    backgroundColor={PXBColors.blue[50]}
/>
```

### Advanced Usage

You can also supply an array of items that will be displayed as a character-separated subtitle. The separation character is configurable.

```tsx
<InfoListItem title={'Hillman Field East'} subtitle={['PXM 2000', 'DT 1150', '113.4 GPM']} subtitleSeparator={'/'} />
```

## API

<div style="overflow: auto">

| Prop Name         | Description                                  | Type                                               | Required | Default        |
| ----------------- | -------------------------------------------- | -------------------------------------------------- | -------- | -------------- |
| title             | The text to show on the first line           | `string`                                           | yes      |                |
| subtitle          | The text to show on the second line          | `string` \| `Array<React.ReactNode>`               | no       |                |
| subtitleSeparator | Separator character for subtitle             | `string`                                           | no       | '·' ('\u00B7') |
| info              | The text to show on the third line           | `string` \| `Array<React.ReactNode>`               | no       |                |
| iconAlign         | Icon alignment when `avatar` is set to false | `'left'` \| `'center'` \| `'right'`                | no       | 'left'         |
| IconClass         | A component to render for the icon           | `React.Component<{ size: number, color: string }>` | no       |                |
| iconColor         | The color of the primary icon                | `string`                                           | no       |                |
| hidePadding       | Remove left padding if no icon is used       | `boolean`                                          | no       | false          |
| avatar            | Show colored background for icon             | `boolean`                                          | no       | false          |
| chevron           | Add a chevron icon on the right              | `boolean`                                          | no       | false          |
| dense             | Smaller height row with less padding         | `boolean`                                          | no       | false          |
| divider           | Show a row separator below the row           | `'full'` \| `'partial'`                            | no       |                |
| rightComponent    | Component to render on the right side        | `JSX.Element`                                      | no       |                |
| statusColor       | Status stripe and icon color                 | `string`                                           | no       |                |
| fontColor         | Title text color                             | `string`                                           | no       |                |
| backgroundColor   | The color used for the background            | `string`                                           | no       |                |
| onPress           | A function to execute when clicked           | `function`                                         | no       |                |
| theme             | Theme partial for default styling            | `Theme`                                            | no       |                |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name            | Description                                     |
| --------------- | ----------------------------------------------- |
| root            | Styles applied to the root element              |
| statusStripe    | Styles applied to the status stripe element     |
| icon            | Styles applied to the icon element              |
| iconWrapper     | Styles applied to the icon wrapper              |
| infoWrapper     | Styles applied to the info wrapper              |
| info            | Styles applied to the info text elements        |
| avatar          | Styles applied to the avatar background         |
| mainContent     | Styles applied to the main text content wrapper |
| title           | Styles applied to the title element             |
| subtitleWrapper | Styles applied to the subtitle wrapper          |
| subtitle        | Styles applied to the subtitle text elements    |
| divider         | Styles applied to the divider element           |
