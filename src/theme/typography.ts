import { moderateScale } from 'react-native-size-matters';
import { TextStyle } from 'react-native';

export const TYPOGRAPHY: { [key: string]: TextStyle } = {
  header: {
    fontSize: moderateScale(26),
    fontWeight: '600'
  },
  normal: {
    fontSize: moderateScale(14),
  },
  small: {
    fontSize: moderateScale(12),
  },
  button: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  }
};
