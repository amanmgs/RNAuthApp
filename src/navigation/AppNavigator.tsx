import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        // User logged in
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      ) : (
        // Not logged in
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  loaderContainer: {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center'
  }
})