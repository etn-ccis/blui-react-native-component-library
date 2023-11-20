# Progress Bar

The `<ProgressBar>` component is a wrapper around React Native Paper's [ProgressBar](https://callstack.github.io/react-native-paper/docs/components/ProgressBar) component. It is used as a progress indicator of an activity. The wrapper simply performs some minor theme / style overrides in order to make the component look the way we want for Brightlayer UI projects.

<img width="100%" alt="Gradecomponent" src="./images/progressBar.png">

## Usage

```tsx
import { ProgressBar } from '@brightlayer-ui/react-native-components';

<ProgressBar progress={0.5} />;
```

### ProgressBar API

`ProgressBar` accepts all the same props as the React Native Paper's [ProgressBar](https://callstack.github.io/react-native-paper/docs/components/ProgressBar/#props) component.

### Styles

You can override the internal style used by Brightlayer UI by passing a `style` prop.
