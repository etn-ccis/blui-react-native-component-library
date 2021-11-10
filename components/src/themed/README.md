# Themed React Native Paper Components

This folder contains a set of wrappers around various [React Native Paper](https://callstack.github.io/react-native-paper/index.html) components.

By default, the theming mechanism provided by RNP is very minimal and does not allow us to style components precisely the way we want for Brightlayer UI applications. To circumvent this issue, we introduced an alternate dark theme in [@brightlayer-ui/react-native-themes](https://www.npmjs.com/package/@brightlayer-ui/react-native-themes) version 5.1.0.

This approach required users to wrap their application with two separate theme providers and write their own wrapper components to correctly take different parts from each theme to apply to RNP components.

These new wrapper components simplify this process so that only one theme is necessary for dark mode and users no longer need to write their own wrapper components.

## Available Components

Wrapper components are provided for:

-   ActivityIndicator
-   AppBar
-   Avatar
-   Badge
-   BottomNavigation
-   Button
-   Checkbox
-   Chip
-   Divider
-   FAB
-   ProgressBar
-   RadioButton
-   Snackbar
-   Switch
-   TextInput
-   ToggleButton

These components should be used in place of their respective components from RNP. They will add the desired styles to those components by modifying theme values, props, and / or styles for you that you will not get if you use the RNP components directly.

## Usage

These components can be imported from the `/themed` directory in the @brightlayer-ui/react-native-components package. The APIs for these components are identical to the APIs for their respective RNP components, e.g.:

```tsx
import { ThemedAvatar, ThemedButton } from '@brightlayer-ui/react-native-components/themed';

<ThemedAvatar.Text size={40} label="BLUI" />
<ThemedButton
    icon="download"
    mode="outlined"
    onPress={(): void => {/* do something */}}
>
    Press me
</ThemedButton>
```
