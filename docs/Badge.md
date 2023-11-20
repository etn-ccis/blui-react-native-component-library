# Badge

The `<Badge>` component is a wrapper around the React Native Paper [Badge](https://callstack.github.io/react-native-paper/docs/components/Badge) component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides in order to make the component look the way we want for Brightlayer UI projects.

<img width="100%" alt="Badgecomponent" src="./images/badge.png">

## Usage

```tsx
import { Badge } from '@brightlayer-ui/react-native-components';

<Badge size={24} visible />;
```

### Badge API

`Badge` accepts all the same props as the React Native Paper's [Badge](https://callstack.github.io/react-native-paper/docs/components/Badge/#props) component.

### Styles

You can override the internal style used by Brightlayer UI by passing a `style` prop.
