# Icon

`<Icon>` component is an internal utility component used to render icons inside of other components. It standardizes the implementation of the icon and handles all of the different ways to specify the icon without having to duplicate this logic inside of every component that utilizes icons.

<img width="100%" style="max-width: 300px; display: block;" alt="Icon" src="./images/icon.png">

## Usage

```tsx
import { Icon } from '@brightlayer-ui/react-native-components';

<Icon source={{ family: 'brightlayer-ui', name: 'device' }} />
```

## API

<div style="overflow: auto;">

| Prop Name       | Description                   | Type     | Required | Default                   |
| --------------- | ----------------------------- | -------- | -------- | ------------------------- |
| source | A component to render for the icon | `IconSource` | yes       |    |
| theme       | Theme value overrides                                           | `$DeepPartial<ReactNativePaper.Theme>`     | `string` | no       | Varies based on the theme |

</div>