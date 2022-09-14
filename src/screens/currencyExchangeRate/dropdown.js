import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '../../theme';
import commonStyles from '../../theme/commonStyles';
const Dropdown = ({
  data = [],
  searchable = true,
  value,
  setValue,
  color,
  style,
  dropdownStyle,
  dropDownContainerStyle,
  arrowStyle,
}) => {
  const [open, setOpen] = useState(false);
  const extraDropdownStyle = { backgroundColor: color };
  const borderStyle = { borderColor: color, borderBottomColor: color };

  return (
    <View style={[commonStyles.flex, style]}>
      <DropDownPicker
        open={open}
        value={value}
        items={data}
        setOpen={setOpen}
        setValue={setValue}
        searchable={searchable}
        style={[borderStyle, extraDropdownStyle, dropdownStyle]}
        dropDownContainerStyle={[borderStyle, dropDownContainerStyle]}
        labelStyle={styles.label}
        placeholderStyle={styles.label}
        searchTextInputStyle={styles.searchTextInput}
        searchContainerStyle={borderStyle}
        arrowIconStyle={[styles.iconStyle, arrowStyle]}
        placeholder="Select a currency"
        searchPlaceholder="Search for a currency"
        searchTextInputProps={{ selectionColor: color }}
        listMode={Platform.OS === 'android' ? 'MODAL' : 'FLATLIST'}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  label: {
    color: colors.white,
  },
  searchTextInput: {
    borderWidth: 0,
  },
  iconStyle: {
    tintColor: colors.white,
  },
});
