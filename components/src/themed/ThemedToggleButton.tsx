import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ToggleButton, useTheme } from 'react-native-paper';
// @ts-ignore
import { ToggleButtonGroupContext } from 'react-native-paper/lib/commonjs/components/ToggleButton/ToggleButtonGroup';
import Color from 'color';
export type ThemedToggleButtonProps = React.ComponentProps<typeof ToggleButton>;
export type ThemedToggleButtonRowProps = React.ComponentProps<typeof ToggleButton.Row>;
export type ThemedToggleButtonGroupProps = React.ComponentProps<typeof ToggleButton.Group>;

const useStyles = (
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    row: ViewStyle;
    button: ViewStyle;
    first: ViewStyle;
    middle: ViewStyle;
    last: ViewStyle;
}> =>
    StyleSheet.create({
        row: {
            flexDirection: 'row',
        },
        button: {
            borderWidth: 1,
            borderColor: theme.colors.disabled,
        },

        first: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },

        middle: {
            borderRadius: 0,
            borderLeftWidth: 0,
        },

        last: {
            borderLeftWidth: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
    });
/**
 * ThemedToggleButton component
 *
 * This component is a wrapper around the React Native Paper [ToggleButton](https://callstack.github.io/react-native-paper/toggle-button.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
const ThemedToggleButtonComponent: React.FC<ThemedToggleButtonProps> = (props) => {
    const { theme: themeOverride, style, color, ...other } = props;
    const fullTheme = useTheme(themeOverride);

    return (
        <ToggleButtonGroupContext.Consumer>
            {(context: { value: string | null; onValueChange: (value: string) => void } | null): JSX.Element => {
                const checked: boolean | null =
                    (context && context.value === props.value) || props.status === 'checked';

                const backgroundColor = fullTheme.dark
                    ? checked
                        ? Color(fullTheme.colors.primaryPalette?.dark || fullTheme.colors.primary)
                              .alpha(0.36)
                              .string()
                        : fullTheme.colors.surface
                    : checked
                    ? fullTheme.colors.primaryPalette?.light || Color(fullTheme.colors.primary).alpha(0.05).toString()
                    : fullTheme.colors.surface;

                const textColor = fullTheme.dark
                    ? checked
                        ? fullTheme.colors.primaryPalette?.main || fullTheme.colors.primary
                        : fullTheme.colors.placeholder
                    : checked
                    ? fullTheme.colors.primaryPalette?.main || fullTheme.colors.primary
                    : fullTheme.colors.textPalette?.secondary || fullTheme.colors.text;

                return (
                    <ToggleButton
                        {...other}
                        color={color || textColor}
                        style={[{ backgroundColor: backgroundColor }, style]}
                        theme={themeOverride}
                    />
                );
            }}
        </ToggleButtonGroupContext.Consumer>
    );
};

/**
 * ThemedToggleButtonRow component
 *
 * This component is a wrapper around the React Native Paper [ToggleButton.Row](https://callstack.github.io/react-native-paper/toggle-button-row.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
const ThemedToggleButtonRow: React.FC<ThemedToggleButtonRowProps> = (props) => {
    const { children, ...other } = props;
    const count = React.Children.count(children);
    const fullTheme = useTheme();
    const styles = useStyles(fullTheme);
    return (
        <ToggleButton.Row {...other}>
            {/* We have to add our wn context provider here because due to the way React Contexts work, we can't get access
      to the context provider that is specified inside of the RNP ToggleButtonGroup. So we provide our own instance with 
      the same values. */}
            <ToggleButtonGroupContext.Provider
                value={{
                    value: props.value,
                    onValueChange: props.onValueChange,
                }}
            >
                {/* We clone our ThemedToggleButton children and apply th necessary border styles to them because the RNP
        ToggleButtonRow only looks for RNP ToggleButtons to apply its styles to. */}
                {React.Children.map(children, (child, i) => {
                    // @ts-expect-error: TypeScript complains about child.type but it doesn't matter
                    if (child && child.type === ThemedToggleButtonComponent) {
                        // @ts-expect-error: We're sure that child is a React Element
                        return React.cloneElement(child, {
                            style: [
                                styles.button,
                                i === 0 ? styles.first : i === count - 1 ? styles.last : styles.middle,
                                // @ts-expect-error: We're sure that child is a React Element
                                child.props.style,
                            ],
                        });
                    }

                    return child;
                })}
            </ToggleButtonGroupContext.Provider>
        </ToggleButton.Row>
    );
};

/**
 * ThemedToggleButtonGroup component
 *
 * This component is a wrapper around the React Native Paper [ToggleButton.Group](https://callstack.github.io/react-native-paper/toggle-button-group.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
const ThemedToggleButtonGroup = ToggleButton.Group;

/**
 * ThemedToggleButton component
 *
 * This component is a wrapper around the React Native Paper [ToggleButton](https://callstack.github.io/react-native-paper/toggle-button.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const ThemedToggleButton = Object.assign(ThemedToggleButtonComponent, {
    Group: ThemedToggleButtonGroup,
    Row: ThemedToggleButtonRow,
});
