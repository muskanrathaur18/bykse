import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { useApp } from '../context/AppContext';

export const SplashScreen = () => {
  const {
    setCurrentScreen,
    user,
    activeBooking,
  } = useApp();

  // Animations
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth logo entrance
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (activeBooking && activeBooking.status !== 'CANCELLED') {
        setCurrentScreen('BOOKING_STATUS');
      } else if (user && user.isLoggedIn) {
        setCurrentScreen('HOME');
      } else {
        setCurrentScreen('AUTH');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, activeBooking]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Only centered transparent 3D BykSe logo - No text or bottom content */}
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 280,
    height: 280,
  },
});
