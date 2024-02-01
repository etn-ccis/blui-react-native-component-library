# Upgrading from v7 to v8

## Dependency Updates

First, update your `@brightlayer-ui/react-native-components` dependency to the latest version.

```shell
npm install --save @brightlayer-ui/react-native-components@^8.0.0
// or
yarn upgrade @brightlayer-ui/react-native-components@^8.0.0
```

You also need to update `@brightlayer-ui/react-native-themes`, `react-native`, and `react-native-paper`.

```shell
npm install --save @brightlayer-ui/react-native-themes@^7.0.0 @brightlayer-ui/colors@^4.0.0 react-native@0.72.3 react-native-paper@^5.0.0

// or

yarn upgrade @brightlayer-ui/react-native-themes@^7.0.0 @brightlayer-ui/colors@^4.0.0 react-native@0.72.3 react-native-paper@^5.0.0
```

## Color Updates

The Brightlayer UI color palette underwent major changes to reflect Material Design 3's new color structure. Please follow the [migration guide](https://github.com/etn-ccis/blui-colors/blob/master/README.md#migration-from-v3-to-v4) for more details.

## Themes Updates

You need to update `@brightlayer-ui/react-native-themes` to v7+ to make it work with `@brightlayer-ui/react-native-components` v8. Please follow the [migration guide](https://github.com/etn-ccis/blui-react-native-themes/blob/master/README.md#upgrading-from-version-6---7) for more details.

## Components Updates

In version 8 of this library, the following components have been added or removed:

### Added

- [Chip](./docs/Chip.md), as a better alternative to React Native Paper's [Chip](https://callstack.github.io/react-native-paper/docs/components/Chip/) component.
- [Grade](./docs/Grade.md).
- [Icon](./docs/Icons#icon-as-a-component.md), as a replacement for IconWrapper.
- [IconSwitch](./docs/IconSwitch.md), as a better alternative to React Native Paper's [Switch](https://callstack.github.io/react-native-paper/docs/components/Switch/) component.
- [Overline](./docs/Overline.md), as a replacement for the overline variant in Typography, which was removed in Material Design 3.

### Removed

- Typography
    - These components have been removed from the library and can be replaced by the [Text](https://callstack.github.io/react-native-paper/docs/components/Text/) component from React Native Paper.
    - `Text` component does not support the `color` prop. It must be styled through the `style` prop and passing the value from the `theme` object returned by [useExtendedTheme()](https://github.com/etn-ccis/blui-react-native-themes?tab=readme-ov-file#typescript).
    - Please follow the table below for the mapping of Typography and it's replacement:

<div style="overflow: auto">

| Typography            | Replacement                                                           | 
| --------------------- | --------------------------------------------------------------------- | 
| \<H1>Your Text\</H1>    | <Text variant={'displayLarge'} style={{fontSize: 96, letterSpacing: 0}}>Your Text\</Text>| 
| \<H2>Your Text\</H2>    | <Text variant={'displayMedium'} style={{fontSize: 60}}>Your Text\</Text>| 
| \<H3>Your Text\</H3>    | <Text variant={'displaySmall'} style={{fontSize: 48}}>Your Text\</Text>| 
| \<H4>Your Text\</H4>    | <Text variant={'headlineLarge'} style={{fontSize: 34}}>Your Text\</Text>| 
| \<H5>Your Text\</H5>    | <Text variant={'headlineMedium'} style={{fontSize: 24}}>Your Text\</Text>| 
| \<H6>Your Text\</H6>    | <Text variant={'headlineSmall'} style={{fontSize: 20, fontWeight: 600}}>Your Text\</Text>| 
| \<Body1>Your Text\</Body1>    | <Text variant={'bodyLarge'} style={{letterSpacing: 0}}>Your Text\</Text>| 
| \<Body2>Your Text\</Body2>    | <Text variant={'bodyMedium'}>Your Text\</Text>| 
| \<Label>Your Text\</Label>    | <Text variant={'bodyLarge'} style={{letterSpacing: 0}}>Your Text\</Text>| 
| \<Subtitle1>Your Text\</Subtitle1>    | <Text variant={'titleMedium'} style={{letterSpacing: 0}}>Your Text\</Text>|
| \<Subtitle2>Your Text\</Subtitle2>    | <Text variant={'titleSmall'} style={{letterSpacing: 0}}>Your Text\</Text>| 
| \<Button>Your Text\</Button>    | <Text variant={'labelLarge'} style={{letterSpacing: 0}}>Your Text\</Text>| 
| \<Caption>Your Text\</Caption>    | <Text variant={'bodySmall'}>Your Text\</Text>| 
| \<Overline>Your Text\</Overline>    | [\<Overline>Your Text\</Overline>](./docs/Overline.md)| 

</div>

> **NOTE**: The typography structure in Material Design 2 and Material Design 3 will not be a one-to-one mapping. It is better to reach out to a UI designer (especially for heading texts) if your project will be completely designed and developed in Material Design 3.
    
- IconWrapper
    - Icons no longer requires a wrapper function. Please refer to [icons usage guidelines](./docs/Icons) for more info.
- Themed Components
    - All the themed components have been removed, as we have updated all the components with the Brightlayer UI's required styles and themes.

## Notes

A few React Native Paper components require additional style overrides to match Brightlayer UI's design specifications. To learn more about these style overrides, please follow [the guidelines](https://github.com/etn-ccis/blui-react-native-themes/blob/master/RNPComponents/RNPComponents.md).
