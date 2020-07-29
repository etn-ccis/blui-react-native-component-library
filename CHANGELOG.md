# Change Log

## v3.1.0
- Added RTL support
    - Components/Text/Icons will change directions correctly based on the current language selection on device
    - IconWrapper allows you to easily flip icons that you supply to PX Blue components
- Upgraded dependencies to latest version of react-native-safe-area-context
    - To use with an Expo project you'll need to be using v38+ of the Expo SDK

## v3.0.0
- Updated components to use react-native-paper theming (requires @pxblue/react-themes v5.0.0+)
- Added new component for `<Drawer>`
- Internal style properties are now overridable via the `styles` prop in each component.
- `fontSize` prop for `<Hero>`, `<ChannelValue>`, and Typography components now takes a `number` instead of a string.
- Adds `info` prop to `<InfoListItem>` to support a third line of text.
- Renamed some of the typography variants (`<Label>` -> `<Body1>`, `<Subtitle>` -> `<Subtitle2>`) and added some new ones.

## v2.0.0
- PX Blue theme is no longer bundled with the component library
    - Theme is now available from [@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes)

## v1.1.0
Adds new components for:
- EmptyState
- Header
- InfoListItem
- ScoreCard

as well as minor styling updates to existing typography elements and themes.

## v1.0.2
- Updated typography elements

## v0.0.1
Initial alpha release
