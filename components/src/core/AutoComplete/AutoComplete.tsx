import React, { useRef, useState } from 'react';
import {
    TextStyle,
    StyleProp,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
    ViewStyle,
    TextInput as RNTextInput,
    ViewProps,
    TextInputProps,
    TouchableHighlight,
} from 'react-native';
import { HelperText, Text } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Chip, ChipProps } from '../Chip';

export type AutocompleteProps = ViewProps & {
    /** Text to display the Helper Text */
    helperText: string;
    /** List of Options to show in dropdown */
    options?: string[];
    /** Props to spread to the TextInput component. */
    tagInputFieldProps?: TextInputProps;
    /** Props to spread to the Chip component. */
    chipProps?: ChipProps;
    /** Number of Chip to be shown
     *
     *  @default: 6
     *
     */
    limitTags?: number;
    /** Number of character count for a Chip
     *
     *  @default: 16
     *
     */
    limitCharacterCountTag?: number;
    /** Callback for when the text in the Textinput changes */
    onChange?: (details?: string[]) => void;
    /** Callback for when the chip close icon is clicked */
    onDelete?: (option: string) => void;
    /** Prop to disable the AutoComplete Component
     *
     *  @default: false
     *
     */
    disabled?: boolean;
    /** List of  pre-populated chips to display inside TextField */
    value?: string[];
    /** Prop to let user pass a custom text to chip (inCase of false can only pass text from options)
     *
     *  @default: false
     *
     */
    addCustomTag?: boolean; // if this is true only then the user can add new tags default false

    styles?: {
        root?: StyleProp<ViewStyle>;
        textInputContainer?: StyleProp<ViewStyle>;
        chip?: StyleProp<ViewStyle>;
        textInput?: StyleProp<ViewStyle>;
        dropdownContainer?: StyleProp<ViewStyle>;
        dropdownItem?: StyleProp<ViewStyle>;
        helperContainer?: StyleProp<ViewStyle>;
        helperText?: StyleProp<TextStyle>;
        helperCounter?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

const AutocompleteStyles = (
    theme: ExtendedTheme,
    filterOptions: string[],
    selected: boolean
): StyleSheet.NamedStyles<{
    optionText: ViewStyle;
    individualTextInputWrapper: ViewStyle;
    chip: ViewStyle;
    dropDownItem: ViewStyle;
    tagTextInput: ViewStyle;
    tagInput: ViewStyle;
    dropDownMenuTags: ViewStyle;
    tagInputWrapper: ViewStyle;
    bottomMargin: ViewStyle;
    helpersWrapper: ViewStyle;
    helper: ViewStyle;
    counterHelper: ViewStyle;
    inputHorizontal: ViewStyle;
}> =>
    StyleSheet.create({
        optionText: { color: theme.colors.onSurfaceVariant },
        individualTextInputWrapper: {
            marginHorizontal: -1,
            marginVertical: 5,
            minHeight: 20,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0)',
        },
        inputHorizontal: {
            paddingTop: 12,
        },
        chip: {
            height: 35,
            // marginRight: 5,
            // marginBottom: 15,
            marginLeft: 5,
            marginTop: Platform.OS === 'android' ? 16 : 15,
        },

        dropDownItem: {
            paddingBottom: 13,
            paddingHorizontal: 13,
            flexDirection: 'row',
            flex: 1,
        },
        tagTextInput: {
            fontSize: 16,
            // paddingLeft: 5,
            marginTop: Platform.OS === 'android' ? 10 : 25,
            marginLeft: Platform.OS === 'android' ? 4 : 8,
            // paddingBottom:20,
            marginBottom: Platform.OS === 'android' ? 5 : 21,
        },
        tagInput: {
            backgroundColor: theme.colors.surfaceVariant,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomWidth: 2,
            borderBottomColor: selected ? theme.colors.surfaceVariant : theme.colors.primary,
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexGrow: 0,
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingLeft: 3,
            paddingRight: 7,
            // marginTop:5,
            // paddingBottom:15,
            // maxHeight:80
        },
        dropDownMenuTags: {
            paddingRight: 10,
            backgroundColor: theme.colors.surfaceVariant,
            paddingTop: filterOptions.length < 1 ? 0 : 15,
            paddingBottom: filterOptions.length < 1 ? 0 : 6,
            maxHeight: 150,

            // maxHeight:  150,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        },
        tagInputWrapper: { paddingTop: 5, paddingHorizontal: 2, flexShrink: 1 },
        bottomMargin: {
            paddingBottom: 18,
        },
        helpersWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        helper: {
            flexShrink: 1,
        },
        counterHelper: {
            textAlign: 'right',
        },
    });

export const AutoComplete: React.FC<AutocompleteProps> = (props) => {
    const {
        theme: themeOverride,
        value = [],
        options = [],
        limitTags = 6,
        limitCharacterCountTag = 16,
        helperText,
        tagInputFieldProps,
        chipProps,
        onChange,
        onDelete,
        styles,
        disabled = false,
        addCustomTag = false,
    } = props;
    const theme = useExtendedTheme(themeOverride);
    function filterChips(chipOptions: string[], chipValue: string[]): string[] {
        return chipOptions.filter((option) => chipValue.findIndex((item) => item === option) === -1);
    }
    const [chipValue, setChipValue] = useState(value);
    const [filterOptions, setFilterOptions] = useState(filterChips(options, value));
    const [hideDropDownTags, setHideDropDownTags] = useState(true);
    const [textInput, setTextInput] = useState('');
    const tagInputRef = useRef(null as unknown as RNTextInput);
    const defaultStyles = AutocompleteStyles(theme, filterOptions, hideDropDownTags);

    const handleTextInputPress = (): void => {
        tagInputRef.current?.focus();
    };
    const handleTextInputFocus = (): void => {
        setHideDropDownTags(false);
    };
    const handleOnBlurTags = (): void => {
        setHideDropDownTags(true);
    };
    const handleOnChangeText = (text: string): void => {
        if (text.length <= limitCharacterCountTag && chipValue.length < limitTags) {
            setTextInput(text);
            let arr;
            if (text === '') {
                arr = filterChips(options, chipValue);
            } else {
                arr = filterOptions.filter((str) => str.toLowerCase().includes(text.toLowerCase()));
            }
            setFilterOptions(arr);
        }
    };
    const handleSubmitText = (): void => {
        if (chipValue.length < limitTags && textInput.length >= 1) {
            if (addCustomTag === true || filterOptions.includes(textInput)) {
                const newChip = chipValue;
                newChip.push(textInput);
                setChipValue(newChip);
                setFilterOptions(filterChips(options, newChip));
                setTextInput('');
                if (onChange) {
                    onChange(newChip);
                }
            }
        }
    };
    const onTagsSelected = (tag: string): void => {
        if (chipValue.length < limitTags) {
            const newChip = chipValue;
            newChip.push(tag);
            setChipValue(newChip);
            setFilterOptions(filterChips(options, newChip));
            setTextInput('');
            if (onChange) {
                onChange(newChip);
            }
        }
    };
    const removeChipItem = (item: string): void => {
        const arr = chipValue.filter((str) => str !== item);
        setChipValue(arr);
        setFilterOptions(filterChips(options, arr));
        if (onDelete) {
            onDelete(item);
        }
    };
    return (
        <View style={[defaultStyles.individualTextInputWrapper, defaultStyles.tagInputWrapper, styles?.root]}>
            <View style={[defaultStyles.inputHorizontal]}>
                <TouchableHighlight onPress={handleTextInputPress}>
                    <View style={[defaultStyles.tagInput, styles?.textInputContainer]}>
                        {chipValue.map((item) => (
                            <Chip
                                key={item}
                                style={[defaultStyles.chip, styles?.chip]}
                                // borderColor={theme.colors.outline}
                                // textColor={theme.colors.onSurfaceVariant}
                                disabled={disabled}
                                onClose={(): void => {
                                    removeChipItem(item);
                                }}
                                {...chipProps}
                            >
                                {item}
                            </Chip>
                        ))}

                        <RNTextInput
                            testID="tagInput"
                            ref={tagInputRef}
                            selectionColor={theme.colors.primary}
                            value={textInput}
                            placeholderTextColor={
                                hideDropDownTags ? theme.colors.onSurfaceVariant : 'rgba(255, 255, 255, 0)'
                            }
                            placeholder="Tags"
                            onChangeText={(e): any => handleOnChangeText(e)}
                            style={[defaultStyles.tagTextInput, styles?.textInput]}
                            onBlur={handleOnBlurTags}
                            onFocus={handleTextInputFocus}
                            blurOnSubmit={false}
                            onSubmitEditing={handleSubmitText}
                            autoCorrect={false}
                            editable={!disabled || chipValue.length <= limitTags}
                            {...tagInputFieldProps}
                        />
                    </View>
                </TouchableHighlight>
            </View>

            {!hideDropDownTags && !disabled && (
                <View style={[defaultStyles.dropDownMenuTags, styles?.dropdownContainer]}>
                    <ScrollView
                        testID="dropDownMenuTags"
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                    >
                        {filterOptions.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[defaultStyles.dropDownItem, styles?.dropdownItem]}
                                onPress={(): void => onTagsSelected(item)}
                            >
                                <Text style={[defaultStyles.optionText]}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
            <View style={[defaultStyles.helpersWrapper, styles?.helperContainer]}>
                <HelperText type="info" style={[defaultStyles.helper, styles?.helperText]} visible={true}>
                    {helperText}
                </HelperText>
                <HelperText type="info" visible={true} style={[defaultStyles.counterHelper, styles?.helperCounter]}>
                    {textInput.length} / {limitCharacterCountTag}
                </HelperText>
            </View>
            <View style={[defaultStyles.bottomMargin]}></View>
        </View>
    );
};
