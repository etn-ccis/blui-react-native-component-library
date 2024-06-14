import React, { useRef, useState } from 'react';
import { TextStyle, StyleProp, StyleSheet, View, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Platform, ViewStyle, TextInput as RNTextInput, ViewProps, TextInputProps } from 'react-native';
import { HelperText, Text } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
// import { useFontScaleSettings } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Chip, ChipProps } from '../Chip';

export type AutocompleteProps = ViewProps & {
    /** Style overrides for internal elements. The styles you provide will be combined with the default defaultStyles. */
    helperText: string;
    options?: string[]; // if options are available then only then show the list section
    tagInputFieldProps?: TextInputProps;
    chipProps?: ChipProps; // Only use Label prop from ChipPros
    limitTags?: number; // default is 6;
    limitCharacterCountTag?: number //default is 16
    onChange?: (details?: string[]) => void;
    onDelete?: (option: string) => void;
    disabled?: boolean; // verify and delete and use TextInputFieldProps
    value?: string[]; // pre-populated chips to display inside TextField
    addCustomTag: boolean; // if this is true only then the user can add new tags default false

    styles?: {
        root?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

const AutocompleteStyles = (
    theme: ExtendedTheme,
    filterOptions: string[],
): StyleSheet.NamedStyles<{
    root: TextStyle;
    optionText: ViewStyle;
    individualTextInputWrapper: ViewStyle;
    inidividualItem: ViewStyle;
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
        root: {
            color: theme.colors.surface,
            letterSpacing: 2,
            textTransform: 'uppercase',
        },
        optionText: { color: '#424E54' },
        individualTextInputWrapper: { marginHorizontal: -1, marginVertical: 5, minHeight: 20, overflow: 'hidden' },
        inidividualItem: {
            // backgroundColor: '#F7F8F8',
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
            color: 'red',
            paddingHorizontal: 13,
            flexDirection: 'row',
            flex: 1,
        },
        tagTextInput: {
            fontSize: 16,
            // backgroundColor:'yellow',
            // paddingLeft: 5,
            marginTop: Platform.OS === 'android' ? 10 : 25,
            marginLeft: Platform.OS === 'android' ? 4 : 8,
            // paddingBottom:20,
            marginBottom: Platform.OS === 'android' ? 5 : 21,
        },
        tagInput: {
            // minHeight:inputHeight,
            backgroundColor: theme.colors.surfaceVariant,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.primary,
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
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            maxHeight: 150,

            // maxHeight:  150,
            borderBottomColor: '#424E544D',
            borderLeftColor: '#424E544D',
            borderRightColor: '#424E544D',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        },
        tagInputWrapper: { paddingTop: 5, paddingHorizontal: 2, flexShrink: 1 },
        bottomMargin: {
            paddingBottom: 18,
            // backgroundColor: 'red'
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
        styles = {}, 
        theme: themeOverride, 
        value = [], 
        options = [],
        limitTags=6,
    limitCharacterCountTag=16,
    helperText,
    tagInputFieldProps,
    chipProps,
    onChange,
    onDelete,
    disabled= false,
    addCustomTag=false,
 } = props;
    const theme = useExtendedTheme(themeOverride);
    const [chipValue, setChipValue] = useState(value)
    // const [chipOptions, setChipOptions] = useState(options)
    const [filterOptions, setFilterOptions] = useState(filterChips(options,value))
    const [hideDropDownTags, setHideDropDownTags] = useState(true)
    const [textInput, setTextInput] = useState('')
    const tagInputRef = useRef(null as unknown as RNTextInput);
    const defaultStyles = AutocompleteStyles(theme, filterOptions);

    function filterChips(chipOptions: string[], chipValue: string[]): string[] {
        // Use filter and findIndex for membership checking
        return chipOptions.filter(option => chipValue.findIndex(value => value === option) === -1);
      }

    const handleTextInputPress = (): void => {
        tagInputRef.current?.focus();
        setHideDropDownTags(false)
    };
    const handleOnBlurTags = (): void => {
        setHideDropDownTags(true);
    };
    const handleOnChangeText = (text: string): void => {
        if (text.length<limitCharacterCountTag && chipValue.length<limitTags){
            setTextInput(text)
            let arr
            if(text===''){
                arr= filterChips(options,chipValue)
            }
            else{
            arr =filterOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
            }console.log(arr,text)
            setFilterOptions(arr)
        }
    }
    const handleSubmitText = ():void =>{
        if(chipValue.length<limitTags){
            if(addCustomTag===true ||filterOptions.includes(textInput)){
            let newChip=chipValue
            newChip.push(textInput)
            setChipValue(newChip)
            console.log(newChip)
            setFilterOptions(filterChips(options,newChip))
            setTextInput('')
            if(onChange){
                onChange(newChip)
            }
        }
        }
    }
    const onTagsSelected = (tag:string): void => {
        if(chipValue.length<limitTags){
            let newChip=chipValue
            newChip.push(tag)
            setChipValue(newChip)
            console.log(newChip)
            setFilterOptions(filterChips(options,newChip))
            setTextInput('')
            if(onChange){
                onChange(newChip)
            }
        }
    }
    const removeChipItem = (item: string): void =>{
        let arr = chipValue.filter(str => str !== item)
        setChipValue(arr)
        setFilterOptions(filterChips(options,arr))
        if(onDelete){
            onDelete(item)
        }
    }
    return (
        <View
            style={[defaultStyles.individualTextInputWrapper, defaultStyles.tagInputWrapper]}
        >
            <View style={[defaultStyles.inputHorizontal]}>
                <TouchableWithoutFeedback
                    onPress={handleTextInputPress}
                >
                    <View
                        style={[defaultStyles.tagInput]}
                    >
                        {chipValue.map((item) => (
                            <Chip
                                key={item}
                                style={[defaultStyles.chip]}
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
                            selectionColor={'#007BC1'}
                            value={textInput}
                            placeholderTextColor={'#818181'}
                            placeholder="Tags"
                            onChangeText={(e) => handleOnChangeText(e)}
                            style={[defaultStyles.inidividualItem, defaultStyles.tagTextInput]}
                            onBlur={handleOnBlurTags}
                            blurOnSubmit={false}
                            onSubmitEditing={handleSubmitText}
                            autoCorrect={false}
                            editable={!disabled}
                            {...tagInputFieldProps}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {!hideDropDownTags && !disabled && <View
                style={[defaultStyles.dropDownMenuTags]}
            >
                <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                    {filterOptions.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={defaultStyles.dropDownItem}
                            onPress={(): void => onTagsSelected(item)}
                        >
                            <Text
                                style={[defaultStyles.optionText]}
                            >{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>}
            <View style={defaultStyles.helpersWrapper}>
                <HelperText type="info" style={defaultStyles.helper} visible={true}>
                    {helperText}
                </HelperText>
                <HelperText type="info" visible={true} style={defaultStyles.counterHelper}>
                    {textInput.length} / {16}
                </HelperText>
            </View>
            <View
                style={[defaultStyles.bottomMargin]}
            ></View>
        </View>
    );
};
