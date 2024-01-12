# List Item Tag

`<ListItemTag>` is a text item with a colored background and rounded corners that is used to tag lists.

<img width="300" style="max-width: 600px; display: block;" alt="List Item Tag" src="./images/listItemTag.png">

## Usage

```tsx
import { ListItemTag } from '@brightlayer-ui/react-native-components';

<ListItemTag label={'IN PROGRESS'} />
<ListItemTag label={'Foo Bar'} backgroundColor={'gold'} fontColor={'black'} />
```

## API

<div style="overflow: auto;">

| Prop Name       | Description                   | Type                          | Required | Default                                 |
| --------------- | ----------------------------- | ----------------------------- | -------- | --------------------------------------- |
| backgroundColor | Background color of the label | `string`                      | no       | `theme.colors.primaryFilledContainer`   |
| fontColor       | Text color for the label      | `string`                      | no       | `theme.colors.onPrimaryFilledContainer` |
| fontSize        | Size of the text              | `number`                      | no       | 10                                      |
| label           | The label text                | `string`                      | yes      |                                         |
| theme           | Theme value overrides         | `$DeepPartial<ExtendedTheme>` | no       |                                         |

</div>

Any other props will be provided to the root element [`<Text>`](https://callstack.github.io/react-native-paper/docs/components/Text).

### Styles

You can override the internal styles used by Brightlayer UI by passing a `styles` prop. It supports the following key:

| Name | Description                        |
| ---- | ---------------------------------- |
| root | Styles applied to the root element |
