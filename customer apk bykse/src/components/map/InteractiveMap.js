import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const InteractiveMap = ({
  pickupName = 'B34, Sainik N...',
  dropName = 'Enter drop location',
  onBackPress,
  onAddStopPress,
  onRecenterPress,
  onEditPickup,
  onEditDrop,
  style,
  children,
}) => {
  // Simulated car movement animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.mapContainer, style]}>
      {/* REAL DELHI HIGH-RES MAP BACKGROUND */}
      <Image
        source={require('../../../assets/real_delhi_map.png')}
        style={styles.mapBackgroundImage}
        resizeMode="cover"
      />

      {/* Blue Route Polyline connecting Pickup to Drop */}
      <View style={styles.routeSvgWrapper}>
        <View style={styles.routePathLine} />
      </View>

      {/* FLOATING TOP-LEFT BACK BUTTON */}
      {onBackPress && (
        <TouchableOpacity
          style={styles.floatingBackBtn}
          activeOpacity={0.8}
          onPress={onBackPress}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
      )}

      {/* PICKUP PIN & PILL WITH PENCIL (Exact match to Image 2) */}
      <View style={styles.pickupPinWrapper}>
        <TouchableOpacity
          style={styles.locationPillCard}
          activeOpacity={0.8}
          onPress={onEditPickup}
        >
          <Text style={styles.pillText} numberOfLines={1}>
            {pickupName}
          </Text>
          <Ionicons name="pencil" size={13} color="#475569" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Green Ring Pin */}
        <Animated.View
          style={[
            styles.greenPinOuterRing,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <View style={styles.greenPinInnerDot} />
        </Animated.View>
      </View>

      {/* FLEET CARS SWARM AROUND PICKUP (Cabs, Autos, Bikes) */}
      <View style={styles.fleetCluster}>
        <View style={[styles.fleetVehicle, { top: -6, left: -26, transform: [{ rotate: '45deg' }] }]}>
          <FontAwesome5 name="car" size={16} color="#0F172A" />
        </View>
        <View style={[styles.fleetVehicle, { top: 12, left: 22, transform: [{ rotate: '-35deg' }] }]}>
          <FontAwesome5 name="car" size={15} color="#059669" />
        </View>
        <View style={[styles.fleetVehicle, { top: -20, left: 16, transform: [{ rotate: '15deg' }] }]}>
          <FontAwesome5 name="motorcycle" size={15} color="#D97706" />
        </View>
        <View style={[styles.fleetVehicle, { top: 22, left: -14, transform: [{ rotate: '70deg' }] }]}>
          <FontAwesome5 name="motorcycle" size={14} color="#0F172A" />
        </View>
      </View>

      {/* DESTINATION PIN & PILL WITH PENCIL (Exact match to Image 2) */}
      <View style={styles.dropPinWrapper}>
        <TouchableOpacity
          style={styles.locationPillCard}
          activeOpacity={0.8}
          onPress={onEditDrop}
        >
          <Text style={styles.pillText} numberOfLines={1}>
            {dropName}
          </Text>
          <Ionicons name="pencil" size={13} color="#475569" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Red Pin Dot */}
        <View style={styles.redPinOuterCircle}>
          <View style={styles.redPinInnerDot} />
        </View>
      </View>

      {/* GPS RECENTER BUTTON (Add stop removed, elevated slightly) */}
      <TouchableOpacity
        style={styles.recenterBtn}
        activeOpacity={0.8}
        onPress={onRecenterPress}
      >
        <Ionicons name="locate" size={20} color="#2563EB" />
      </TouchableOpacity>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 340,
    position: 'relative',
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  mapBackgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
  },
  floatingBackBtn: {
    position: 'absolute',
    top: 36,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 10,
  },
  pickupPinWrapper: {
    position: 'absolute',
    top: 55,
    left: '24%',
    alignItems: 'center',
    zIndex: 8,
  },
  dropPinWrapper: {
    position: 'absolute',
    top: 195,
    left: '32%',
    alignItems: 'center',
    zIndex: 8,
  },
  locationPillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    maxWidth: 180,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  greenPinOuterRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 3,
    borderColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenPinInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
  },
  redPinOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
    borderWidth: 3,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redPinInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
  },
  fleetCluster: {
    position: 'absolute',
    top: 135,
    left: '38%',
    width: 20,
    height: 20,
    zIndex: 6,
  },
  fleetVehicle: {
    position: 'absolute',
    padding: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  routeSvgWrapper: {
    position: 'absolute',
    top: 120,
    left: '34%',
    width: 60,
    height: 100,
    zIndex: 4,
  },
  routePathLine: {
    width: 4,
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
    transform: [{ rotate: '12deg' }],
  },
  recenterBtn: {
    position: 'absolute',
    bottom: 30,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 10,
  },
});
