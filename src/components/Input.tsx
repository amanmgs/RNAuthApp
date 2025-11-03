import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
  },
  label: {
    ...TYPOGRAPHY.normal,
    marginBottom: verticalScale(6),
    color: COLORS.text,
  },
  input: {
    ...TYPOGRAPHY.normal,
    height: verticalScale(44),
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(6),
    color: COLORS.text,
  },
});
