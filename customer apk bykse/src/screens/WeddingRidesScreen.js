import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { WeddingFleetModal } from '../components/wedding/WeddingFleetModal';
import { WeddingDropSearchModal } from '../components/wedding/WeddingDropSearchModal';
import { WeddingEditPickupModal, WeddingTermsModal } from '../components/wedding/WeddingAuxModals';
import {
  weddingCarModels,
  weddingCarColors,
  getPresetDates,
  searchableDelhiPlaces,
} from '../constants/weddingData';

export const WeddingRidesScreen = () => {
  const {
    setCurrentScreen,
    pickup,
    weddingDestination,
    setPickup,
    setWeddingDestination,
    createParcelBooking,
    parcelBookings,
    updateRouteCalculation,
    setDraftBooking,
    cancelActiveBooking,
    setActiveServiceSource,
  } = useApp();

  const insets = useSafeAreaInsets();

  // Locations & Contacts
  const [pickupAddress, setPickupAddress] = useState(
    pickup?.address || 'B/164/1, Sainik Nagar, Mansa Ram Park, Uttam Nagar, Delhi, 110059, India'
  );
  const [senderName, setSenderName] = useState('Nick');
  const [senderPhone, setSenderPhone] = useState('9667617691');

  const [dropAddress, setDropAddress] = useState('');
  const [selectedDropPlace, setSelectedDropPlace] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');

  const [rideType, setRideType] = useState('Luxury Sedan / Baraat');
  const [guestCount, setGuestCount] = useState('1 to 4 Guests');
  const [activeTrackingBooking, setActiveTrackingBooking] = useState(null);

  // Modals
  const [showEditPickupModal, setShowEditPickupModal] = useState(false);
  const [showDropSearchModal, setShowDropSearchModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Search & Recent Drop Locations
  const [searchQuery, setSearchQuery] = useState('');
  const [recentDropLocations, setRecentDropLocations] = useState([]);

  const [selectedCarModel, setSelectedCarModel] = useState('innova');
  const [selectedColor, setSelectedColor] = useState('white');
  const [carQuantity, setCarQuantity] = useState(1);
  const [weddingDate, setWeddingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [customDate, setCustomDate] = useState('');
  const [showWeddingFormModal, setShowWeddingFormModal] = useState(false);
  const [selectedCarNameInput, setSelectedCarNameInput] = useState('Innova Crysta');
  const [selectedColorInput, setSelectedColorInput] = useState('Royal White');

  const selectedCar = weddingCarModels.find((c) => c.id === selectedCarModel) || weddingCarModels[0];
  const calculatedWeddingFare = selectedCar.pricePerDay * carQuantity;

  // Load previously used drop locations from AsyncStorage
  useEffect(() => {
    const loadRecentDrops = async () => {
      try {
        const stored = await AsyncStorage.getItem('@bykse_wedding_recent_drops');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecentDropLocations(parsed);
          }
        }
      } catch (err) {
        // ignore
      }
    };
    loadRecentDrops();
  }, []);

  // Ensure drop address is always blank on screen mount & reset on unmount/leaving
  useEffect(() => {
    setDropAddress('');
    setSelectedDropPlace(null);
    if (setWeddingDestination) setWeddingDestination(null);

    return () => {
      setDropAddress('');
      setSelectedDropPlace(null);
      if (setWeddingDestination) setWeddingDestination(null);
    };
  }, []);

  const handleSelectDropAddress = async (placeItem) => {
    const isObj = typeof placeItem === 'object' && placeItem !== null;
    const placeTitle = isObj ? placeItem.title : placeItem.split(',')[0].trim();
    const placeAddress = isObj
      ? (placeItem.address ? `${placeItem.title}, ${placeItem.address}` : placeItem.title)
      : placeItem;

    const newRecentItem = {
      title: placeTitle,
      address: isObj && placeItem.address ? placeItem.address : placeAddress,
    };

    setSelectedDropPlace({
      title: placeTitle,
      address: placeAddress,
    });

    setDropAddress(placeAddress);
    if (setWeddingDestination) {
      setWeddingDestination({
        id: 'wedding_drop_' + Date.now(),
        address: placeAddress,
        shortName: placeTitle,
        landmark: placeTitle,
      });
    }
    setShowDropSearchModal(false);
    setSearchQuery('');

    const updated = [
      newRecentItem,
      ...recentDropLocations.filter(
        (item) => item.title.toLowerCase() !== newRecentItem.title.toLowerCase()
      ),
    ].slice(0, 15);

    setRecentDropLocations(updated);
    try {
      await AsyncStorage.setItem('@bykse_wedding_recent_drops', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const filteredSearchPlaces = searchableDelhiPlaces.filter((item) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.address.toLowerCase().includes(q);
  });

  const handleSwapLocations = () => {
    if (!dropAddress) {
      Alert.alert('Notice', 'Please select a venue / drop address first before switching.');
      return;
    }
    const tempAddr = pickupAddress;
    const tempName = senderName;
    const tempPhone = senderPhone;

    setPickupAddress(dropAddress);
    setSenderName(receiverName);
    setSenderPhone(receiverPhone);

    setDropAddress(tempAddr);
    setReceiverName(tempName);
    setReceiverPhone(tempPhone);
  };

  const handleBookWeddingRide = () => {
    if (!dropAddress || dropAddress.trim() === '') {
      Alert.alert('Drop Address Required', 'Please choose a venue or drop address to proceed.');
      return;
    }

    if (cancelActiveBooking) {
      cancelActiveBooking();
    }

    let dropTitle = selectedDropPlace?.title;
    if (!dropTitle) {
      const parts = dropAddress.split(',').map((s) => s.trim()).filter(Boolean);
      dropTitle = parts[0] || 'Venue';
    }

    let pickupTitle = 'Sainik Nagar, Uttam Nagar';
    const pickupParts = pickupAddress.split(',').map((s) => s.trim()).filter(Boolean);
    if (pickupParts.length > 1 && /^[A-Za-z0-9\/-]+$/.test(pickupParts[0]) && pickupParts[0].length < 10) {
      pickupTitle = `${pickupParts[0]}, ${pickupParts[1]}`;
    } else if (pickupParts.length > 0) {
      pickupTitle = pickupParts[0];
    }

    let dropCoords = { x: 60, y: 45 };
    let dropDist = 5.8;
    const lowerDrop = (selectedDropPlace?.title || dropAddress).toLowerCase();
    if (lowerDrop.includes('dwarka mor') || lowerDrop.includes('nawada')) {
      dropCoords = { x: 30, y: 35 };
      dropDist = 2.8;
    } else if (lowerDrop.includes('sector 13') || lowerDrop.includes('sector 16')) {
      dropCoords = { x: 55, y: 60 };
      dropDist = 4.8;
    } else if (lowerDrop.includes('vegas') || lowerDrop.includes('dwarka')) {
      dropCoords = { x: 60, y: 45 };
      dropDist = 5.8;
    } else if (lowerDrop.includes('janakpuri')) {
      dropCoords = { x: 42, y: 40 };
      dropDist = 3.5;
    } else if (lowerDrop.includes('connaught') || lowerDrop.includes('cp')) {
      dropCoords = { x: 75, y: 35 };
      dropDist = 18.5;
    } else if (lowerDrop.includes('cyber') || lowerDrop.includes('gurugram')) {
      dropCoords = { x: 80, y: 80 };
      dropDist = 22.0;
    } else if (lowerDrop.includes('noida') || lowerDrop.includes('sector 18')) {
      dropCoords = { x: 85, y: 70 };
      dropDist = 26.0;
    } else if (lowerDrop.includes('saket') || lowerDrop.includes('citywalk')) {
      dropCoords = { x: 68, y: 65 };
      dropDist = 17.5;
    } else if (lowerDrop.includes('karol bagh')) {
      dropCoords = { x: 70, y: 30 };
      dropDist = 16.0;
    }

    const finalPickup = {
      id: 'pickup_wedding_' + Date.now(),
      address: pickupAddress,
      shortName: pickupTitle,
      landmark: pickupTitle,
      lat: 28.6219,
      lng: 77.0375,
      coords: { x: 26, y: 35 },
    };

    const finalDest = {
      id: 'dest_wedding_' + Date.now(),
      address: dropAddress,
      shortName: dropTitle,
      landmark: dropTitle,
      distanceKm: dropDist,
      lat: 28.5921,
      lng: 77.0460,
      coords: dropCoords,
    };

    setPickup(finalPickup);
    if (setWeddingDestination) {
      setWeddingDestination(finalDest);
    }

    if (updateRouteCalculation) {
      updateRouteCalculation(finalPickup, finalDest);
    }

    if (setDraftBooking) {
      const selectedColorObj = weddingCarColors.find((c) => c.id === selectedColor);
      setDraftBooking({
        category: 'cab',
        variant: {
          name: `${carQuantity}x ${selectedCar.name} (${selectedColorObj?.label || 'White'})`,
          finalFare: calculatedWeddingFare,
          weddingDetails: {
            carModel: selectedCarNameInput || selectedCar.name,
            color: selectedColorInput || selectedColorObj?.label || 'White',
            quantity: carQuantity,
            eventDate: customDate.trim() || weddingDate,
            ratePerCar: selectedCar.pricePerDay,
          },
        },
        paymentMethod: 'cash',
        finalFare: calculatedWeddingFare,
        pickup: finalPickup,
        destination: finalDest,
      });
    }

    if (setActiveServiceSource) {
      setActiveServiceSource('WEDDING');
    }

    setCurrentScreen('RIDE_SELECTION');
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBEB" />

      {!activeTrackingBooking ? (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            paddingBottom: insets.bottom > 0 ? insets.bottom + 80 : 90,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* TOP FESTIVE BANNER SECTION */}
          <View style={[styles.topBannerSection, { paddingTop: insets.top > 0 ? insets.top + 8 : 24 }]}>
            {/* Top Bar with Back Button */}
            <View style={styles.topBarRow}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                  setDropAddress('');
                  setSelectedDropPlace(null);
                  if (setWeddingDestination) setWeddingDestination(null);
                  setCurrentScreen('HOME');
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={22} color="#0F172A" />
              </TouchableOpacity>
              <Text style={styles.topBarTitle}>Wedding Rides Fleet</Text>
              <View style={{ width: 38 }} />
            </View>

            {/* Header Title & Tagline */}
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerSubtext}>Doorstep guest pickup & luxury venue rides</Text>
              <View style={styles.weddingTitleRow}>
                <View style={styles.titleLineAccent} />
                <Text style={styles.weddingBigTitle}>WEDDING</Text>
                <View style={styles.titleLineAccent} />
              </View>
            </View>

            {/* Wedding Banner Image */}
            <View style={styles.bannerImageWrapper}>
              <Image
                source={require('../../assets/wedding_banner.jpg')}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* LOWER SECTION WITH CARDS */}
          <View style={styles.lowerContentSection}>
            <View style={styles.cardsWrapper}>
              {/* CARD 1: PICKUP CARD */}
              <View style={styles.routeCard}>
                <View style={styles.cardHeaderRow}>
                  <View style={[styles.pinIconBox, styles.pinIconPickup]}>
                    <Ionicons name="location-sharp" size={18} color="#16A34A" />
                  </View>
                  <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardLabel}>Pickup Location</Text>
                    <Text style={styles.cardAddressText} numberOfLines={2}>
                      {pickupAddress}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.cardEditBtn}
                    onPress={() => setShowEditPickupModal(true)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="pencil" size={15} color="#0F172A" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* FLOATING SWITCH BUTTON */}
              <View style={styles.switchButtonContainer}>
                <TouchableOpacity
                  style={styles.switchButton}
                  activeOpacity={0.8}
                  onPress={handleSwapLocations}
                >
                  <Ionicons name="swap-vertical" size={15} color="#0F172A" />
                  <Text style={styles.switchButtonText}>Switch</Text>
                </TouchableOpacity>
              </View>

              {/* CARD 2: VENUE / DROP TO CARD */}
              <View style={[styles.routeCard, styles.routeCardDrop]}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    if (!dropAddress) {
                      setShowDropSearchModal(true);
                    } else {
                      setShowWeddingFormModal(true);
                    }
                  }}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={[styles.pinIconBox, styles.pinIconDrop]}>
                      <Ionicons name="radio-button-on" size={17} color="#DC2626" />
                    </View>
                    <View style={styles.cardTextWrapper}>
                      <Text style={styles.cardLabel}>Venue / Drop to</Text>
                    </View>
                    {!!dropAddress && (
                      <TouchableOpacity
                        onPress={() => setShowDropSearchModal(true)}
                        style={styles.changeVenueBadge}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="location-outline" size={12} color="#D97706" />
                        <Text style={styles.changeVenueBadgeText}>Change Venue</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Venue Address Input / Display */}
                  <View style={styles.venueInputContainer}>
                    <Text
                      style={[
                        styles.venueAddressDisplay,
                        !dropAddress && styles.venueAddressPlaceholder,
                      ]}
                      numberOfLines={1}
                    >
                      {dropAddress || 'Enter wedding venue or drop address'}
                    </Text>
                    {!!dropAddress && (
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          setDropAddress('');
                          setSelectedDropPlace(null);
                          if (setWeddingDestination) setWeddingDestination(null);
                          if (setDestination) setDestination(null);
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons name="close-circle" size={18} color="#94A3B8" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* WEDDING FLEET DETAILS DISPLAY (WHEN VENUE SELECTED) */}
                  {!!dropAddress && (
                    <View style={styles.fleetDetailsBlock}>
                      <View style={styles.fleetDetailsHeader}>
                        <View style={styles.fleetHeaderLeft}>
                          <View style={styles.fleetHeaderIconWrap}>
                            <MaterialCommunityIcons
                              name="car-multiple"
                              size={18}
                              color="#D97706"
                            />
                          </View>
                          <View>
                            <Text style={styles.fleetHeaderTitle}>Wedding Fleet Details</Text>
                            <Text style={styles.fleetHeaderSubtitle}>Customized for your event</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => setShowWeddingFormModal(true)}
                          style={styles.fleetEditPill}
                          activeOpacity={0.75}
                        >
                          <Ionicons name="pencil" size={12} color="#D97706" />
                          <Text style={styles.fleetEditPillText}>Edit Fleet</Text>
                        </TouchableOpacity>
                      </View>

                      {/* 2x2 Details Grid */}
                      <View style={styles.fleetGrid}>
                        {[
                          {
                            icon: 'car-sport',
                            isMci: false,
                            isColor: false,
                            label: 'VEHICLE',
                            val: selectedCarNameInput || selectedCar.name,
                          },
                          {
                            icon: 'numeric',
                            isMci: true,
                            isColor: false,
                            label: 'FLEET SIZE',
                            val: `${carQuantity} ${carQuantity === 1 ? 'Vehicle' : 'Vehicles'}`,
                          },
                          {
                            icon: 'color-palette',
                            isMci: false,
                            isColor: true,
                            label: 'COLOR',
                            val: selectedColorInput,
                          },
                          {
                            icon: 'calendar',
                            isMci: false,
                            isColor: false,
                            label: 'EVENT DATE',
                            val: customDate.trim() || weddingDate,
                          },
                        ].map((d, i) => (
                          <View key={i} style={styles.fleetGridCell}>
                            {d.isColor ? (
                              <View style={styles.cellIconBox}>
                                <View
                                  style={[
                                    styles.colorPreviewDot,
                                    {
                                      backgroundColor:
                                        weddingCarColors.find((c) => c.id === selectedColor)?.hex || '#FFFFFF',
                                      borderColor:
                                        weddingCarColors.find((c) => c.id === selectedColor)?.border || '#CBD5E1',
                                    },
                                  ]}
                                />
                              </View>
                            ) : (
                              <View style={styles.cellIconBox}>
                                {d.isMci ? (
                                  <MaterialCommunityIcons
                                    name={d.icon}
                                    size={15}
                                    color="#D97706"
                                  />
                                ) : (
                                  <Ionicons
                                    name={d.icon}
                                    size={14}
                                    color="#D97706"
                                  />
                                )}
                              </View>
                            )}
                            <View style={{ flex: 1 }}>
                              <Text style={styles.fleetCellLabel}>{d.label}</Text>
                              <Text style={styles.fleetCellValue} numberOfLines={1}>
                                {d.val}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>

                {/* CONTINUE BUTTON */}
                {!!dropAddress && (
                  <TouchableOpacity
                    style={styles.continueButton}
                    activeOpacity={0.85}
                    onPress={handleBookWeddingRide}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}

      {/* ================= MODAL: WEDDING FLEET RESERVATION FORM ================= */}
      <WeddingFleetModal
        visible={showWeddingFormModal}
        onClose={() => setShowWeddingFormModal(false)}
        selectedDropPlace={selectedDropPlace}
        dropAddress={dropAddress}
        selectedCarNameInput={selectedCarNameInput}
        setSelectedCarNameInput={setSelectedCarNameInput}
        weddingCarModels={weddingCarModels}
        selectedCarModel={selectedCarModel}
        setSelectedCarModel={setSelectedCarModel}
        carQuantity={carQuantity}
        setCarQuantity={setCarQuantity}
        selectedColorInput={selectedColorInput}
        setSelectedColorInput={setSelectedColorInput}
        weddingCarColors={weddingCarColors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        customDate={customDate}
        setCustomDate={setCustomDate}
        weddingDate={weddingDate}
        setWeddingDate={setWeddingDate}
        getPresetDates={getPresetDates}
        selectedCar={selectedCar}
      />

      {/* ================= MODAL 1: DROP TO FULL SCREEN SEARCH ================= */}
      <WeddingDropSearchModal
        visible={showDropSearchModal}
        onClose={() => {
          setShowDropSearchModal(false);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSelectDropAddress={handleSelectDropAddress}
        filteredSearchPlaces={filteredSearchPlaces}
        recentDropLocations={recentDropLocations}
      />

      {/* ================= MODAL 2: EDIT PICKUP ================= */}
      <WeddingEditPickupModal
        visible={showEditPickupModal}
        onClose={() => setShowEditPickupModal(false)}
        pickupAddress={pickupAddress}
        setPickupAddress={setPickupAddress}
      />

      {/* ================= MODAL 3: TERMS & GUIDELINES ================= */}
      <WeddingTermsModal
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Top Festive Header */
  topBannerSection: {
    backgroundColor: '#FFFBEB',
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topBarRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerTitleBox: {
    alignItems: 'center',
    marginTop: 6,
  },
  headerSubtext: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  weddingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  titleLineAccent: {
    width: 24,
    height: 2.5,
    backgroundColor: '#D97706',
    borderRadius: 2,
  },
  weddingBigTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 2,
  },
  bannerImageWrapper: {
    width: '100%',
    height: 150,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '92%',
    height: '100%',
  },

  /* Lower Section & Cards */
  lowerContentSection: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  cardsWrapper: {
    paddingHorizontal: 16,
    marginTop: -16,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  routeCardDrop: {
    marginTop: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pinIconPickup: {
    backgroundColor: '#DCFCE7',
  },
  pinIconDrop: {
    backgroundColor: '#FEE2E2',
  },
  cardTextWrapper: {
    flex: 1,
    paddingRight: 6,
  },
  cardLabel: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardAddressText: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 17,
  },
  cardEditBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Floating Switch Button */
  switchButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: -14,
    marginBottom: -14,
    zIndex: 99,
  },
  switchButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  switchButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Venue Card Specifics */
  changeVenueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  changeVenueBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  venueInputContainer: {
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F8FAFC',
  },
  venueAddressDisplay: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  venueAddressPlaceholder: {
    color: '#94A3B8',
    fontWeight: '500',
  },

  /* Fleet Details Block Inside Venue Card */
  fleetDetailsBlock: {
    marginTop: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  fleetDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  fleetHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fleetHeaderIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fleetHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  fleetHeaderSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  fleetEditPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  fleetEditPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#D97706',
  },
  fleetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fleetGridCell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '48.5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  cellIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  colorPreviewDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.2,
  },
  fleetCellLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  fleetCellValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },

  /* Continue Action Button */
  continueButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  continueButtonText: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
