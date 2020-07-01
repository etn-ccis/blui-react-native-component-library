# Channel Value

The `<ChannelValue>` component is used to display...a channel value (and units). This component abstracts the styles used to display the channel and units as well as an optional inline icon. These are used as part of the [Hero](./Hero.md) component, but can also be used inline (e.g., in a list)

<img width="300" alt="Channel Value component" src="./images/channelValue.png">

> Note: If provided, the IconClass must be a `React.ComponentClass` or `React.FunctionComponent` with props of `{ size: number, color: string }`. This library exposes a `wrapIcon` higher-order function that can convert components from `react-native-vector-icons` or from `@pxblue/icons-svg` to this format. See [IconWrapper](./IconWrapper.md).

## Usage

```tsx
import { ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import _Battery from '@pxblue/icons-svg/battery.svg';
const Battery = wrapIcon({ IconClass: _Battery });
...
<ChannelValue
    value={100}
    units={'%'}
    IconClass={Battery}
/>
```

## API

<div style="overflow: auto">

| Prop Name | Description                           | Type                                                 | Required | Default             |
| --------- | ------------------------------------- | ---------------------------------------------------- | -------- | ------------------- |
| value     | The value shown below the icon        | `string` \| `number`                                 | yes      |                     |
| IconClass | A component to render for the icon    | `React.Component<{ size: number, color: string }>`   | no       |                     |
| IconProps | Props to pass through to the icon     | `{ size?: number, color?: string }`                  | no       |                     |
| units     | The units for the supplied value      | `string`                                             | no       |                     |
| prefix    | If true, shows units before the value | `boolean`                                            | no       | false               |
| fontSize  | The size of the font for the value    | `number`                                             | no       | 'medium'            |
| color     | The color used for the text elements  | `string`                                             | no       | `theme.colors.text` |
| theme     | Theme partial for default styling     | `Theme`                                              | no       |                     |

</div>

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name  | Description                         |
| ----- | ----------------------------------- |
| root  | Styles applied to the root element  |
| units | Styles applied to the units element |
| value | Styles applied to the value element |