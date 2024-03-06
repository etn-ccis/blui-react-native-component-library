# Empty State

The `<EmptyState>` component is an element that can be used as a placeholder when no data is present (such as an empty list, or a placeholder page for future content). This is only used when no data is available, rather than during loading (see [empty states pattern](https://brightlayer-ui.github.io/patterns/empty-states)).

<img width="500" alt="Empty state with all props" src="./images/emptyState.png">

## Usage

```tsx
import { EmptyState } from '@brightlayer-ui/react-native-components';

<EmptyState
    title={'Nothing Found'}
    description={'Not a single thing'}
    icon={{ family: 'brightlayer-ui', name: 'battery' }}
/>;
```

## API

<div style="overflow: auto">

| Prop Name   | Description                                    | Type                          | Required | Default                 |
| ----------- | ---------------------------------------------- | ----------------------------- | -------- | ----------------------- |
| title       | The primary text to display (first line)       | `ReactNode`                   | yes      |                         |
| description | The secondary text to display (second line)    | `ReactNode`                   | no       |                         |
| icon        | A component to render for the primary icon     | [`IconSource`](./Icons.md)    | no       |                         |
| iconSize    | The size of the primary icon (100-200)         | `number`                      | no       | 100                     |
| iconColor   | The color of the primary icon                  | `string`                      | no       | `theme.colors.disabled` |
| actions     | Additional components to render below the text | `JSX.Element`                 | no       |                         |
| theme       | Theme value overrides                          | `$DeepPartial<ExtendedTheme>` | no       |                         |

</div>

Any other props will be provided to the root element ([**View**](https://reactnative.dev/docs/view)).

### Styles

You can override the internal styles used by Brightlayer UI by passing a `styles` prop. It supports the following keys:

| Name        | Description                               |
| ----------- | ----------------------------------------- |
| root        | Styles applied to the root element        |
| title       | Styles applied to the title element       |
| description | Styles applied to the description element |
| actions     | Styles applied to the actions element     |
