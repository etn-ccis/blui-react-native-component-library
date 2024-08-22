# Change Log
## v8.0.5 

### Added

-   Added `chevronColor` prop to InfoListItem


## v8.0.4 (July 22, 2024)

### Added

-   The `<Autocomplete>` is a component that features a standard text input accompanied by a list of suggested options.
-   Added `activeChevronColor` and `chevronColor` prop to Drawer Component

### Fixed

-   Drawer not using activeFontColor and chevron duplicacy. ([#597](https://github.com/etn-ccis/blui-react-native-component-library/issues/597)).
-   Icon Switch Component is not updating Value in Value Prop. ([#608](https://github.com/etn-ccis/blui-react-native-component-library/issues/608))

## v8.0.3 (May 10, 2024)

### Fixed

-   Removed font-weight from `<ListItemTag>` component to work properly on Android ([#557](https://github.com/etn-ccis/blui-react-native-component-library/issues/557)).

## v8.0.2 (March 8, 2024)

### Changed

-   `title` and `description` props types to `ReactNode` in `<EmptyState>` component ([#546](https://github.com/etn-ccis/blui-react-native-component-library/issues/546)).

## v8.0.1 (February 9, 2024)

### Fixed

-   Header contents not displaying correctly for tablets in landscape mode. ([#531](https://github.com/etn-ccis/blui-react-native-component-library/issues/531)).
-   Icon alignment in `<InfoListItem>` component.

### Changed

-   Updated the dependency on `@brightlayer-ui/react-native-themes`.

### Added

-   The migration guide for deprecated `Typography` components.

## v8.0.0 (January 12, 2024)

Version 8 utilizes [React Native Paper v5](https://callstack.github.io/react-native-paper/) with [Material Design v3](https://m3.material.io/) and is a major update with several changes. Most particularly, both `Typography` and `IconWrapper` components have been removed, and 5 new components have been added. All previously-introduced themed components have removed in this version too. Please follow the [migration guide](./MIGRATION.md) for more details.

### Added

-   `<Chip>` as a better alternative to React Native Paper's [Chip](https://callstack.github.io/react-native-paper/docs/components/Chip/) component.
-   `<Grade>` is a customizable [avatar](https://callstack.github.io/react-native-paper/4.0/avatar-text.html)-based component that represents different grades
-   `<Icon/>` as a replacement for IconWrapper.
-   `<IconSwitch>` as a better alternative to React Native Paper's [Switch](https://callstack.github.io/react-native-paper/docs/components/Switch/) component.
-   `<Overline>` as a replacement for the overline variant in Typography, which was removed in Material Design 3.

### Changed

-   To support React Native Paper V5 with Material Design 3
-   The default direction of `IconFamily` to `rtl` ([#180](https://github.com/etn-ccis/blui-react-native-component-library/issues/180)).
-   The default icon background color for Hero changed from `theme.colors.surface` to 'transparent'.

## v7.1.0 (April 12, 2023)

### Fixed

-   Issue with extra large accessibility sizes on iOS ([#224](https://github.com/etn-ccis/blui-react-native-component-library/issues/224)).
-   Issue with the `<Header>` not blending behind the StatusBar on android devices ([#186](https://github.com/etn-ccis/blui-react-native-component-library/issues/186)).

### Added

-   Added custom children to render inside the header ([#288](https://github.com/etn-ccis/blui-react-native-component-library/issues/288)).
-   `InfoListItemProps` prop to `<DrawerNavItem>` component ([#252](https://github.com/etn-ccis/blui-react-native-component-library/issues/252)).
-   `titleDivider` prop to `<DrawerNavGroup>` component ([#187](https://github.com/etn-ccis/blui-react-native-component-library/issues/187)).
-   `onPress` prop to `<DrawerHeader>` component ([#84](https://github.com/etn-ccis/blui-react-native-component-library/issues/84)).
-   `wrapTitle`, `wrapSubtitle` and `wrapInfo` props to `<InfoListItem>` component ([#168](https://github.com/etn-ccis/blui-react-native-component-library/issues/168)).
-   Support for all the scroll components to `<CollapsibleHeaderLayout>` ([#218](https://github.com/etn-ccis/blui-react-native-component-library/issues/218)).

### Changed

-   Updated the `<Modal>` within the `<BottomSheet>` component to use the `statusBarTranslucent` prop by default.
-   Allowed chevron and right component in `<InfoListItem>` to be displayed at the same time ([#312](https://github.com/etn-ccis/blui-react-native-component-library/issues/312)).
-   Updated test cases for `<UserMenu>` component [#106](https://github.com/etn-ccis/blui-react-native-component-library/issues/106)).

## v7.0.0 (October 17, 2022)

### Changed

-   Update to build with react-native 0.70.0.
-   This package now requires that you are using react-native-vector-icons version 9.0.0 or higher in your project.

## v6.0.3 (August 4, 2022)

### Added

-   Added `testID` and `accessibilityLabel` to `<InfoListItem>`, `<Header>`, `<HeaderActionItems>`, and `<HeaderNavigationIcon>` for easy access in UI and E2E tests.

### Fixed

-   Issue with `<MobileStepper>` default dark theme fill color ([#276](https://github.com/etn-ccis/blui-react-native-component-library/issues/276)).
-   Issue with `<Header>` default backgroundImage size ([#228](https://github.com/etn-ccis/blui-react-native-component-library/issues/228)).
-   Issue with `<Header>` title cutting off the top of CJK characters ([#156](https://github.com/etn-ccis/blui-react-native-component-library/issues/156)).

## v6.0.2 (December 17, 2021)

### Changed

-   Changed license to Eaton.

## v6.0.1 (November 10, 2021)

### Changed

-   Changed package namespace from `@pxblue` to `@brightlayer-ui`.

## Package Migration Notice

Previous versions listed after this indicator refer to our deprecated `@pxblue` packages.

---

## v6.0.1 (October 26, 2021)

### Fixed

-   Issue with missing color fallback values ([#214](https://github.com/etn-ccis/blui-react-native-component-library/issues/214)).
-   Issue regarding inability to set ref on `<ThemedTextInput>` ([#213](https://github.com/etn-ccis/blui-react-native-component-library/issues/213)).

## v6.0.0 (October 1, 2021)

Version 6 of this library is a major update with several breaking changes. Most notably, the `IconClass` prop found in most components has been replaced by `icon` and supports more icon formats.

Versions 5.3.x -> 5.4.x have been updated to include warning messages if you are using any deprecated props. We recommend upgrading to 5.4.x and addressing these warnings before upgrading to version 6.

Version 6 also includes a new set of wrappers around a subset of [React Native Paper](https://callstack.github.io/react-native-paper/index.html) components to provide the correct styles. In order to get the correct appearance, you should use these themed wrapper components instead of the components directly from RNP. These wrapper components should be used in conjunction with version 6+ of [@brightlayer-ui/react-native-themes](https://www.npmjs.com/package/@brightlayer-ui/react-native-themes), which consolidated our blueDark and blueDarkAlt themes into a single theme for simpler usage.

### Fixed

-   Issue with `<UserMenu>` that would not apply `fontColor`, `iconColor`, and `backgroundColor` appropriately via `menuItems` prop object.

### Added

-   New peerDependency on [@brightlayer-ui/react-native-vector-icons](https://www.npmjs.com/package/@brightlayer-ui/react-native-vector-icons).
-   [Wrapper components](https://github.com/etn-ccis/blui-react-native-component-library/tree/master/components/src/themed) for various [React Native Paper](https://callstack.github.io/react-native-paper/index.html) components. These greatly simplify the theming mechanism for using our dark theme, but does require updating to version 6+ of our [@brightlayer-ui/react-native-themes](https://www.npmjs.com/package/@brightlayer-ui/react-native-themes) package.
-   `unitSpace` prop to `<ChannelValue>` to manage spacing between the value and units.

### Changed

-   `IconClass` prop for most components has been renamed to `icon` for clarification and has bee extended to support a wider variety of icon formats (see [Icons](https://github.com/etn-ccis/blui-react-native-component-library/blob/master/docs/Icons.md)]).
-   In `<Hero>` component, `ValueIconClass` prop has been renamed to `valueIcon`.
-   In `<ChannelValue>` component, `IconProps` has been replaced with separate props for `iconSize` and `iconColor`.
-   In `<Hero>` component, `fontSize`, `value`, `valueIcon`, `valueColor` and `units` props have been replaced by `ChannelValueProps` prop, which will allow you to specify any props on the underlying `<ChannelValue>` component.
-   In `<DrawerHeader>` component, `icon` prop has been split into `icon` and `onIconPress` to better align with icon usage in other components.
-   In `<Header>` component, `navigation` prop has been split into `icon` and `onIconPress` to better align with icon usage in other components. The `navigationIcon` style override has been renamed to `icon`. The `avatar` style override has been renamed to `component`.
-   `color` prop for `<Typography>` components now supports any valid color string. You can still use string shortcuts for theme colors for 'primary', 'accent', 'text', 'error', and 'notification'.

### Removed

-   `IconProps` prop from `<EmptyState>` component — use `iconSize` and `iconColor` props instead.
-   `color` prop in `<ChannelValue>`, `<EmptyState>`, and `<Hero>` components no longer supports using theme keys as string. If you would like to use a value from the theme, you must pass it in as a value: `color={theme.colors.primary}` instead of `color={'primary'}`.

## v5.4.1 (October 1, 2021)

### Added

-   Deprecation warnings for the `<Hero>` component properties that will be changing in version 6.0.0.

### Fixed

-   Default `iconColor` for `<InfoListItem>` ([#183](https://github.com/etn-ccis/blui-react-native-component-library/issues/183)).
-   Update `<EmptyState>` default icon color to match the design ([#173](https://github.com/etn-ccis/blui-react-native-component-library/issues/173)).

## v5.4.0 (August 20, 2021)

### Added

-   Better component sizing for non-avatars in the `<Header>` component ([#189](https://github.com/etn-ccis/blui-react-native-component-library/issues/189)).

### Removed

-   `<Header>` actionItems no longer limited to three. However, you should still strive to limit yourself to no more than three actions in most cases.

## v5.3.0 (August 3, 2021)

### Added

-   Deprecation warnings for component properties that will be changing in version 6.0.0.

### Fixed

-   Minor sizing issue in the `<Header>` when rotating device from landscape to portrait orientation.

## v5.2.0 (July 29, 2021)

### Added

-   Improved support for using components in landscape orientation ([#76](https://github.com/etn-ccis/blui-react-native-component-library/issues/76))
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

-   Updated components to use react-native-paper theming (requires @brightlayer-ui/react-themes v5.0.0+).
-   Internal style properties are now override-able via the `styles` prop in each component.
-   `fontSize` prop for `<Hero>`, `<ChannelValue>`, and Typography components now takes a `number` instead of a string.
-   Renamed some of the typography variants (`<Label>` -> `<Body1>`, `<Subtitle>` -> `<Subtitle2>`) and added some new ones.

## v2.0.1 (October 31, 2019)

### Changed

-   PX Blue theme is no longer bundled with the component library
    -   Theme is now available from [@brightlayer-ui/themes](https://www.npmjs.com/package/@brightlayer-ui/themes)

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
