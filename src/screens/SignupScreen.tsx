import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { validateSignup } from '../utils/formValidators';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme/typography';
import Button from '../components/Button';

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { signup } = useAuth();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignup = async () => {
    const error = validateSignup(name, email, password);
    if (error) {
      setLocalError(error);
      return;
    }

    setLocalError(null);
    try {
      const res = await signup({ name, email, password });
      if (!res.ok) {
        setLocalError(res.error || 'Signup failed');
      }
    } catch (err) {
      setLocalError('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create Account</Text>

      <Input label="Name" value={name} onChangeText={setName} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordWrapper}>
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((s) => !s)}
          style={styles.showButton}
        >
          <Entypo
            name={showPassword ? 'eye-with-line' : 'eye'}
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}

      <View style={styles.buttonWrapper}>
        <Button title="Signup" onPress={handleSignup} />
      </View>

      <View style={styles.loginRow}>
        <Text style={styles.normalText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  headerText: {
    ...TYPOGRAPHY.header,
    marginBottom: verticalScale(20),
    textAlign: 'center',
    color: COLORS.text,
  },
  passwordWrapper: {
    position: 'relative',
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
  loginRow: {
    marginTop: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalText: {
    ...TYPOGRAPHY.normal,
  },
  loginLink: {
    ...TYPOGRAPHY.normal,
    color: COLORS.link,
    fontWeight: '500',
  },
});
