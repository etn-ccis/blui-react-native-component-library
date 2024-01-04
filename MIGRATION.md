
# Upgrading to v8


## Update Dependencies

First, update your @brightlayer-ui/react-native-components dependency to the latest version.

```shell
npm install --save @brightlayer-ui/react-native-components@^8.0.0
// or
yarn upgrade @brightlayer-ui/react-native-components@^8.0.0
```

You also need to update @brightlayer-ui/react-native-themes, @brightlayer-ui/colors react-native and react-native-paper.

```shell
npm install --save @brightlayer-ui/react-native-themes@^7.0.0 @brightlayer-ui/colors@^4.0.0 react-native@0.72.3 react-native-paper@^5.0.0

// or

yarn upgrade @brightlayer-ui/react-native-themes@^7.0.0 @brightlayer-ui/colors@^4.0.0 react-native@0.72.3 react-native-paper@^5.0.0
```

## Themes Updates

 You need to update version 7+ of @brightlayer-ui/react-native-themes to make it work with @brightlayer-ui/react-native-components v8. To learn, please follow the [migration guide](https://github.com/etn-ccis/blui-react-native-themes/blob/master/README.md#upgrading-from-version-6---7).

## Components Updates

In version 8 of this library, following components have been added or removed:

### Added

- [Chip](./docs/Chip.md)
- [Grade](./docs/Grade.md)
- [Icon](./docs/Icon.md)
- [IconSwitch](./docs/IconSwitch.md)
- [Overline](./docs/Overline.md)

### Removed

- Typography
- IconWrapper

All the themed components have been removed.

## NOTES

<!-- TODO : Add a link to style override guide -->
There are few React Native Paper compnents which need additional styles. To learn more about style overrides, please follow [the guidelines](#).