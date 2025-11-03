import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from '../src/screens/SignupScreen';
import { useAuth } from '../src/context/AuthContext';
import { validateSignup } from '../src/utils/formValidators';

const mockNavigate = jest.fn();
const mockNavigation: any = { navigate: mockNavigate };

jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-native-vector-icons/Entypo', () => 'Icon');

jest.mock('../src/utils/formValidators', () => ({
  validateSignup: jest.fn(),
}));

describe('SignupScreen', () => {
  const signupMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: signupMock,
    });
    (validateSignup as jest.Mock).mockReturnValue(null);
    jest.clearAllMocks();
  });

  it('renders all input fields and signup button', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }}/>
    );

    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Signup')).toBeTruthy();
  });

  it('shows validation error if inputs are invalid', async () => {
    (validateSignup as jest.Mock).mockReturnValue('Invalid input');
    const { getByText } = render(<SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }}/>);

    const button = getByText('Signup');
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText('Invalid input')).toBeTruthy();
    });
  });

  it('shows error for invalid email format', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }}/>);

    fireEvent.changeText(getByPlaceholderText('Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    
    fireEvent.press(getByText('Signup'));

    await waitFor(() => {
      expect(findByText('Invalid email address')).toBeTruthy();
    });
  });

  it('shows error for short password', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }}/>);

    fireEvent.changeText(getByPlaceholderText('Name'), 'test');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');
    fireEvent.press(getByText('Signup'));

    await waitFor(() => {
      expect(findByText('Password must be at least 6 characters')).toBeTruthy();
    });
  });

  it('calls signup with valid input data', async () => {
    signupMock.mockResolvedValue({ ok: true });
    (validateSignup as jest.Mock).mockReturnValue(null);

    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }}/>
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    fireEvent.press(getByText('Signup'));

    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@gmail.com',
        password:'123456',
      });
    });
  });

  it('displays an error if signup fails', async () => {
    signupMock.mockResolvedValue({ ok: false, error: 'Signup failed' });

    const { getByPlaceholderText, getByText, findByText } = render(
      <SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }}/>
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Jane');
    fireEvent.changeText(getByPlaceholderText('Email'), 'jane@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    fireEvent.press(getByText('Signup'));

    expect(await findByText('Signup failed')).toBeTruthy();
  });

  it('navigates to Login screen when link is pressed', () => {
    const { getByText } = render(<SignupScreen navigation={mockNavigation} route={{ key: 'Signup', name: 'Signup' }} />);
    fireEvent.press(getByText('Go to Login'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
