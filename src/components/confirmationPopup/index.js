import React, { memo } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../theme';
import commonStyles from '../../theme/commonStyles';

const Loading = memo(
  ({
    visible,
    text,
    positiveButtonText = 'Confirm',
    negativeButtonText = 'Deny',
    onPressPositiveButtonCB,
    onPressNegativeButtonCB,
  }) => {
    const buttonStyle = [
      commonStyles.flex,
      commonStyles.centerContainer,
      styles.button,
    ];
    return (
      <Modal
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <View
          style={[
            commonStyles.flex,
            commonStyles.centerContainer,
            styles.container,
          ]}
        >
          <View style={styles.subContainer}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[...buttonStyle, styles.negativeButton]}
                onPress={onPressNegativeButtonCB}
              >
                <Text>{negativeButtonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={buttonStyle}
                onPress={onPressPositiveButtonCB}
              >
                <Text style={styles.buttonText}>{positiveButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparentBlack,
    paddingHorizontal: RFValue(16),
  },
  subContainer: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: RFValue(6),
    padding: RFValue(10),
  },
  text: {
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: RFValue(20),
  },
  button: {
    padding: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: colors.green,
  },
  negativeButton: {
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.transparent,
    marginEnd: RFValue(10),
  },
  buttonText: {
    color: colors.white,
  },
});
export default Loading;
