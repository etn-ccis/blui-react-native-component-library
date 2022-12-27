import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';

type BottomSheetProps = {
    /** Make the bottom sheet visible */
    show?: boolean;
    /** Callback function to execute when the bottom sheet is dismissed */
    onClose?: () => void;
    /** Background color to use for the bottom sheet */
    backgroundColor?: string;
    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: ViewStyle;
        background?: ViewStyle;
    };
};

const useStyles = (
    theme: ReactNativePaper.Theme,
    props: BottomSheetProps
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    background: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        background: {
            backgroundColor: props.backgroundColor || theme.colors.surface,
        },
    });
/**
 * BottomSheet component
 *
 * This is a utility component for the UserMenu. It handles rendering the menu items in
 * a bottom sheet that appears from the bottom of the screen.
 */
export const BottomSheet: React.FC<BottomSheetProps> = (props) => {
    const { show, children, onClose, styles = {} } = props;
    const theme = useTheme();
    const defaultStyles = useStyles(theme, props);

    return (
        <Modal
            isVisible={show}
            backdropOpacity={0.5}
            onBackdropPress={onClose}
            supportedOrientations={['portrait', 'landscape']}
            style={[defaultStyles.root, styles.root]}
            statusBarTranslucent
        >
            <SafeAreaView style={[defaultStyles.background, styles.background]}>{children}</SafeAreaView>
        </Modal>
    );
};
