# React Native User Authentication App

## Overview
This is a **React Native Authentication App** built using **React Context API** for managing global authentication state. The app provides **Login**, **Signup**, and **Home** screens, with user session persistence via **AsyncStorage**.

It demonstrates:
- Authentication flow
- State management using Context API
- Navigation using React Navigation
- Form validation and error handling
- Persistent login sessions

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher)
- React Native CLI
- Android Studio or Xcode
- Watchman (for macOS)
- Git

### Clone the Repository
```bash
https://github.com/amanmgs/RNAuthApp.git
cd RNAuthApp
```

### Install Dependencies
```bash
npm install

OR

npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install react-native-size-matters
```
If you’re on iOS:
```bash
cd ios && pod install && cd ..
```

### Run the App
Start Metro Bundler:
```bash
npx react-native start
```
Run on Android:
```bash
npx react-native run-android
```
Run on iOS:
```bash
npx react-native run-ios
```

## Implemented Features

### 1. Authentication Context Setup
- Implemented using React Context API (`AuthContext.js`)
- Provides:  
  - `login()` → Authenticates existing user  
  - `signup()` → Registers a new user  
  - `logout()` → Clears user session  
  - `user` → Holds current logged-in user info  
- Persists user data using AsyncStorage

### 2. Screens
**Login Screen**
- Fields: Email, Password  
- Validations: invalid email, empty fields, incorrect credentials  
- Buttons: Login → Calls `login()`, Go to Signup → Navigates to Signup  

**Signup Screen**
- Fields: Name, Email, Password  
- Validations: missing fields, invalid email, password < 6 chars  
- Buttons: Signup → Calls `signup()`, Go to Login → Navigates to Login  

**Home Screen**
- Displays logged-in user's Name and Email  
- Logout button → Calls `logout()` and returns to Login  

### 3. Persist Authentication
- User remains logged in after app restart  
- Uses AsyncStorage to save and restore authentication state

### 4. Navigation
- Implemented using React Navigation (v6)  
- Stack Navigator handles Login, Signup, and Home screens  
- Conditional navigation based on authentication state

### 5. UI and Design
- Clean and minimal layout  
- Styled input fields, buttons, and error messages  
- Consistent color palette and spacing
- Password visibility toggle (eye icon)

## Authentication Flow
1. On app start, AsyncStorage checks for a saved user  
2. If user exists → navigates to Home  
3. If not → navigates to Login  
4. User can:
   - Sign Up → Saves user data  
   - Login → Validates credentials  
   - Logout → Clears session and navigates to Login  

## Tech Stack
| Category | Technology |
|-----------|-------------|
| Framework | React Native |
| State Management | React Context API |
| Navigation | React Navigation v6 |
| Storage | AsyncStorage |
| UI | React Native Components |
| Icons | react-native-vector-icons |

## Screenshots
screenshots in `/docs/screenshots/` folder

## Author
**Aman Kumar**  
