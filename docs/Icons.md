# Using Icons in PX Blue React Native Components

Many PX Blue components support the use of icons. These components will support passing in an icon in a variety of different formats.

## Icon Object

The simplest way to use a icon in a component is to specify the icon as a simple object. The object syntax takes a `family` and a `name`. Supported family values include 'pxblue', 'material', and 'material-community'. When specifying 'pxblue', icons will be drawn from the [@pxblue/react-native-vector-icons](https://www.npmjs.com/package/@pxblue/react-native-vector-icons) package. When specifying 'material' or 'material-community, icons will be drawn from the [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) package. The default family is 'material.'

```tsx
<Component icon={{family: 'pxblue', name: 'device'}} />
<Component icon={{family: 'material-community', name: 'chart-pie'}} />
<Component icon={{name: 'settings'}} />
```

## Inline Functional Component

You can also use an inline functional component to render other components. This can be especially useful if you want to render something other than a Material, Material Community, or PX Blue icon, such as a progress icon. The functional component should support props for:

```tsx
{
    size?: number; // what size to draw the component / icon
    color?: string; // what color to use for the component / icon
    allowFonScaling?: boolean; // if the icon / component should scale with the device font size
    direction?: 'rtl' | 'ltr'; // the current device text direction (for flipping components if necessary for RTL languages)
}
```

PX Blue components will pass these values to you for use in your component to achieve the correct appearance. It is your responsibility to apply them.

```tsx
import { PixelRatio } from 'react-native';
import { Battery } from '@pxblue/react-native-progress-icons';

// A component that doesn't need to scale with font or flip directions
<Component icon={
    ({size, color}) => (
        <Battery percent={50} size={size} color={color} />
    )}
/>
// A component that DOES need to scale with font and flip directions
<Component icon={
    ({size, color, allowFontScaling, direction}) => (
        <FlippableIcon
            size={size * (allowFontScaling ? PixelRatio.getFontScale() : 1)}
            color={color}
            style={direction === 'rtl' ? {transform: [{ scaleX: -1 }]} : {}}
        />
    )}
/>
```

## Wrapped Icon

You can use the [IconWrapper](./IconWrapper.md) utility to create a functional component that matches the signature required for the inline option above.

> **NOTE:** This was previously the only way to pass icons to PX Blue components. With the introduction of the newer options in version 6.0.0, this method is no longer recommended and will be deprecated in the future.

```tsx
import Leaf from '@pxblue/icons-svg/leaf.svg';
const LeafIcon = wrapIcon({ IconClass: Leaf });

<ComponentName icon={LeafIcon} />;
```

## JSX Element

You can also pass a JSX Element directly to the icon for a component. This is a very convenient way to pass icons, but you must be very careful with the size and color of elements passed in this way. Because you are not receiving props from the PX Blue component (as you do with the inline functional component), you are fully responsible for making sure that icons match the specs outlined in the documentation.

```tsx
<ComponentName icon={<SomeOtherComponent size={correctSizeForComponent} color={correctColorForComponent} />} />
```

## String

In some rare cases, you may wish to pass a simple string (e.g., a single letter or number) as the icon for a component. In this case, you may pass a string directly to the icon prop. This can also be used to render emoji icons.

```tsx
<ComponentName icon={'A'} />
<ComponentName icon={'🍇'} />
```

## Image Source

The icon prop will also support images in various formats, either from local resources or from the web.

```tsx
<Component icon={{ uri: 'https://raw.githubusercontent.com/pxblue/icons/dev/png/png48/account_settings_black500_48dp.png' }} />
<Component icon={require('./path/to/image.png')} />
```