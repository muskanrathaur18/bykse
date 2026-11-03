import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { SplashScreen } from './src/screens/SplashScreen';

import { LocationPermissionScreen } from './src/screens/LocationPermissionScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LocationSearchScreen } from './src/screens/LocationSearchScreen';
import { RideSelectionScreen } from './src/screens/RideSelectionScreen';
import { CheckPickupPointScreen } from './src/screens/CheckPickupPointScreen';
import { BookingConfirmationScreen } from './src/screens/BookingConfirmationScreen';
import { CaptainPickupScreen } from './src/screens/CaptainPickupScreen';
import { LiveTripScreen } from './src/screens/LiveTripScreen';
import { RideCompletionScreen } from './src/screens/RideCompletionScreen';
import { RatingScreen } from './src/screens/RatingScreen';
import { CancellationScreen } from './src/screens/CancellationScreen';
import { RideHistoryScreen } from './src/screens/RideHistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { HelpCenterScreen } from './src/screens/HelpCenterScreen';
import { SafetyFeaturesScreen } from './src/screens/SafetyFeaturesScreen';
import { ParcelDeliveryScreen } from './src/screens/ParcelDeliveryScreen';
import { WeddingRidesScreen } from './src/screens/WeddingRidesScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { GlobalBottomNav } from './src/components/common/GlobalBottomNav';

const MainNavigator = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH':
        return <SplashScreen />;

      case 'LOCATION_PERMISSION':
        return <LocationPermissionScreen />;
      case 'AUTH':
        return <AuthScreen />;
      case 'HOME':
        return <HomeScreen />;
      case 'LOCATION_SEARCH':
        return <LocationSearchScreen />;
      case 'RIDE_SELECTION':
        return <RideSelectionScreen />;
      case 'CHECK_PICKUP':
        return <CheckPickupPointScreen />;
      case 'BOOKING_STATUS':
        return <BookingConfirmationScreen />;
      case 'CAPTAIN_PICKUP':
        return <CaptainPickupScreen />;
      case 'LIVE_TRIP':
        return <LiveTripScreen />;
      case 'RIDE_COMPLETION':
        return <RideCompletionScreen />;
      case 'RATING':
        return <RatingScreen />;
      case 'CANCELLATION':
        return <CancellationScreen />;
      case 'RIDE_HISTORY':
        return <RideHistoryScreen />;
      case 'PROFILE':
        return <ProfileScreen />;
      case 'HELP_CENTER':
        return <HelpCenterScreen />;
      case 'SAFETY_HUB':
        return <SafetyFeaturesScreen />;
      case 'PARCEL_DELIVERY':
        return <ParcelDeliveryScreen />;
      case 'WEDDING_RIDES':
        return <WeddingRidesScreen />;
      case 'SETTINGS':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const hideBottomNavScreens = [
    'SPLASH',

    'LOCATION_PERMISSION',
    'AUTH',
    'LOCATION_SEARCH',
    'RIDE_SELECTION',
    'CHECK_PICKUP',
    'BOOKING_STATUS',
    'CAPTAIN_PICKUP',
    'LIVE_TRIP',
    'RIDE_COMPLETION',
    'RATING',
    'CANCELLATION',
  ];
  const showBottomNav = !hideBottomNavScreens.includes(currentScreen);

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Area */}
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      {/* Global Bottom Navigation (Ride | Parcel | Wedding | Profile) on all pages */}
      {showBottomNav && <GlobalBottomNav />}
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});


