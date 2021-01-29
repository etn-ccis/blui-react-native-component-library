import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';

type BottomSheetProps = {
    show?: boolean;
    children?: ReactNode;
    onClose?: () => void;
    backgroundColor?: string;
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
        >
            <SafeAreaView style={[defaultStyles.background, styles.background]}>{children}</SafeAreaView>
        </Modal>
    );
};
