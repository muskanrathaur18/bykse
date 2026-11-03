import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from '../components/map/InteractiveMap';

export const CheckPickupPointScreen = () => {
  const {
    setCurrentScreen,
    pickup,
    destination,
    draftBooking,
    initiateBooking,
    paymentMethod,
    activeServiceSource,
  } = useApp();
  const insets = useSafeAreaInsets();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleEditLocation = () => {
    if (activeServiceSource === 'PARCEL') {
      setCurrentScreen('PARCEL_DELIVERY');
    } else if (activeServiceSource === 'WEDDING') {
      setCurrentScreen('WEDDING_RIDES');
    } else {
      setCurrentScreen('LOCATION_SEARCH');
    }
  };

  const formatPillName = (text, fallback) => {
    if (!text) return fallback;
    if (text.length > 18) {
      return text.substring(0, 16) + '...';
    }
    return text;
  };

  // Dynamic Pickup & Drop from active selection or draft booking
  const activePickup = draftBooking?.pickup || pickup;
  const activeDrop = draftBooking?.destination || destination;

  const rawAddress = activePickup?.address || activePickup?.shortName || 'Pickup Location';
  let addressTitle = activePickup?.shortName || activePickup?.landmark || 'Pickup Location';
  let addressSubtitle = rawAddress;

  if (rawAddress.includes(',')) {
    const parts = rawAddress.split(',');
    addressTitle = parts[0].trim();
    addressSubtitle = parts.slice(1).join(',').trim();
  } else if (activePickup?.shortName) {
    addressTitle = activePickup.shortName;
    addressSubtitle = rawAddress;
  }

  const handleConfirmPickup = async () => {
    if (isConfirming) return;
    setIsConfirming(true);

    try {
      const bookingPayload = draftBooking || {
        category: 'bike',
        variant: {
          name: 'Bike',
          finalFare: 180,
        },
        paymentMethod: paymentMethod || 'cash',
        finalFare: 180,
      };

      await initiateBooking(bookingPayload);
    } catch (e) {
      console.error('Error confirming booking:', e);
      setIsConfirming(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP MAP SECTION: Shows Pickup to Drop route with animated vehicles and pins */}
      <View style={styles.mapArea}>
        <InteractiveMap
          pickupName={formatPillName(activePickup?.shortName || activePickup?.landmark || activePickup?.address, 'Pickup')}
          dropName={formatPillName(activeDrop?.shortName || activeDrop?.landmark || activeDrop?.address, 'Drop')}
          onBackPress={() => setCurrentScreen('RIDE_SELECTION')}
          onEditPickup={handleEditLocation}
          onEditDrop={handleEditLocation}
          onRecenterPress={() => {}}
          style={styles.mapInner}
        />
      </View>

      {/* BOTTOM SHEET / CARD: "Check your pickup point" */}
      <View style={[styles.bottomCard, { paddingBottom: insets.bottom > 0 ? insets.bottom + 14 : 20 }]}>
        {/* Top Header Row with Green Location Pin */}
        <View style={styles.headerRow}>
          <View style={styles.locationIconBadge}>
            <Ionicons name="location-sharp" size={24} color="#15803D" />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.cardTitle}>Check your pickup point</Text>
            <Text style={styles.cardSubtitle}>Select a nearby point for easier pickup</Text>
          </View>
        </View>

        {/* Green Bordered Address Box */}
        <View style={styles.addressBox}>
          <Text style={styles.addressTitle} numberOfLines={1}>{addressTitle}</Text>
          <Text style={styles.addressSubtitle} numberOfLines={1}>{addressSubtitle}</Text>
          {destination?.address && (
            <View style={styles.dropRow}>
              <View style={styles.redDot} />
              <Text style={styles.dropText} numberOfLines={1}>
                Drop: {activeDrop?.shortName || activeDrop?.landmark || activeDrop?.address}
              </Text>
            </View>
          )}
        </View>

        {/* Yellow Confirm Pickup Button */}
        <TouchableOpacity
          style={styles.confirmBtn}
          activeOpacity={0.88}
          disabled={isConfirming}
          onPress={handleConfirmPickup}
        >
          {isConfirming ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.confirmBtnText}>Confirm pickup</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  mapInner: {
    width: '100%',
    height: '100%',
  },
  pickupTooltipWrapper: {
    position: 'absolute',
    top: 15,
    left: '14%',
    alignItems: 'center',
    zIndex: 12,
  },
  tooltipPill: {
    backgroundColor: '#15803D',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 4,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  triangleDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#15803D',
    alignSelf: 'center',
    marginBottom: 2,
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  addressBox: {
    borderWidth: 1.5,
    borderColor: '#15803D',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  addressSubtitle: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  dropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: 6,
  },
  dropText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    flex: 1,
  },
  confirmBtn: {
    height: 52,
    backgroundColor: '#0F172A',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});


