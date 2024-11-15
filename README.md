# Brightlayer UI React Native Components

[![Build](https://github.com/etn-ccis/blui-react-native-component-library/actions/workflows/blui-ci.yml/badge.svg?branch=master)](https://github.com/etn-ccis/blui-react-native-component-library/actions/workflows/blui-ci.yml)
![npm](https://img.shields.io/npm/v/@brightlayer-ui/react-native-components?label=%40brightlayer-ui%2Freact-native-components) [![codecov](https://codecov.io/gh/etn-ccis/blui-react-native-component-library/branch/master/graph/badge.svg?token=HQ7P6R23KZ)](https://codecov.io/gh/etn-ccis/blui-react-native-component-library)

This is a library of re-usable React Native components for use in Brightlayer UI applications. For the most part, these components are meant to simplify building your application by providing drop-in components that implement common use cases in Brightlayer UI and eliminate the need for multiple teams to build their own components for these.

Refer to the [Component Library API documentation](https://brightlayer-ui-components.github.io/react-native) site for a list of available components or see the repository documentation for each individual component.

## Installation

To install the Brightlayer UI react native components from NPM as a dependency for your project, you can run the following command in your project root:

```
yarn add @brightlayer-ui/react-native-components
```

> **NOTE**: This install command will install the package from NPM. If you are a Brightlayer UI developer working with components locally, you will want to follow the manual linking instructions - see below.

### Peer Dependencies

This library has a few dependencies that you will need to install in your project in order to work correctly. To install them, you can run the following command in your project root:

```shell
npm install --save react-native-paper@^5.0.0 react-native-safe-area-context@^4.0.0 react-native-vector-icons@^9.0.0 @brightlayer-ui/react-native-vector-icons@^2.2.0
// or
yarn add react-native-paper@^5.0.0 react-native-safe-area-context@^4.0.0 react-native-vector-icons@^9.0.0 @brightlayer-ui/react-native-vector-icons@^2.2.0
```

## Building the Library

To work with this library, first clone down the repository and install dependencies:

```
git clone https://github.com/etn-ccis/blui-react-native-component-library
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

See the [documentation](https://brightlayer-ui-components.github.io/react-native) for information on using these components.

### Upgrading to version 8

Version 8 utilizes [React Native Paper v5](https://callstack.github.io/react-native-paper/) with [Material Design v3](https://m3.material.io/) and is a major update with several changes. Most particularly, the `Typography` and `IconWrapper` components have been removed and we added 5 new components. In previous versions we exported themed components, which have been removed in this version. Please follow the [migration guide](./MIGRATION.md) for more details. 

## Notes

This component library relies on [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) and [@brightlayer-ui/react-native-vector-icons](https://github.com/etn-ccis/blui-icons/tree/master/rn-vector) - these libraries must be installed in your project in order to use the Brightlayer UI components.

Additionally, if using [@brightlayer-ui/icons-svg](https://github.com/etn-ccis/blui-icons), SVGs must be transformed using [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer). Follow the instructions on their readme for setting up or start your project using the Brightlayer UI [CLI Templates](https://github.com/etn-ccis/blui-react-native-cli-templates/blob/master/README.md) and this will be configured for you automatically.
