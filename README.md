# PX Blue React Native Components

[![](https://img.shields.io/circleci/project/github/pxblue/react-native-component-library/master.svg?style=flat)](https://circleci.com/gh/pxblue/react-native-component-library/tree/master)
![npm](https://img.shields.io/npm/v/@pxblue/react-native-components?label=%40pxblue%2Freact-native-components)

This is a library of re-usable React Native components for use in PX Blue applications. For the most part, these components are meant to simplify building your application by providing drop-in components that implement common use cases in PX Blue and eliminate the need for multiple teams to build their own components for these.

Refer to the [Component Library](https://pxblue-components.github.io/react-native/?path=/story/intro-welcome--to-pxblue) API documentation site for a list of available components or see the repository [documentation](https://github.com/pxblue/react-native-component-library/tree/dev/docs) for each individual component.

## Installation

To install the PX Blue react native components from NPM as a dependency for your project, you can run the following command in your project root:

```
yarn add @pxblue/react-native-components
```

> **NOTE**: This install command will install the package from NPM. If you are a PX Blue developer working with components locally, you will want to follow the manual linking instructions - see below.

## Building the Library

To work with this library, first clone down the repository and install dependencies:

```
git clone https://github.com/pxblue/react-native-component-library
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

See the [documentation](https://github.com/pxblue/react-native-component-library/tree/dev/docs) for information on using these components.

## NOTES

This component library relies on [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - this library must be installed in your project in order to use the PX Blue components.

Additionally, if using [@pxblue/icons-svg](https://github.com/pxblue/icons), SVGs must be transformed using [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer). Follow the instructions on their readme for setting up.
