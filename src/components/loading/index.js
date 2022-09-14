import React, { memo } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { colors } from '../../theme';
import commonStyles from '../../theme/commonStyles';

const Loading = memo(({ visible }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
    >
      <View style={[commonStyles.flex, commonStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
});

export default Loading;
