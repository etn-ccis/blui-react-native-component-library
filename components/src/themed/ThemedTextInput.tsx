import React from 'react';
import { Button } from 'react-native-paper';

export type ThemedButtonProps = Omit<React.ComponentProps<typeof Button>, 'color'>;

/**
 * ThemedButton component
 *
 * This component is a wrapper around the React Native Paper [Button](https://callstack.github.io/react-native-paper/button.html)
 * component. It accepts all the same props as the RNP component (except for color). The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedActivityIndicator: React.FC<ThemedButtonProps> = (props) => {
    return null;
};
