import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export const LocationSearchScreen = () => {
  const {
    setCurrentScreen,
    pickup,
    setPickup,
    destination,
    setDestination,
    updateRouteCalculation,
    setActiveServiceSource,
  } = useApp();
  const insets = useSafeAreaInsets();

  const [activeField, setActiveField] = useState('drop'); // 'pickup' | 'drop'
  const [pickupText, setPickupText] = useState(pickup?.address || 'Current Location (Uttam Nagar)');
  const [destText, setDestText] = useState(destination?.shortName || destination?.address || '');

  // Keep destText synced with destination state (blank when destination is null)
  useEffect(() => {
    if (!destination) {
      setDestText('');
    } else {
      setDestText(destination.shortName || destination.address || '');
    }
  }, [destination]);

  // Suggestions with 4 popular places (Current Location removed)
  const popularPlaces = [
    {
      id: 'p_cp',
      title: 'Connaught Place (CP)',
      subtitle: 'Rajiv Chowk, Central Delhi, New Delhi',
      distanceKm: 18.5,
      coords: { x: 75, y: 35 },
    },
    {
      id: 'p_vegas',
      title: 'Vegas Mall',
      subtitle: 'Sector 14 Dwarka, Dwarka, Delhi, India',
      distanceKm: 5.8,
      coords: { x: 60, y: 45 },
    },
    {
      id: 'p_airport',
      title: 'Indira Gandhi International Airport (DEL)',
      subtitle: 'Terminal 3, New Delhi, Delhi 110037',
      distanceKm: 16.5,
      coords: { x: 65, y: 60 },
    },
    {
      id: 'p_nawada',
      title: 'Nawada Metro Station',
      subtitle: 'Najafgarh Road, Nawada, Uttam Nagar, Delhi',
      distanceKm: 1.8,
      coords: { x: 30, y: 35 },
    },
  ];

  const currentSearchText = activeField === 'pickup' ? pickupText : destText;
  const filteredPlaces = popularPlaces.filter(
    (p) =>
      !currentSearchText ||
      p.title.toLowerCase().includes(currentSearchText.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(currentSearchText.toLowerCase())
  );

  const handleSelectPlace = (place) => {
    if (activeField === 'pickup') {
      setPickupText(place.title);
      const newPickup = {
        id: place.id,
        address: place.subtitle,
        shortName: place.title,
        landmark: place.title,
        coords: place.coords,
      };
      setPickup(newPickup);
      setActiveField('drop');
    } else {
      setDestText(place.title);
      const newDest = {
        id: place.id,
        address: place.subtitle,
        shortName: place.title,
        landmark: place.title,
        distanceKm: place.distanceKm || 12.0,
        coords: place.coords,
      };
      setDestination(newDest);

      let finalPickup = pickup;
      if (pickupText && pickupText.trim().length > 0) {
        finalPickup = {
          ...pickup,
          address: pickupText.trim(),
          shortName: pickupText.split(',')[0].trim(),
          landmark: pickupText.split(',')[0].trim(),
        };
        setPickup(finalPickup);
      }

      updateRouteCalculation(finalPickup, newDest);
    }
  };

  const handleConfirm = () => {
    let finalPickup = pickup;
    if (pickupText && pickupText.trim().length > 0) {
      const matchedP = popularPlaces.find(
        (p) =>
          p.title.toLowerCase() === pickupText.toLowerCase() ||
          p.subtitle.toLowerCase().includes(pickupText.toLowerCase())
      );
      if (matchedP) {
        finalPickup = {
          id: matchedP.id,
          address: matchedP.subtitle,
          shortName: matchedP.title,
          landmark: matchedP.title,
          coords: matchedP.coords,
        };
      } else {
        finalPickup = {
          id: 'custom_p_' + Date.now(),
          address: pickupText.trim(),
          shortName: pickupText.split(',')[0].trim(),
          landmark: pickupText.split(',')[0].trim(),
          coords: { x: 30, y: 35 },
        };
      }
      setPickup(finalPickup);
    }

    let finalDest = destination;
    if (destText && destText.trim().length > 0) {
      const matchedD = popularPlaces.find(
        (p) =>
          p.title.toLowerCase() === destText.toLowerCase() ||
          p.subtitle.toLowerCase().includes(destText.toLowerCase())
      );
      if (matchedD) {
        finalDest = {
          id: matchedD.id,
          address: matchedD.subtitle,
          shortName: matchedD.title,
          landmark: matchedD.title,
          distanceKm: matchedD.distanceKm || 12.0,
          coords: matchedD.coords,
        };
      } else {
        finalDest = {
          id: 'custom_d_' + Date.now(),
          address: destText.trim(),
          shortName: destText.split(',')[0].trim(),
          landmark: destText.split(',')[0].trim(),
          coords: { x: 60, y: 55 },
        };
      }
      if (setActiveServiceSource) {
        setActiveServiceSource('RIDE');
      }
      setDestination(finalDest);
      updateRouteCalculation(finalPickup, finalDest);
      setCurrentScreen('RIDE_SELECTION');
    } else {
      setActiveField('drop');
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP BAR */}
      <View
        style={[
          styles.topBar,
          { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 8 },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            setDestText('');
            setDestination(null);
            setCurrentScreen('HOME');
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* MAIN SEARCH SECTION */}
      <View style={styles.searchSection}>
        {/* Left Indicator Column */}
        <View style={styles.indicatorCol}>
          <View style={styles.greenRing} />
          <View style={styles.dottedLine} />
          <View style={styles.orangeCircle}>
            <Ionicons name="arrow-down" size={10} color="#FFFFFF" />
          </View>
        </View>

        {/* Right Inputs Column */}
        <View style={styles.inputsCol}>
          {/* Pickup Input Card */}
          <TouchableOpacity
            style={[
              styles.inputCard,
              activeField === 'pickup' && styles.inputCardActivePickup,
            ]}
            onPress={() => setActiveField('pickup')}
            activeOpacity={1}
          >
            <TextInput
              style={styles.textInput}
              value={pickupText}
              onChangeText={(text) => {
                setPickupText(text);
                setActiveField('pickup');
              }}
              onFocus={() => setActiveField('pickup')}
              placeholder="Enter pickup location"
              placeholderTextColor="#94A3B8"
              numberOfLines={1}
            />
            {pickupText.length > 0 && activeField === 'pickup' && (
              <TouchableOpacity onPress={() => setPickupText('')} style={{ padding: 4 }}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {/* Drop Input Card */}
          <TouchableOpacity
            style={[
              styles.inputCard,
              { marginTop: 10 },
              activeField === 'drop' && styles.inputCardActiveDrop,
            ]}
            onPress={() => setActiveField('drop')}
            activeOpacity={1}
          >
            <TextInput
              style={styles.textInput}
              value={destText}
              onChangeText={(text) => {
                setDestText(text);
                setActiveField('drop');
              }}
              onFocus={() => setActiveField('drop')}
              placeholder="Enter drop location"
              placeholderTextColor="#94A3B8"
              autoFocus={true}
            />
            {destText.length > 0 && activeField === 'drop' && (
              <TouchableOpacity onPress={() => setDestText('')} style={{ padding: 4 }}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>



      {/* SUGGESTIONS LIST */}
      <ScrollView
        style={styles.suggestionsScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredPlaces.map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.placeRow}
            activeOpacity={0.7}
            onPress={() => handleSelectPlace(place)}
          >
            <View style={styles.locationIconWrap}>
              <Ionicons
                name="location-sharp"
                size={20}
                color="#64748B"
              />
            </View>

            <View style={styles.placeTextCol}>
              <Text style={styles.placeTitleText} numberOfLines={1}>
                {place.title}
              </Text>
              <Text style={styles.placeSubText} numberOfLines={1}>
                {place.subtitle}
              </Text>
            </View>

            {place.distanceKm > 0 && (
              <Text style={styles.distanceBadge}>{place.distanceKm} km</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* BOTTOM CONFIRM BUTTON */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 20 },
        ]}
      >
        <TouchableOpacity
          style={styles.confirmBtn}
          activeOpacity={0.85}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmBtnText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    padding: 6,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 24,
    paddingTop: 14,
  },
  greenRing: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#059669',
    backgroundColor: '#FFFFFF',
  },
  dottedLine: {
    width: 2,
    height: 28,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#94A3B8',
    marginVertical: 4,
  },
  orangeCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsCol: {
    flex: 1,
    marginLeft: 12,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputCardActivePickup: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
  },
  inputCardActiveDrop: {
    borderColor: '#1E3A8A',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  selectionIndicatorStrip: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  selectionIndicatorText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  suggestionsScroll: {
    flex: 1,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  locationIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  placeTextCol: {
    flex: 1,
  },
  placeTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  placeSubText: {
    fontSize: 12,
    color: '#64748B',
  },
  distanceBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
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
