# Change Log

## 6.0.0 (Unreleased)

### Changed

-   `IconClass` prop for most components has been renamed to `icon` for clarification and has bee extended to support a wider variety of icon formats (see TODO).
-   In `<Hero>` component, `ValueIconClass` prop has been renamed to `valueIcon`.
-   In `<ChannelValue>` component, `IconProps` has been replaced with separate props for `iconSize` and `iconColor`.
-   In `<DrawerHeader>` component, `icon` prop has been split into `icon` and `onIconPress` to better align with icon usage in other components.
-   In `<Header>` component, `navigation` prop has been split into `icon` and `onIconPress` to better align with icon usage in other components.

### Removed

-   `IconProps` prop from `<EmptyState>` component — use `iconSize` and `iconColor` props instead.


## 5.2.0 (July 28, 2021)

### Added

-   Improved support for using components in landscape orientation ([#76](https://github.com/pxblue/react-native-component-library/issues/76))
-   Improved intellisense popup documentation with links to full component documentation.

### Removed

-   Dependency on react-native-status-bar-height

## v5.1.0 (June 21, 2021)

### Added

-   `<CollapsibleHeaderLayout>` component that resizes Header as the screen is scrolled.
-   New props for `<Header>` component (`expandedHeight`, `collapsedHeight`, `onExpand`, `onCollapse`, `scrollPosition`, `variant`) to support `<CollapsibleHeaderLayout>`.
-   Support for `ReactNode` content in `<Header>` `title`, `subtitle`, and `info` props.

### Fixed

-   `<ScoreCard>` component now extends the `<Card>` components from React Native Paper.

### Changed

-   Updated styles for `<Header>`, `<MobileStepper>`, and `<UserMenu>` to work better with Dark Themes.

## v5.0.0 (March 30, 2021)

### Changed

-   Some of the style names for overrides have changed or moved
-   Updated Caption fontSize to be 12
-   Some default styles for `<EmptyState>` components.
-   Components will be responsive to the system font size.
-   `icon` prop of the `<DrawerHeader>` now accepts a `HeaderIcon` type instead of a `JSX.Element` to match the implementation in `<Header>`.

### Added

-   Additional configuration properties for `<Drawer>`:
    -   `disableActiveItemParentStyle` disables the bold text style for active item's parent elements.
-   Additional configuration properties for `<DrawNavGroup>`
    -   `titleColor` changes the color of the group title text.
-   Ability to build `<Drawer>` contents declaratively instead of using `items` prop.

## v4.1.1 (March 18, 2021)

### Fixed

-   Missing dependency on react-native-modal

## v4.1.0 (February 9, 2021)

### Added

-   `<MobileStepper>` component for moving between pages.
-   `<UserMenu>` component to display an avatar that opens up a bottomsheet menu.
-   `leftComponent` prop to `<InfoListItem>`.
-   Ability to use Avatar in `<Header>` actionItems.

### Changed

-   Updated styles for the `<Drawer>`.

## v4.0.0 (December 10, 2020)

### Added

-   Adds `hidden` prop to the Drawer `NavItem` to conditionally hide elements in the Drawer.

### Changed

-   Text styles of the `<ListItemTag>` updated slightly.
-   Updated to use React Native Paper version 4+.

### Fixed

-   Fixes `rightComponent` prop for Drawer `NavItem` to render content on the right side of the Drawer NavItem.

## v3.1.1 (September 29, 2020)

### Fixed

-   Fixes some icon flipping behavior in `<Header>` for RTL.

## v3.1.0 (August 17, 2020)

### Added

-   RTL Support
    -   Components/Text/Icons will change directions correctly based on the current language selection on device.
    -   IconWrapper allows you to easily flip icons that you supply to PX Blue components.
-   New component for `<ListItemTag>` and `<Spacer>`.
-   Adds `iconAlign` prop to `<InfoListItem>` to align icons left (default), center or right.

### Changed

-   Upgraded dependencies to latest version of react-native-safe-area-context.
    -   To use with an Expo project you'll need to be using v38+ of the Expo SDK.

## v3.0.1 (June 30, 2020)

### Added

-   New component for `<Drawer>`.
-   Adds `info` prop to `<InfoListItem>` to support a third line of text.

### Changed

-   Updated components to use react-native-paper theming (requires @pxblue/react-themes v5.0.0+).
-   Internal style properties are now override-able via the `styles` prop in each component.
-   `fontSize` prop for `<Hero>`, `<ChannelValue>`, and Typography components now takes a `number` instead of a string.
-   Renamed some of the typography variants (`<Label>` -> `<Body1>`, `<Subtitle>` -> `<Subtitle2>`) and added some new ones.

## v2.0.1 (October 31, 2019)

### Changed

-   PX Blue theme is no longer bundled with the component library
    -   Theme is now available from [@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes)

## v1.1.0 (October 29, 2019)

### Added

-   Adds new components for:
    -   EmptyState
    -   Header
    -   InfoListItem
    -   ScoreCard

### Changed

-   Minor styling updates to existing typography elements and themes.

## v1.0.2 (October 11, 2019)

### Changed

-   Updated typography elements.

## v0.0.1 (August 22, 2019)

Initial alpha release.
