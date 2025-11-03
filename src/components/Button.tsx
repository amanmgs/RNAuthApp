import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(8),
  },
  disabledButton: {
    backgroundColor: COLORS.disabled,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.background
  },
});
