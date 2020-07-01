# Header

The `<Header>` component is used at the top of the page to display page information. It shows a title and has optional parameters to show a subtitle, background image, navigation button, and multiple action buttons. The header can also be configured to expand/collapse as desired.

<img width="400" alt="Collapsed header" src="./images/header_small.png">
<img width="400" alt="Expanded header" src="./images/header_large.png">

## Usage

```tsx
import { Header } from '@pxblue/react-native-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MenuIcon = wrapIcon({IconClass: Icon, name:'menu'});
const MoreIcon = wrapIcon({IconClass: Icon, name:'more-vert'});
...
<Header
    title={'Valley Forge'}
    subtitle={'The Last Stand'}
    navigation={{icon: MenuIcon, onPress: () => {}}}
    actionItems={[
        {icon: MoreIcon, onPress: () => {}}
    ]}
/>
```

## API

<div style="overflow: auto">

| Prop Name        | Description                             | Type                  | Required | Default                  |
| ---------------- | --------------------------------------- | --------------------- | -------- | ------------------------ |
| title            | The text to show on the first line      | `string`              | yes      |                          |
| subtitle         | The text to show on the second line     | `string`              | no       |                          |
| info             | Third line of text (hidden on collapse) | `string`              | no       |                          |
| navigation       | Icon to show left of the title          | `HeaderIcon`          | no       |                          |
| actionItems      | Icons to show to the right of the title | `HeaderIcon[]`        | no       |                          |
| expandable       | Allow the header to expand/collapse     | `boolean`             | no       | `false`                  |
| startExpanded    | Default the header to expanded          | `boolean`             | no       | `false`                  |
| backgroundColor  | The color used for the background       | `string`              | no       | `theme.colors.primary`   |
| fontColor        | The color used for the text             | `string`              | no       | `theme.colors.onPrimary` |
| backgroundImage  | An image to display in the header       | `ImageSourcePropType` | no       |                          |
| searchableConfig | Configuration for search behavior       | `SearchableConfig`    | no       |                          |
| theme            | Theme partial for default styling       | `Theme`               | no       |                          |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name              | Description                                    |
| ----------------- | ---------------------------------------------- |
| root              | Styles applied to the root element             |
| backgroundImage   | Styles applied to the background image         |
| content           | Styles applied to the content wrapper          |
| navigationIcon    | Styles applied to the navigation icon          |
| textContent       | Styles applied to the text wrapper             |
| title             | Styles applied to the title element            |
| subtitle          | Styles applied to the subtitle element         |
| info              | Styles applied to the info element             |
| search            | Styles applied to the search input element     |
| actionPanel       | Styles applied to the actions container        |
| actionItem        | Styles applied to the action icon(s)           |

# HeaderIcon

Header icons specified as a JSON object with the following properties:

<div style="overflow: auto">

| Key     | Description                        | Type                                               | Required | Default |
| ------- | ---------------------------------- | -------------------------------------------------- | -------- | ------- |
| icon    | A component to render for the icon | `React.Component<{ size: number, color: string }>` | yes      |         |
| onPress | A function to execute when clicked | `function`                                         | yes      |         |

</div>

# SearchableConfig

SearchableConfig is an optional object used to configure the search functionality of the header component. It is a JSON object with the following properties:

<div style="overflow: auto">

| Key            | Description                             | Type                                                                 | Required | Default      |
| -------------- | --------------------------------------- | -------------------------------------------------------------------- | -------- | ------------ |
| icon           | An override for the default search icon | `React.Component<{ size: number, color: string }>`                   | no       | `SearchIcon` |
| placeholder    | Helper text shown in search field       | `string`                                                             | no       | 'Search'     |
| autoFocus      | Gives focus to search input when opened | `boolean`                                                            | no       | `false`      |
| onChangeText   | Callback when search text changes       | `function`                                                           | no       | `null`       |
| autoCapitalize | Auto-capitalize search input            | [`TextInput.autoCapitalize`](https://reactnative.dev/docs/textinput) | no       | 'none'       |
| autoCorrect    | Auto-correct search input               | `boolean`                                                            | no       | `false`      |

</div>
