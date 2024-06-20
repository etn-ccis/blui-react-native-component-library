# AutoComplete

The Autocomplete is a component that features a standard text input accompanied by a list of suggested options. In this component, users can select an option from the available list. After selection, it will appear as a chip component with a delete icon inside the text input. Users can add new options by typing inside the input, and upon clicking on it, the new option should be available in the options list.

<img width="250" style="max-width:400px" alt="Autocomplete" src="./images/autocomplete.png">

## Usage

```tsx
import { AutoComplete } from '@brightlayer-ui/react-native-components';

<AutoComplete helperText="helper text" value={['tag1']} options={['tag1', 'tag2', 'tag3', 'tag4']} />;
```

note: this component should be wrapped inside scroll view with the following props

```nestedScrollEnabled:true,
   keyboardShouldPersistTaps:"handled"
```

## API

<div style="overflow: auto">

| Prop Name              | Description                                                                                   | Type                          | Required | Default |
| ---------------------- | --------------------------------------------------------------------------------------------- | ----------------------------- | -------- | ------- |
| helperText             | Text to display the Helper Text                                                               | `string`                      | yes      |         |
| options                | List of Options to show in dropdown                                                           | `string[]`                    | no       |         |
| tagInputFieldProps     | Props to spread to the TextInput component                                                    | `TextInputProps`              | no       |         |
| chipProps              | Props to spread to the Chip component                                                         | `ChipProps`                   | no       |         |
| limitTags              | Number of Chip to be shown                                                                    | `number`                      | no       | 6       |
| limitCharacterCountTag | Number of character count for a Chip                                                          | `number`                      | no       | 16      |
| onChange               | Callback for when the text in the Textinput changes                                           | `function`                    | no       |         |
| onDelete               | Callback for when the chip close icon is clicked                                              | `function`                    | no       |         |
| disabled               | Prop to disable the AutoComplete Component                                                    | `boolean`                     | no       | false   |
| value                  | List of pre-populated chips to display inside TextField                                       | `string[]`                    | no       |         |
| addCustomTag           | Prop to let user pass a custom text to chip (inCase of false can only pass text from options) | `boolean`                     | no       | false   |
| theme                  | Theme value overrides specific to this component                                              | `$DeepPartial<ExtendedTheme>` | no       |         |

</div>

### Styles

You can override the internal styles used by Brightlayer UI by passing a `styles` prop. It supports the following keys:

| Name               | Description                                      |
| ------------------ | ------------------------------------------------ |
| root               | Styles applied to the root element               |
| textInputContainer | Styles applied to the textInputContainer element |
| chip               | Styles applied to the chip element               |
| textInput          | Styles applied to the textInput element          |
| dropdownContainer  | Styles applied to the dropdownContainer element  |
| dropdownItem       | Styles applied to the dropdownItem element       |
| helperContainer    | Styles applied to the helperContainer element    |
| helperText         | Styles applied to the helperText element         |
| helperCounter      | Styles applied to the helperCounter element      |
