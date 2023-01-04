# Brightlayer UI React Native Components

[![](https://img.shields.io/circleci/project/github/brightlayer-ui/react-native-component-library/master.svg?style=flat)](https://circleci.com/gh/brightlayer-ui/react-native-component-library/tree/master)
![npm](https://img.shields.io/npm/v/@brightlayer-ui/react-native-components?label=%40brightlayer-ui%2Freact-native-components) [![codecov](https://codecov.io/gh/brightlayer-ui/react-native-component-library/branch/master/graph/badge.svg?token=HQ7P6R23KZ)](https://codecov.io/gh/brightlayer-ui/react-native-component-library)

This is a library of re-usable React Native components for use in Brightlayer UI applications. For the most part, these components are meant to simplify building your application by providing drop-in components that implement common use cases in Brightlayer UI and eliminate the need for multiple teams to build their own components for these.

Refer to the [Component Library](https://brightlayer-ui-components.github.io/react-native/?path=/story/intro-welcome--to-brightlayer-ui) API documentation site for a list of available components or see the repository [documentation](https://github.com/brightlayer-ui/react-native-component-library/tree/master/docs) for each individual component.

## Installation

To install the Brightlayer UI react native components from NPM as a dependency for your project, you can run the following command in your project root:

```
yarn add @brightlayer-ui/react-native-components
```

> **NOTE**: This install command will install the package from NPM. If you are a Brightlayer UI developer working with components locally, you will want to follow the manual linking instructions - see below.

### Peer Dependencies

This library has a few dependencies that you will need to install in your project in order to work correctly. To install them, you can run the following command in your project root:

```shell
npm install --save react-native-paper@^4.0.0 react-native-safe-area-context@^3.0.0 react-native-vector-icons@^8.0.0 react-native-modal@^12.0.0
// or
yarn add react-native-paper@^4.0.0 react-native-safe-area-context@^3.0.0 react-native-vector-icons@^8.0.0 react-native-modal@^12.0.0
```

> **NOTE**: react-native-paper@^5.0.0 is currently available, however, we only support RNP v4 at this time. Please be sure to keep peer-dependencies aligned as defined above to avoid potential conflicts.

## Building the Library

To work with this library, first clone down the repository and install dependencies:

```
git clone https://github.com/brightlayer-ui/react-native-component-library
cd react-native-component-library
```

The library can be built by running the following command. The resulting output will be in the /dist folder.

```
yarn build
```

## Running the demo projects

This repository comes with three demo projects found within the `/demos` folder.
The first is a [Storybook](https://storybook.js.org/) application that allows you to see the components in isolation and interact with their properties. The second is a Showcase project that shows a combination of components in the context of a realistic interface. The third project is our api documentation.

You can build, link, and start the demo applications in a single step by calling from the root directory either

```
yarn start:showcase
```

to start a project demo, or

```
yarn start:storybook
```

to start an interactive component documentation (will run on a device or a simulator), or

```
yarn start:storybook-api
```

to bring up a API documentation website (no interactive components).

## Using the Components

See the [documentation](https://github.com/brightlayer-ui/react-native-component-library/tree/master/docs) for information on using these components.

### Upgrading from version 5 -> 6

Version 6 of this library is a major update with several breaking changes. Most notably, the `IconClass` prop found in most components has been replaced by `icon` and supports more icon formats.

Versions 5.3.x -> 5.4.x have been updated to include warning messages if you are using any deprecated props. We recommend upgrading to 5.4.x and addressing these warnings before upgrading to version 6.

Version 6 also includes a new set of [wrappers](./components/src/themed) around a subset of [React Native Paper](https://callstack.github.io/react-native-paper/index.html) components to provide the correct styles. In order to get the correct appearance, you should use these themed wrapper components instead of the components directly from RNP. These wrapper components should be used in conjunction with version 6+ of [@brightlayer-ui/react-native-themes](https://www.npmjs.com/package/@brightlayer-ui/react-native-themes), which consolidated our blueDark and blueDarkAlt themes into a single theme for simpler usage.

## NOTES

This component library relies on [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) and [@brightlayer-ui/react-native-vector-icons](https://github.com/brightlayer-ui/icons/tree/master/rn-vector) - these libraries must be installed in your project in order to use the Brightlayer UI components.

Additionally, if using [@brightlayer-ui/icons-svg](https://github.com/brightlayer-ui/icons), SVGs must be transformed using [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer). Follow the instructions on their readme for setting up or start your project using the Brightlayer UI [CLI](https://www.npmjs.com/package/@brightlayer-ui/cli) and this will be configured for you automatically.
