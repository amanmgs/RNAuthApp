import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/validators';
import Entypo from 'react-native-vector-icons/Entypo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme/typography';
import Button from '../components/Button';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login, clearError } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      clearError && clearError();
    };
  }, []);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setLocalError('Please fill email and password');
      return;
    }
    if (!isValidEmail(email)) {
      setLocalError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    setLocalError(null);
    const res = await login({ email, password });
    if (!res.ok) {
      setLocalError(res.error || 'Login failed');
    }
  }, [email, password, login]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Welcome</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
      />

      <View style={styles.passwordContainer}>
        <View style={styles.passwordRow}>
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.showButton}
          >
            <Entypo
              name={showPassword ? 'eye-with-line' : 'eye'}
              size={22}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}

      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.normalText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Go to Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: scale(20),
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  headerText: {
    ...TYPOGRAPHY.header,
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  showButton: {
    marginLeft: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(35),
    right: scale(10),
  },
  errorText: {
    ...TYPOGRAPHY.normal,
    color: COLORS.error,
    marginBottom: verticalScale(8),
  },
  buttonWrapper: {
    marginTop: verticalScale(10),
  },
  signupRow: {
    marginTop: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalText: {
    ...TYPOGRAPHY.normal,
  },
  signupLink: {
    ...TYPOGRAPHY.normal,
    color: COLORS.link,
    fontWeight: '500',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordRow: {
    position: 'relative',
  },
});
