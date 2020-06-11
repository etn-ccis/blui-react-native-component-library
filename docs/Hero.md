# Hero Components

Hero items are used to call attention to particular values.

<img width="500" alt="Hero Banner with heroes" src="./images/hero.png">

## Hero

The `<Hero>` component displays a particular icon, value/units, and a label. The [IconClass](./IconWrapper.md) property will accept any valid icon from [`react-native-vector-icons`](https://www.npmjs.com/package/react-native-vector-icons) and [`@pxblue/icons-svg`](https://www.npmjs.com/package/@pxblue/icons-svg).

> In the future this component will be extended to work with other graphic types, including progress icons, text, and emojis.

The value section of the Hero utilizes a [`<ChannelValue>`](./ChannelValue.md) component. To display a single simple value, the information can be passed as props (`value`, `units`, `valueIcon`). For more complex values (such as a duration that displays hours and minutes), you can pass in `<ChannelValue>` components as children and they will be displayed inline.

### Hero Usage

```tsx
import { Hero, wrapIcon } from '@pxblue/react-native-components';
import _Battery from '@pxblue/icons-svg/battery.svg';
const Battery = wrapIcon({ IconClass: _Battery });
...
<Hero
    label={'Charge'}
    IconClass={Battery}
    value={100}
    units={'%'}
/>
```

### Hero API

<div style="overflow: auto">

| Prop Name           | Description                             | Type                                               | Required | Default                |
| ------------------- | --------------------------------------- | -------------------------------------------------- | -------- | ---------------------- |
| label               | The text shown below the `ChannelValue` | `string`                                           | yes      |                        |
| IconClass           | The primary icon                        | `React.Component<{ size: number, color: string }>` | yes      |                        |
| iconSize            | The size of the primary icon (10-48)    | `number`                                           | no       | 36                     |
| iconColor           | The color of the primary icon           | `string`                                           | no       | `text`                 |
| iconBackgroundColor | The color behind the primary icon       | `string`                                           | no       | `theme.colors.surface` |
| fontSize            | The text size for the value line        | `number`                                           | no       | 'large'                |
| value               | The value for the channel               | `string` \| `number`                               | no       |                        |
| ValueIconClass      | The icon to show inline with the value  | `React.Component<{ size: number, color: string }>` | no       |                        |
| valueColor          | Text color for the value line           | `string`                                           | no       | `text`                 |
| units               | Text to show after the value            | `string`                                           | no       |                        |
| onPress             | A function to execute when clicked      | `function`                                         | no       |                        |
| theme               | Theme partial for default styling       | `Theme`                                            | no       |                        |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name        | Description                                  |
| ----------- | -------------------------------------------- |
| root        | Styles applied to the root element           |
| iconWrapper | Styles applied to the icon wrapper element   |
| values      | Styles applied to the row of `ChannelValue`s |
| label       | Styles applied to the label element          |


## Hero Banner

The `<HeroBanner>` component is a simple wrapper component that is used to contain `<Hero>`s. It creates the flex container and sets up the spacing rules to display them. It accepts up to four `<Hero>` components by default as children. Any children after the `limit` will not be rendered.

### Hero Banner Usage

```tsx
import { Hero, HeroBanner, wrapIcon } from '@pxblue/react-native-components';
import _Battery from '@pxblue/icons-svg/battery.svg';
const Battery = wrapIcon({ IconClass: _Battery });
...
...
<HeroBanner divider>
    <Hero label={'Hero One'} IconClass={Battery}/>
    <Hero label={'Hero Two'} IconClass={Battery}/>
    <Hero label={'Hero Three'} IconClass={Battery}/>
    <Hero label={'Hero Four'} IconClass={Battery}/>
</HeroBanner>
```

### Hero Banner API

<div style="overflow: auto">

| Prop Name | Description                        | Type      | Required | Default |
| --------- | ---------------------------------- | --------- | -------- | ------- |
| divider   | Whether to show the line separator | `boolean` | no       | false   |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name        | Description                                  |
| ----------- | -------------------------------------------- |
| root        | Styles applied to the root element           |
| divider     | Styles applied to the divider element        |
