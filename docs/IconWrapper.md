# Icon Wrapper

The Icon Wrapper is a utility that allows the PX Blue components to interact nicely with SVG icons from [`react-native-vector-icons`](https://www.npmjs.com/package/react-native-vector-icons) and [`@pxblue/icons-svg`](https://www.npmjs.com/package/@pxblue/icons-svg). Several components in this library accept a `IconClass` property of the type `React.ComponentType<{ size: number, color: string }>`. This allows the icon to be parameterized while allowing the library component to control the icon's size and color.

However, the recommended icon libraries, `@pxblue/icons-svg` and `react-native-vector-icons`, do not conform to this shape. Therefore, this utility exports `wrapIcon`, a Higher Order Component that can be used to convert them.

### Usage (@pxblue/icons-svg)

```tsx
import Leaf from '@pxblue/icons-svg/leaf.svg';
const LeafIcon = wrapIcon({ IconClass: Leaf });
...
<ComponentName IconClass={LeafIcon}></ComponentName>
```

### Usage (react-native-vector-icons)

Icons from `react-native-vector-icons` require a class and a name. Refer to [their documentation](https://github.com/oblador/react-native-vector-icons) for which icons are available in each set.

```tsx
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Cloud = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'cloud-off-outline' });
...
<ComponentName IconClass={Cloud}></ComponentName>
```

### RTL (Right-to-Left) Support

If you need to flip icons for use with RTL languages, you can include a boolean `flip` property when using the wrapIcon function:

```tsx
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Cloud = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'cloud-off-outline', flip: true });
```

If you want to conditionally flip icons based on the active language, you can use the `I18nManager` from react native:

```tsx
import { I18nManager } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Cloud = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'cloud-off-outline', flip: I18nManager.isRTL });
```

### Responsive Sizing

When using the `wrapIcon` function, icons will be automatically scaled relative to the current font size selected on the device. If you would like to opt out of this behavior and render a constant icon size irrespective of the device font size setting, you can pass an additional argument for `allowFontScaling`:

```tsx
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Cloud = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'cloud-off-outline', allowFontScaling: false });
```

## Notes

As with all Higher Order Components, there is a performance hit if the function is called from another component's `render` method. It is therefore advised to always call `wrapIcon()` once per Icon type, and to do so outside of any methods.
