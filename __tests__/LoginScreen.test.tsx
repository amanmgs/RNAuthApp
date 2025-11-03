import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { useAuth } from '../src/context/AuthContext';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn(async ({ email, password }) => {
        if (email === 'test@gmail.com' && password === '123456') {
          return { ok: true };
        }
        return { ok: false, error: 'Incorrect credentials' };
      }),
      clearError: jest.fn(),
    });
  });

  const mockNavigation: any = {
    navigate: mockNavigate,
    goBack: mockGoBack,
  };

  it('renders the login screen correctly', () => {
    const { getByText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText("Don't have an account? ")).toBeTruthy();
    expect(getByText('Go to Signup')).toBeTruthy();
  });

  it('shows error when email or password is missing', async () => {
    const { getByText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Please fill email and password')).toBeTruthy();
    });
  });

  it('shows error for invalid email format', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Invalid email format')).toBeTruthy();
    });
  });

  it('shows error for short password', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Password must be at least 6 characters')).toBeTruthy();
    });
  });

  it('calls login with valid credentials', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(queryByText('Login failed')).toBeNull();
    });
  });

  it('displays error when login fails', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpass');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Incorrect credentials')).toBeTruthy();
    });
  });

  it('navigates to Signup screen', () => {
    const { getByText } = render(
      <LoginScreen
        navigation={mockNavigation}
        route={{ key: 'Login', name: 'Login' }}
      />
    );

    fireEvent.press(getByText('Go to Signup'));
    expect(mockNavigate).toHaveBeenCalledWith('Signup');
  });
});
