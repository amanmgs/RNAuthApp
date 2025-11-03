import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { useAuth } from '../src/context/AuthContext';

jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../src/components/Button', () => {
  return ({ title, onPress }: any) => (
    <button onClick={onPress} testID="logout-btn">
      {title}
    </button>
  );
});

describe('HomeScreen', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Aman', email: 'aman@gmail.com' },
      logout: mockLogout,
    });
  });

  it('renders user info correctly', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Welcome, Aman')).toBeTruthy();
    expect(getByText('aman@gmail.com')).toBeTruthy();
  });

  it('calls logout when button is pressed', () => {
    const { getByTestId } = render(<HomeScreen />);

    fireEvent.press(getByTestId('logout-btn'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
