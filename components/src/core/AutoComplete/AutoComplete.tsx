import React, { useRef, useState } from 'react';
import {
    TextStyle,
    StyleProp,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    ViewStyle,
    TextInput as RNTextInput,
    ViewProps,
    TextInputProps,
    TouchableHighlight,
    Platform,
} from 'react-native';
import { HelperText, Text } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Chip, ChipProps } from '../Chip';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export type AutocompleteProps = ViewProps & {
    /** Text to display the Helper Text */
    helperText?: string;
    /** Text to display as component label */
    label?: string;
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
    allowCustomtag?: boolean;

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
    iconWrapper: ViewStyle;
    selectorContainer: ViewStyle;
    tagTextInput: ViewStyle;
    tagInput: ViewStyle;
    dropDownMenuTags: ViewStyle;
    tagInputWrapper: ViewStyle;
    bottomMargin: ViewStyle;
    helpersWrapper: ViewStyle;
    helper: ViewStyle;
    counterHelper: ViewStyle;
    labelStyle: TextStyle;
}> =>
    StyleSheet.create({
        optionText: { color: theme.colors.onSurfaceVariant, marginHorizontal: 16 },
        labelStyle: {
            paddingTop: 4,
            paddingHorizontal: 6,
            paddingVertical: 0,
            color: selected ? theme.colors.onSurfaceVariant : theme.colors.primary,
        },
        individualTextInputWrapper: {
            marginHorizontal: -1,
            marginVertical: 4,
            minHeight: 20,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0)',
        },
        iconWrapper: { width: '7%', paddingTop: 8 },
        selectorContainer: {
            backgroundColor: theme.colors.surfaceVariant,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomWidth: 2,
            paddingTop: 8,
            paddingBottom: 8,
            paddingHorizontal: 10,
            borderBottomColor: selected ? theme.colors.onSurfaceVariant : theme.colors.primary,
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexGrow: 0,
            flex: 1,
        },
        chip: {
            marginHorizontal: 6,
            marginVertical: 6,
        },

        dropDownItem: {
            paddingBottom: 12,
            flexDirection: 'row',
            flex: 1,
        },
        tagTextInput: {
            fontSize: 16,
            marginTop: Platform.OS === 'android' ? 0 : 13,
            marginLeft: Platform.OS === 'android' ? 4 : 8,
            marginBottom: Platform.OS === 'android' ? 0 : 13,
        },
        tagInput: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexGrow: 0,
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingRight: 12,
        },
        dropDownMenuTags: {
            paddingRight: 16,
            backgroundColor: theme.colors.surfaceVariant,
            paddingTop: filterOptions.length < 1 ? 0 : 12,
            paddingBottom: filterOptions.length < 1 ? 0 : 6,
            maxHeight: 150,
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
        label = '',
        styles,
        disabled = false,
        allowCustomtag = false,
    } = props;
    const theme = useExtendedTheme(themeOverride);
    function filterChips(chipOptions: string[], chipValue: string[]): string[] {
        return chipOptions.filter((option) => chipValue.findIndex((item) => item === option) === -1);
    }
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
        if (text.length <= limitCharacterCountTag && value.length < limitTags) {
            setTextInput(text);
            const searchData = filterChips(options, value);
            let arr;
            if (text === '') {
                arr = searchData;
            } else {
                arr = searchData.filter((str) => str.toLowerCase().includes(text.toLowerCase()));
            }
            setFilterOptions(arr);
        }
    };
    const handleSubmitText = (): void => {
        if (value.length < limitTags && textInput.length >= 1) {
            if (allowCustomtag === true || filterOptions.includes(textInput)) {
                const newChip = [...value];
                newChip.push(textInput);
                setFilterOptions(filterChips(options, newChip));
                setTextInput('');
                if (onChange) {
                    onChange(newChip);
                }
            }
        }
    };
    const onTagsSelected = (tag: string): void => {
        if (value.length < limitTags) {
            const newChip = [...value];
            newChip.push(tag);
            setFilterOptions(filterChips(options, newChip));
            setTextInput('');
            if (onChange) {
                onChange(newChip);
            }
        }
    };
    const removeChipItem = (item: string): void => {
        const arr = value.filter((str) => str !== item);
        setFilterOptions(filterChips(options, arr));
        if (onDelete) {
            onDelete(item);
        }
    };
    return (
        <View style={[defaultStyles.individualTextInputWrapper, defaultStyles.tagInputWrapper, styles?.root]}>
            <View>
                <TouchableHighlight onPress={handleTextInputPress}>
                    <View style={defaultStyles.selectorContainer}>
                        <View style={{ width: '93%' }}>
                            {!hideDropDownTags || value.length > 0 ? (
                                <HelperText style={defaultStyles.labelStyle} type="info">
                                    {!hideDropDownTags || value.length > 0 ? label : ''}{' '}
                                </HelperText>
                            ) : null}
                            <View style={[defaultStyles.tagInput, styles?.textInputContainer]}>
                                {value.map((item) => (
                                    <Chip
                                        key={item}
                                        style={[defaultStyles.chip, styles?.chip]}
                                        borderColor={theme.colors.outline}
                                        textColor={theme.colors.onSurfaceVariant}
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
                                    placeholderTextColor={theme.colors.onSurfaceVariant}
                                    placeholder={hideDropDownTags && value.length < 1 ? label : ''}
                                    onChangeText={(e): any => handleOnChangeText(e)}
                                    style={[defaultStyles.tagTextInput, styles?.textInput]}
                                    onBlur={handleOnBlurTags}
                                    onFocus={handleTextInputFocus}
                                    blurOnSubmit={false}
                                    onSubmitEditing={handleSubmitText}
                                    autoCorrect={false}
                                    editable={!disabled && value.length < limitTags}
                                    {...tagInputFieldProps}
                                />
                            </View>
                        </View>
                        <View style={defaultStyles.iconWrapper}>
                            {hideDropDownTags ? (
                                <MatIcon name="arrow-drop-down" size={24} />
                            ) : (
                                <MatIcon name="arrow-drop-up" size={24} />
                            )}
                        </View>
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
                    {helperText ? helperText : ''}
                </HelperText>
                <HelperText type="info" visible={true} style={[defaultStyles.counterHelper, styles?.helperCounter]}>
                    {textInput.length} / {limitCharacterCountTag}
                </HelperText>
            </View>
            <View style={[defaultStyles.bottomMargin]}></View>
        </View>
    );
};
