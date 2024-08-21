# Icon Switch

The `<IconSwitch />` is a switch component that can optionally renders an icon in the switch's handle.

<img width="200" alt="icon switch picture" src="./images/iconswitch.png" />

## Usage

```tsx
import { IconSwitch } from '@brightlayer-ui/react-native-components';

<IconSwitch />;

<IconSwitch showIcon />;
```

### API

<div style="overflow: auto;">

| Prop Name     | Description                      | Type                          | Required | Default |
| ------------- | -------------------------------- | ----------------------------- | -------- | ------- |
| showIcon      | To display icon or not           | `boolean`                     | no       |         |
| disabled      | Flag for render disabled switch  | `boolean`                     | no       |         |
| value         | Pass state to the component      | `boolean`                     | yes      |         |
| onValueChange | Callback event handling function | `Function`                    | yes      |         |
| theme         | Theme value overrides            | `$DeepPartial<ExtendedTheme>` | no       |         |

</div>

Any other props will be provided to the root element ([**View**](https://reactnative.dev/docs/view)).

### Styles

You can override the internal styles used by Brightlayer UI by passing a `styles` prop. It supports the following keys:

| Name   | Description                          |
| ------ | ------------------------------------ |
| root   | Styles applied to the root element   |
| handle | Styles applied to the handle element |
