# Spacer

An invisible utility component that acts as a spacer element in various layouts. It works with flexbox sizing or fixed sizing.

<div style="width: 100%; text-align:center">
    <img width="40%" alt="Spacer used in Drawer Body" src="./images/spacer.png"><br/>
</div>

## Usage

```tsx
import { Spacer } from '@pxblue/react-native-components';
...
<View style={{ display: 'flex' }}>
    {/* Left Content */}
    <Spacer />
    {/* Right Content */}
</View>
```

## API

<div style="overflow: auto;">

| Prop Name | Description                             | Type     | Required | Default |
| --------- | --------------------------------------- | -------- | -------- | ------- |
| flex      | Flex grow/shrink value for flex layouts | `number` | no       | 1       |
| height    | Height (in px) for static layouts       | `number` | no       |         |
| width     | Width (in px) for static layouts        | `number` | no       |         |

</div>

Any other props supplied will be provided to the root element (`View`).

### Styles

You can override the classes used by PX Blue by passing a `styles` prop. It supports the following key:

| Name | Description                        |
| ---- | ---------------------------------- |
| root | Styles applied to the root element |
