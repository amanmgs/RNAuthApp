import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { useAuth } from '../context/AuthContext';
import { TYPOGRAPHY } from '../theme/typography';
import { COLORS } from '../theme/colors';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>
      <Text style={styles.emailText}>{user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  welcomeText: {
    ...TYPOGRAPHY.header,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  emailText: {
    ...TYPOGRAPHY.normal,
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
});
