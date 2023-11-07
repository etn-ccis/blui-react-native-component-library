# Grade Component

The `Grade` component is a customizable avatar-based component that represents different grades. It allows you to display a label with a specified background color and font color.

<img width="110" alt="Gradecomponent" src="./images/grade.png">

## Usage

```tsx
import { Grade } from '@brightlayer-ui/react-native-components';

<Grade label={'CS'} fontColor="#FFFFFF" backgroundColor="#198900" size={40} />;

```

### Grade API

| Prop Name           | Description                                | Type                                   | Required | Default                |
| ------------------- | ------------------------------------------ | -------------------------------------- | -------- | ---------------------- |
| label               | The text shown in Grade                    | string                                 | yes      |                        |
| fontColor           | The color of the text label.               | string                                 | no       | theme.colors.onPrimary |
| backgroundColor     | The background color of Grade              | string                                 | no       | theme.colors.primary   |
| size                | The radius of Grade component              | number                                 | no       | 40                     |
| theme           	  | Theme value overrides                      | `$DeepPartial<ReactNativePaper.Theme>` | no       |         				|


## Grade Subcomponent

The subcomponents gives you a set of preconfigured components that can directly be used for specific grades with in-built styling.

<img width="110" style="max-width: 200px; display: block;" alt="grade subcomponent" src="./images/gradesSubcomponent.png">

### Grade Subcomponents USAGE

```tsx
import Grade from '@brightlayer-ui/react-native-components';
<View> 
	<Grade.APlus /> {/* Renders A+ grade */} 
	<Grade.A /> {/* Renders A grade */} 
	<Grade.AMinus /> {/* Renders A- grade */}
	<Grade.BPlus/> {/* Renders B+ grade */}
	<Grade.B/> {/* Renders B grade */}
	<Grade.BMinus/> {/* Renders B- grade */}
	<Grade.CPlus/> {/* Renders C+ grade */}
	<Grade.C/> {/* Renders C grade */}
	<Grade.CMinus/> {/* Renders C- grade */}
	<Grade.DPlus/> {/* Renders D+ grade */}
	<Grade.D/> {/* Renders D grade */}
	<Grade.DMinus/> {/* Renders D- grade */}
	<Grade.F/> {/* Renders F grade */}
</View>
```
### Grade Subcomponents API

All Grade Subcomponents have the following Props

| Prop Name           | Description                                | Type                                   | Required | Default                |
| ------------------- | ------------------------------------------ | -------------------------------------- | -------- | ---------------------- |
| size                | The radius of Grade component              | number                                 | No       | 40                     |

### Styles

You can override the internal style used by Brightlayer UI by passing a `style` prop. 
