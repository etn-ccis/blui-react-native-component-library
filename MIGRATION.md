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
    - This component has been removed from the library can be replaced by [Text](https://callstack.github.io/react-native-paper/docs/components/Text/) component from React Native Paper.
- IconWrapper
    - Icons no longer requires a wrapper function. Please refer to [icons usage guidelines](./docs/Icons) for more info.
- Themed Components
    - All the themed components have been removed, as we have updated all the components with the Brightlayer UI's required styles and themes.

## Notes

<!-- TODO : Add a link to style override guide, once BLUI-5027 is done -->
A few React Native Paper components require additional style overrides to match Brightlayer UI's design specifications. To learn more about these style overrides, please follow [the guidelines](#).
