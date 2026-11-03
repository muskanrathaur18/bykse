import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export const HomeScreen = () => {
  const {
    setCurrentScreen,
    user,
    pickup,
    setPickup,
    destination,
    setDestination,
    parcelDestination,
    setParcelDestination,
    weddingDestination,
    setWeddingDestination,
    setSelectedRideCategory,
    activeBooking,
    walletBalance,
    updateRouteCalculation,
    showWeddingModal,
    setShowWeddingModal,
  } = useApp();

  const insets = useSafeAreaInsets();

  // Modals
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(['rec1']);

  // Recent Destinations (matching user screenshot)
  const recentPlaces = [
    {
      id: 'rec1',
      title: 'Nangal Dewat',
      subtitle: 'Sector D, Vasant Kunj, New Delhi, Delhi, India',
      coords: { x: 45, y: 55 },
    },
    {
      id: 'rec2',
      title: 'Vegas Mall',
      subtitle: 'North, Pocket 1, Sector 14 Dwarka, Dwarka, Delhi, India',
      coords: { x: 70, y: 40 },
    },
    {
      id: 'rec3',
      title: 'Dwarka Metro Station DMRC Parking',
      subtitle: 'Har Nagar, Sector 16, Dwarka, Delhi, India',
      coords: { x: 60, y: 75 },
    },
  ];

  // All Services list (Excludes Bus Ticket & Travel, replaces Metro with Wedding Rides)
  const allServicesList = [
    {
      id: 'auto_shuttle',
      title: 'Auto Shuttle',
      badge: 'POOL',
      iconType: 'mci',
      iconName: 'rickshaw',
      iconColor: '#059669',
      bgColor: '#ECFDF5',
      action: () => {
        setSelectedRideCategory('auto');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'wedding_rides',
      title: 'Wedding Rides',
      badge: 'OFFERS',
      iconType: 'fa5',
      iconName: 'car-side',
      iconColor: '#D97706',
      bgColor: '#FEF3C7',
      action: () => {
        if (setWeddingDestination) setWeddingDestination(null);
        setCurrentScreen('WEDDING_RIDES');
      },
    },

    {
      id: 'parcel',
      title: 'Parcel',
      badge: null,
      iconType: 'mci',
      iconName: 'package-variant-closed',
      iconColor: '#CA8A04',
      bgColor: '#FEF9C3',
      action: () => {
        if (setParcelDestination) setParcelDestination(null);
        setCurrentScreen('PARCEL_DELIVERY');
      },
    },
    {
      id: 'cab_economy',
      title: 'Cab Economy',
      badge: null,
      iconType: 'ion',
      iconName: 'car',
      iconColor: '#2563EB',
      bgColor: '#EFF6FF',
      action: () => {
        setSelectedRideCategory('cab');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'auto',
      title: 'Auto',
      badge: null,
      iconType: 'fa5',
      iconName: 'shuttle-van',
      iconColor: '#059669',
      bgColor: '#D1FAE5',
      action: () => {
        setSelectedRideCategory('auto');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'bike',
      title: 'Bike',
      badge: null,
      iconType: 'mci',
      iconName: 'motorbike',
      iconColor: '#D97706',
      bgColor: '#FEF3C7',
      action: () => {
        setSelectedRideCategory('bike');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'bike_lite',
      title: 'Bike Lite',
      badge: 'SAVE',
      iconType: 'mci',
      iconName: 'moped',
      iconColor: '#10B981',
      bgColor: '#ECFDF5',
      action: () => {
        setSelectedRideCategory('bike');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'cab_premium',
      title: 'Cab Premium',
      badge: 'LUXURY',
      iconType: 'fa5',
      iconName: 'gem',
      iconColor: '#F59E0B',
      bgColor: '#FFFBEB',
      action: () => {
        setSelectedRideCategory('cab');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'cab_priority',
      title: 'Cab Priority',
      badge: 'FASTEST',
      iconType: 'ion',
      iconName: 'flash',
      iconColor: '#EF4444',
      bgColor: '#FEF2F2',
      action: () => {
        setSelectedRideCategory('cab');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
    {
      id: 'e_rickshaw',
      title: 'E-Rickshaw',
      badge: 'ECO',
      iconType: 'mci',
      iconName: 'scooter-electric',
      iconColor: '#047857',
      bgColor: '#E6FFFA',
      action: () => {
        setSelectedRideCategory('auto');
        setCurrentScreen('LOCATION_SEARCH');
      },
    },
  ];

  const handleSelectRecent = (place) => {
    if (activeBooking && activeBooking.status !== 'CANCELLED') {
      setCurrentScreen('BOOKING_STATUS');
      return;
    }
    const newDest = {
      id: place.id,
      address: place.subtitle,
      shortName: place.title,
      landmark: place.title,
      distanceKm: place.distanceKm || (place.id === 'rec1' ? 14.2 : place.id === 'rec2' ? 5.8 : 4.5),
      coords: place.coords,
    };
    setDestination(newDest);
    updateRouteCalculation(pickup, newDest);
    setCurrentScreen('LOCATION_SEARCH');
  };

  const toggleFavorite = (id) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* MAIN FULL-PAGE SCROLL VIEW */}
      <ScrollView
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 16,
          paddingBottom: 24,
        }}
      >
        {/* SEARCH BAR: "Where do you want to go?" */}
        <TouchableOpacity
          style={styles.searchBarBox}
          activeOpacity={0.8}
          onPress={() => {
            setDestination(null);
            setCurrentScreen('LOCATION_SEARCH');
          }}
        >
          <Ionicons name="search" size={20} color="#0F172A" style={{ marginRight: 10 }} />
          <Text style={styles.searchBarPlaceholder}>Where do you want to go?</Text>
        </TouchableOpacity>

        {/* RECENT DESTINATIONS LIST (WITH CLOCK AND HEART ICONS) */}
        <View style={styles.recentsListContainer}>
          {recentPlaces.map((item, index) => {
            const isFav = favoriteIds.includes(item.id);
            return (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.recentRow}
                  activeOpacity={0.7}
                  onPress={() => handleSelectRecent(item)}
                >
                  <View style={styles.clockIconWrap}>
                    <Ionicons name="time-outline" size={20} color="#64748B" />
                  </View>

                  <View style={styles.recentTextCol}>
                    <Text style={styles.recentTitleText} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.recentSubText} numberOfLines={1}>
                      {item.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Dotted divider between rows */}
                {index < recentPlaces.length - 1 && <View style={styles.dottedDivider} />}
              </View>
            );
          })}
        </View>

        {/* "FOR YOU" SERVICES SECTION (Matching User Request) */}
        <View style={styles.forYouContainer}>
          {/* Header: For you */}
          <View style={styles.forYouHeader}>
            <Text style={styles.forYouTitle}>For you</Text>
          </View>

          {/* Grid of services */}
          <View style={styles.forYouGrid}>
            {/* 1. PARCEL */}
            <TouchableOpacity
              style={styles.forYouItem}
              activeOpacity={0.75}
              onPress={() => {
                if (setParcelDestination) setParcelDestination(null);
                setCurrentScreen('PARCEL_DELIVERY');
              }}
            >
              <View style={styles.forYouCircleAvatar}>
                <MaterialCommunityIcons name="package-variant-closed" size={28} color="#D97706" />
              </View>
              <Text style={styles.forYouItemTitle}>Parcel</Text>
            </TouchableOpacity>

            {/* 2. BIKE */}
            <TouchableOpacity
              style={styles.forYouItem}
              activeOpacity={0.75}
              onPress={() => {
                setSelectedRideCategory('bike');
                setDestination(null);
                setCurrentScreen('LOCATION_SEARCH');
              }}
            >
              <View style={styles.forYouCircleAvatar}>
                <MaterialCommunityIcons name="motorbike" size={32} color="#F97316" />
              </View>
              <Text style={styles.forYouItemTitle}>Bike</Text>
            </TouchableOpacity>

            {/* 3. CAB */}
            <TouchableOpacity
              style={styles.forYouItem}
              activeOpacity={0.75}
              onPress={() => {
                setSelectedRideCategory('cab');
                setDestination(null);
                setCurrentScreen('LOCATION_SEARCH');
              }}
            >
              <View style={styles.forYouCircleAvatar}>
                <FontAwesome5 name="car-side" size={24} color="#0F172A" />
              </View>
              <Text style={styles.forYouItemTitle}>Cab</Text>
            </TouchableOpacity>

            {/* 4. AUTO */}
            <TouchableOpacity
              style={styles.forYouItem}
              activeOpacity={0.75}
              onPress={() => {
                setSelectedRideCategory('auto');
                setDestination(null);
                setCurrentScreen('LOCATION_SEARCH');
              }}
            >
              <View style={styles.forYouCircleAvatar}>
                <MaterialCommunityIcons name="rickshaw" size={30} color="#059669" />
              </View>
              <Text style={styles.forYouItemTitle}>Auto</Text>
            </TouchableOpacity>

            {/* 5. E-RICKSHAW */}
            <TouchableOpacity
              style={styles.forYouItem}
              activeOpacity={0.75}
              onPress={() => {
                setSelectedRideCategory('auto');
                setDestination(null);
                setCurrentScreen('LOCATION_SEARCH');
              }}
            >
              <View style={styles.forYouCircleAvatar}>
                <FontAwesome5 name="shuttle-van" size={24} color="#047857" />
              </View>
              <Text style={styles.forYouItemTitle}>E-Rickshaw</Text>
            </TouchableOpacity>

            {/* 6. WEDDING */}
            <TouchableOpacity
              style={styles.forYouItem}
              activeOpacity={0.75}
              onPress={() => {
                if (setWeddingDestination) setWeddingDestination(null);
                setCurrentScreen('WEDDING_RIDES');
              }}
            >
              <View style={styles.forYouCircleAvatar}>
                <FontAwesome5 name="car" size={24} color="#D97706" />
              </View>
              <Text style={styles.forYouItemTitle}>Wedding</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ACTIVE BOOKING CHIP IF ANY */}
        {activeBooking && activeBooking.status !== 'CANCELLED' && (
          <TouchableOpacity
            style={styles.activeRideBanner}
            onPress={() => setCurrentScreen('BOOKING_STATUS')}
          >
            <View style={styles.activeRideDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activeRideTitle}>Active Ride in Progress</Text>
              <Text style={styles.activeRideSub}>Tap to open live trip tracking</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#1E293B" />
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* ALL SERVICES BOTTOM SHEET MODAL */}
      <Modal visible={showAllServicesModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.allServicesCard}>
            <View style={styles.modalGrabBar} />

            <View style={styles.allServicesHeader}>
              <Text style={styles.allServicesTitle}>All services</Text>
              <TouchableOpacity
                style={styles.modalCloseCircle}
                onPress={() => setShowAllServicesModal(false)}
              >
                <Ionicons name="close" size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.servicesGridList}>
              {allServicesList.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceGridItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowAllServicesModal(false);
                    service.action();
                  }}
                >
                  <View style={[styles.serviceIconCard, { backgroundColor: service.bgColor }]}>
                    {service.iconType === 'mci' && (
                      <MaterialCommunityIcons name={service.iconName} size={28} color={service.iconColor} />
                    )}
                    {service.iconType === 'fa5' && (
                      <FontAwesome5 name={service.iconName} size={24} color={service.iconColor} />
                    )}
                    {service.iconType === 'ion' && (
                      <Ionicons name={service.iconName} size={28} color={service.iconColor} />
                    )}
                    {service.badge && (
                      <View style={styles.serviceMiniBadge}>
                        <Text style={styles.serviceMiniBadgeText}>{service.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.serviceItemLabel} numberOfLines={2}>
                    {service.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  locationPillBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillGreenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  pillAddressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    flexShrink: 1,
  },
  notificationBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mainScroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  searchBarPlaceholder: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  recentsListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  clockIconWrap: {
    marginRight: 14,
  },
  recentTextCol: {
    flex: 1,
    marginRight: 10,
  },
  recentTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  recentSubText: {
    fontSize: 12,
    color: '#64748B',
  },
  heartBtn: {
    padding: 6,
  },
  dottedDivider: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    borderStyle: 'dashed',
    marginVertical: 2,
  },
  forYouContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
    marginTop: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  forYouHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  forYouTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  forYouGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    rowGap: 16,
  },
  forYouItem: {
    width: '25%',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 4,
  },
  forYouCircleAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  forYouItemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 8,
    textAlign: 'center',
  },
  activeRideBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
    gap: 10,
  },
  activeRideDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D97706',
  },
  activeRideTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  activeRideSub: {
    fontSize: 11,
    color: '#B45309',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    elevation: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    zIndex: 9999,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  bottomNavLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 3,
  },
  bottomNavLabelActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  allServicesCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 36,
    maxHeight: '80%',
  },
  modalGrabBar: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 12,
  },
  allServicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  allServicesTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalCloseCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesGridList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  serviceGridItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 18,
  },
  serviceIconCard: {
    width: 58,
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 6,
  },
  serviceMiniBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10B981',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  serviceMiniBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  serviceItemLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 14,
  },
  weddingModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 36,
  },
  weddingModalHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  weddingModalSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  weddingOptionCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginVertical: 6,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  weddingOptionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weddingOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  weddingOptionDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 15,
  },
  weddingOptionPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    marginTop: 4,
  },
  weddingBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 16,
    gap: 8,
  },
  weddingBookBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

