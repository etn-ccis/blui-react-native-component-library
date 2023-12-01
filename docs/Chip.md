# Grade

The Grade component is a customizable [chip](https://callstack.github.io/react-native-paper/docs/components/Chip/#selectedcolor)-based component that makes the chip component in alignment to BrightlayerUI. Chips are compact elements that can represent inputs, attributes, or actions. They can have an icon or avatar on the left, and a close button icon on the right.

<img width="110" alt="Chipcomponent" src="./images/chip.png">

## Usage

```tsx
import {  } from '@brightlayer-ui/react-native-components';

<Chip> Unselect </Chip>;
<Chip mode="elevated">Select</Chip>
```

### Chip API

| Prop Name       | Description                          | Type                                   | Required | Default                  |
| --------------- | ------------------------------------ | -------------------------------------- | -------- | ------------------------ |
| chipColor       | The color of the chip                | `string`                               | no       |                          |
| textColor       | The color of the text label          | `string`                               | no       |                          |
| iconColor       | The color of the icon                | `string`                               | no       |                          |
| borderColor     | The color of border color            | `string`                               | no       |                          |
| icon            | A component to render for the icon   | [`IconSource`](./Icons.md)             | no       |                          |
| mode            | The size of the circle in px         | `string`                               | no       |                          |
| avatar          | Avatar to display in chip            | `JSX.Element`                          | no       |                          |
| theme           | Theme value overrides                | `$DeepPartial<ReactNativePaper.Theme>` | no       |                          |



### Styles

You can override the internal style used by Brightlayer UI by passing a `style` prop.
