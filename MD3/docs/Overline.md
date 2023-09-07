# Overline

Overline component is used to render text on the screen.

<img width="100%" style="max-width:400px" alt="Overline" src="./images/overline.png">


## Usage

```tsx
import * as Overline from '@brightlayer-ui/react-native-components';

<View>
    <Overline>Overline</Overline>
</View>;
```

## API

<div style="overflow: auto">

| Prop Name | Description                     | Type                                                                               | Required | Default             |
| --------- | ------------------------------- | ---------------------------------------------------------------------------------- | -------- | ------------------- |
| font      | The font style (from the theme) | keyof MD3Theme['fonts'](https://callstack.github.io/react-native-paper/theming.html) | no       |                     |
| fontSize  | The font size                   | `number`                                                                           | no       |                     |
| color     | The font color (from the theme) | `string`                                                                           | no       | `theme.colors.primary` |
| theme     | Theme value overrides           | `$DeepPartial<MD3Theme>`                                             | no       |                     |

</div>

Any other props will be provided to the root element [`<Text>`](https://callstack.github.io/react-native-paper/docs/components/Text).

### Styles

You can override the internal styles used by Brightlayer UI by passing a `styles` prop. It supports the following keys:

| Name | Description                        |
| ---- | ---------------------------------- |
| root | Styles applied to the root element |