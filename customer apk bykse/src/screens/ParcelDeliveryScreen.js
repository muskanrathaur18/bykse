
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StatusBar,
  Image,
  Dimensions,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

export const ParcelDeliveryScreen = () => {
  const {
    setCurrentScreen,
    pickup,
    parcelDestination,
    setPickup,
    setParcelDestination,
    createParcelBooking,
    parcelBookings,
    updateRouteCalculation,
    setDraftBooking,
    cancelActiveBooking,
    setActiveServiceSource,
  } = useApp();

  const insets = useSafeAreaInsets();

  // Locations & Contacts matching screenshot
  const [pickupAddress, setPickupAddress] = useState(
    pickup?.address || 'B/164/1, Sainik Nagar, Mansa Ram Park, Uttam Nagar, Delhi, 110059, India'
  );
  const [senderName, setSenderName] = useState('Nick');
  const [senderPhone, setSenderPhone] = useState('9667617691');

  const [dropAddress, setDropAddress] = useState('');
  const [selectedDropPlace, setSelectedDropPlace] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');


  const [parcelType, setParcelType] = useState('Documents & Files');
  const [weightKg, setWeightKg] = useState('Up to 3 kg');
  const [activeTrackingParcel, setActiveTrackingParcel] = useState(null);

  // Modals
  const [showEditPickupModal, setShowEditPickupModal] = useState(false);
  const [showDropSearchModal, setShowDropSearchModal] = useState(false);
  const [showDropContactModal, setShowDropContactModal] = useState(false);
  const [showProhibitedModal, setShowProhibitedModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Confirm drop details fields (matching screenshot)
  const [dropHouseBuilding, setDropHouseBuilding] = useState('');
  const [useMyContact, setUseMyContact] = useState(false);
  const [selectedFavouriteTag, setSelectedFavouriteTag] = useState(null);

  // Search & Recent Drop Locations
  const [searchQuery, setSearchQuery] = useState('');
  const [recentDropLocations, setRecentDropLocations] = useState([]);

  const estimatedParcelFare = 65;

  // Searchable places in Delhi NCR
  const searchableDelhiPlaces = [
    { title: 'Dwarka Mor Metro Station', address: 'Roshan Garden, Bhagwati Garden, Nawada, Delhi' },
    { title: 'Metro Station Dwarka Sector 13', address: 'Sector 13, Dwarka, Delhi, India' },
    { title: 'Dwarka Metro Station DMRC Parking', address: 'Har Nagar, Sector 16, Dwarka, Delhi, India' },
    { title: 'Vegas Mall', address: 'North, Pocket 1, Sector 14 Dwarka, Dwarka, Delhi' },
    { title: 'Connaught Place', address: 'Inner Circle, Block C, Connaught Place, New Delhi' },
    { title: 'DLF Cyber City', address: 'Phase 2, Sector 24, Gurugram, Haryana' },
    { title: 'Sector 18 Market Noida', address: 'Wave Silver Tower, Sector 18, Noida' },
    { title: 'Karol Bagh Market', address: 'Arya Samaj Road, Karol Bagh, New Delhi' },
    { title: 'Saket Select Citywalk', address: 'Press Enclave Road, Saket, New Delhi' },
    { title: 'Janakpuri West Metro', address: 'Chander Nagar, Janakpuri, New Delhi' },
    { title: 'Uttam Nagar East', address: 'Najafgarh Road, Uttam Nagar, New Delhi' },
  ];

  // Load previously used drop locations from AsyncStorage
  useEffect(() => {
    const loadRecentDrops = async () => {
      try {
        const stored = await AsyncStorage.getItem('@bykse_parcel_recent_drops');
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
    if (setParcelDestination) setParcelDestination(null);

    return () => {
      setDropAddress('');
      setSelectedDropPlace(null);
      if (setParcelDestination) setParcelDestination(null);
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
    if (setParcelDestination) {
      setParcelDestination({
        id: 'parcel_drop_' + Date.now(),
        address: placeAddress,
        shortName: placeTitle,
        landmark: placeTitle,
      });
    }
    setShowDropSearchModal(false);
    setSearchQuery('');

    // Save to recents without duplicates (so next time it shows in suggestions)
    const updated = [
      newRecentItem,
      ...recentDropLocations.filter(
        (item) => item.title.toLowerCase() !== newRecentItem.title.toLowerCase()
      ),
    ].slice(0, 15);

    setRecentDropLocations(updated);
    try {
      await AsyncStorage.setItem('@bykse_parcel_recent_drops', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    // Open "Confirm drop details" slide modal matching user image
    setTimeout(() => {
      setShowDropContactModal(true);
    }, 250);
  };


  const handleConfirmDropDetails = () => {
    if (dropHouseBuilding.trim()) {
      setDropAddress(`${dropHouseBuilding.trim()}, ${dropAddress}`);
    }
    setShowDropContactModal(false);
  };


  const filteredSearchPlaces = searchableDelhiPlaces.filter((item) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.address.toLowerCase().includes(q);
  });

  const handleSwapLocations = () => {
    if (!dropAddress) {
      Alert.alert('Notice', 'Please select a drop address first before switching.');
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

  const handleBookParcel = () => {
    if (!dropAddress || dropAddress.trim() === '') {
      Alert.alert('Drop Address Required', 'Please choose a drop address to proceed.');
      return;
    }

    // Clear any previous active booking so old ride locations are never reused
    if (cancelActiveBooking) {
      cancelActiveBooking();
    }

    // Resolve clean Drop title from selected drop place
    let dropTitle = selectedDropPlace?.title;
    if (!dropTitle) {
      const parts = dropAddress.split(',').map((s) => s.trim()).filter(Boolean);
      dropTitle = parts[0] || 'Drop Location';
    }

    // Resolve clean Pickup title
    let pickupTitle = 'Sainik Nagar, Uttam Nagar';
    const pickupParts = pickupAddress.split(',').map((s) => s.trim()).filter(Boolean);
    if (pickupParts.length > 1 && /^[A-Za-z0-9\/-]+$/.test(pickupParts[0]) && pickupParts[0].length < 10) {
      pickupTitle = `${pickupParts[0]}, ${pickupParts[1]}`;
    } else if (pickupParts.length > 0) {
      pickupTitle = pickupParts[0];
    }

    // Resolve accurate coordinates & distance for Delhi NCR places
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
      id: 'pickup_parcel_' + Date.now(),
      address: pickupAddress,
      shortName: pickupTitle,
      landmark: pickupTitle,
      lat: 28.6219,
      lng: 77.0375,
      coords: { x: 26, y: 35 },
    };

    const finalDest = {
      id: 'dest_parcel_' + Date.now(),
      address: dropAddress,
      shortName: dropTitle,
      landmark: dropTitle,
      distanceKm: dropDist,
      lat: 28.5921,
      lng: 77.0460,
      coords: dropCoords,
    };

    setPickup(finalPickup);
    if (setParcelDestination) {
      setParcelDestination(finalDest);
    }

    if (updateRouteCalculation) {
      updateRouteCalculation(finalPickup, finalDest);
    }

    if (setDraftBooking) {
      setDraftBooking({
        category: 'bike',
        variant: {
          name: 'Bike',
          finalFare: 65,
        },
        paymentMethod: 'cash',
        finalFare: 65,
        pickup: finalPickup,
        destination: finalDest,
      });
    }

    if (createParcelBooking) {
      createParcelBooking({
        itemType: parcelType,
        weightKg,
        senderName,
        senderPhone,
        receiverName: receiverName || 'Receiver',
        receiverPhone: receiverPhone || '9876543210',
        pickup: pickupAddress,
        drop: dropAddress,
        fare: estimatedParcelFare,
      });
    }

    if (setActiveServiceSource) {
      setActiveServiceSource('PARCEL');
    }

    // Navigate to Ride Selection -> Check Pickup -> Booking Status (finding) -> Captain Confirmed
    setCurrentScreen('RIDE_SELECTION');
  };



  return (
    <View style={{"flex":1,"backgroundColor":"#D8E8FA"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#D8E8FA" />

      {/* BACKGROUND GRADIENT/CONTAINER */}
      <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
        {!activeTrackingParcel ? (
          <ScrollView
            style={{"flex":1,"backgroundColor":"#FFFFFF"}}
            contentContainerStyle={{
              paddingBottom: insets.bottom > 0 ? insets.bottom + 80 : 90,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* TOP BLUE SECTION (Only up to banner) */}
            <View style={[{"backgroundColor":"#D8E8FA","paddingBottom":24}, { paddingTop: insets.top > 0 ? insets.top + 8 : 28 }]}>
              {/* TOP BAR WITH BACK BUTTON */}
              <View style={{"paddingHorizontal":16,"flexDirection":"row","alignItems":"center","marginBottom":4}}>
                <TouchableOpacity
                  style={{"width":38,"height":38,"borderRadius":19,"backgroundColor":"rgba(255,255,255,0.7)","justifyContent":"center","alignItems":"center"}}
                  onPress={() => {
                    setDropAddress('');
                    setSelectedDropPlace(null);
                    if (setParcelDestination) setParcelDestination(null);
                    setCurrentScreen('HOME');
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>

              {/* HEADER TEXT */}
              <View style={{"alignItems":"center","marginTop":4}}>
                <Text style={{"fontSize":16,"fontWeight":"600","color":"#1E293B","textAlign":"center"}}>Doorstep pickup and delivery</Text>
                <View style={{"flexDirection":"row","alignItems":"center","marginTop":6,"gap":8}}>
                  {/* 2 horizontal speed lines */}
                  <View style={{"alignItems":"flex-start"}}>
                    <View style={[{"height":3.5,"backgroundColor":"#1E293B","borderRadius":2}, { width: 14 }]} />
                    <View style={[{"height":3.5,"backgroundColor":"#1E293B","borderRadius":2}, { width: 22, marginTop: 4 }]} />
                  </View>
                  <Text style={{"fontSize":32,"fontWeight":"900","color":"#1E293B"}}>PARCEL</Text>
                </View>
              </View>

              {/* ILLUSTRATION BANNER MATCHING SCREENSHOT */}
              <View style={{"width":"100%","height":155,"marginVertical":6,"justifyContent":"center","alignItems":"center"}}>
                <Image
                  source={require('../../assets/parcel_banner.jpg')}
                  style={{"width":"92%","height":"100%"}}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* WHITE LOWER SECTION */}
            <View style={{"backgroundColor":"#FFFFFF","flex":1,"minHeight":400}}>
              {/* CARDS CONTAINER */}
              <View style={{"paddingHorizontal":16,"marginTop":-22}}>
                {/* CARD 1: PICKUP CARD */}
              <View style={{"position":"relative","backgroundColor":"#FFFFFF","borderRadius":18,"padding":16}}>
                <View style={{"flexDirection":"row","alignItems":"flex-start"}}>
                  {/* Green Pin Icon */}
                  <View style={{"marginTop":2,"marginRight":10}}>
                    <Ionicons name="location-sharp" size={22} color="#15803D" />
                  </View>

                  {/* Title & Address */}
                  <View style={{"flex":1,"paddingRight":8}}>
                    <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Pickup from current location</Text>
                    <Text style={{"fontSize":13,"color":"#64748B","marginTop":4,"lineHeight":18}} numberOfLines={2}>
                      {pickupAddress}
                    </Text>
                  </View>

                  {/* Edit Pencil Icon */}
                  <TouchableOpacity
                    style={{"padding":6}}
                    onPress={() => setShowEditPickupModal(true)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="pencil" size={16} color="#0F172A" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* FLOATING SWITCH BUTTON - ON TOP OF DROP CARD */}
              <View style={{"alignItems":"flex-end","paddingRight":16,"marginTop":-16,"marginBottom":-16,"zIndex":999}}>
                <TouchableOpacity
                  style={{"backgroundColor":"#FFFFFF","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":20,"paddingHorizontal":14,"paddingVertical":7,"flexDirection":"row","alignItems":"center","gap":6,"zIndex":999}}
                  activeOpacity={0.8}
                  onPress={handleSwapLocations}
                >
                  <Ionicons name="swap-vertical" size={16} color="#0F172A" />
                  <Text style={{"fontSize":13,"fontWeight":"700","color":"#0F172A"}}>Switch</Text>
                </TouchableOpacity>
              </View>

              {/* CARD 2: DROP TO CARD */}
              <TouchableOpacity
                style={{"backgroundColor":"#FFFFFF","borderRadius":18,"padding":16,"marginTop":14}}
                activeOpacity={0.85}
                onPress={() => setShowDropSearchModal(true)}
              >
                <View style={{"flexDirection":"row","alignItems":"center"}}>
                  {/* Red Target Icon */}
                  <Ionicons name="radio-button-on" size={18} color="#EF4444" />
                  <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A","marginLeft":8}}>Drop to</Text>
                </View>

                {/* Normal Input Field Display with Placeholder */}
                <View style={{"borderWidth":1.5,"borderColor":"#0F172A","borderRadius":25,"paddingHorizontal":16,"paddingVertical":10,"flexDirection":"row","alignItems":"center","marginTop":14,"backgroundColor":"#FFFFFF"}}>
                  <Text
                    style={[
                      styles.dropTextInput,
                      !dropAddress && { color: '#94A3B8', fontWeight: '500' },
                    ]}
                    numberOfLines={1}
                  >
                    {dropAddress || 'Enter drop address'}
                  </Text>
                  {!!dropAddress && (
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        setDropAddress('');
                        setSelectedDropPlace(null);
                        if (setParcelDestination) setParcelDestination(null);
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="close-circle" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* If Drop Address is chosen: Show Receiver Info */}
                {!!dropAddress && (
                  <View style={{"marginTop":4}}>
                    <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0","marginVertical":12}} />
                    <View style={{"flexDirection":"row","alignItems":"center","gap":6}}>
                      <Ionicons name="person-outline" size={16} color="#64748B" />
                      <Text style={{"fontSize":13,"color":"#64748B"}}>
                        Delivering to: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{receiverName} ({receiverPhone})</Text>
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>

              {/* IF DESTINATION IS SELECTED: CONTINUE BUTTON */}
              {!!dropAddress && (
                <TouchableOpacity
                  style={{"backgroundColor":"#0F172A","paddingVertical":15,"borderRadius":16,"alignItems":"center","justifyContent":"center","marginTop":36}}
                  activeOpacity={0.85}
                  onPress={handleBookParcel}
                >
                  <Text style={{"fontSize":16,"fontWeight":"800","color":"#FFFFFF"}}>Continue</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        </ScrollView>
        ) : (
          /* ================= LIVE PARCEL TRACKING SCREEN ================= */
          <ScrollView
            style={{"flex":1,"backgroundColor":"#FFFFFF"}}
            contentContainerStyle={{
              paddingTop: insets.top > 0 ? insets.top + 16 : 32,
              paddingBottom: 40,
              paddingHorizontal: 16,
            }}
          >
            <View style={{"marginBottom":16}}>
              <View style={{"backgroundColor":"#1E3A8A","padding":18,"borderRadius":16,"alignItems":"center"}}>
                <Text style={{"fontSize":12,"fontWeight":"800","color":"#93C5FD"}}>DELIVERY CONFIRMATION PIN</Text>
                <Text style={{"fontSize":36,"fontWeight":"900","color":"#FFFFFF","marginVertical":6}}>
                  {activeTrackingParcel.deliveryPin || '3471'}
                </Text>
                <Text style={{"fontSize":12,"color":"#DBEAFE"}}>Share this PIN with receiver upon hand-over</Text>
              </View>
            </View>

            <View style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#FFFFFF","padding":16,"borderRadius":16,"marginBottom":16}}>
              <View style={{"width":44,"height":44,"borderRadius":22,"backgroundColor":"#DCFCE7","justifyContent":"center","alignItems":"center"}}>
                <Ionicons name="bicycle" size={24} color="#15803D" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Delivery Partner Assigned</Text>
                <Text style={{"fontSize":12,"color":"#64748B","marginTop":2}}>ARUN (TVS Radeon) is arriving for pickup in 4 mins.</Text>
              </View>
            </View>

            <View style={{"backgroundColor":"#FFFFFF","padding":16,"borderRadius":16,"marginBottom":20}}>
              <Text style={{"fontSize":15,"fontWeight":"800","color":"#0F172A","marginBottom":10}}>Parcel Details #{activeTrackingParcel.id || 'BYK-84920'}</Text>
              <Text style={{"fontSize":13,"color":"#334155","lineHeight":20,"marginBottom":4}}>• Pickup: {activeTrackingParcel.pickup}</Text>
              <Text style={{"fontSize":13,"color":"#334155","lineHeight":20,"marginBottom":4}}>• Drop: {activeTrackingParcel.drop}</Text>
              <Text style={{"fontSize":13,"color":"#334155","lineHeight":20,"marginBottom":4}}>• Sender: {activeTrackingParcel.senderName}</Text>
              <Text style={{"fontSize":13,"color":"#334155","lineHeight":20,"marginBottom":4}}>• Receiver: {activeTrackingParcel.receiverName}</Text>
              <Text style={{"fontSize":13,"color":"#334155","lineHeight":20,"marginBottom":4}}>• Total Fare: ₹{activeTrackingParcel.fare} (Cash / UPI on Delivery)</Text>
            </View>

            <TouchableOpacity
              style={{"backgroundColor":"#0F172A","paddingVertical":14,"borderRadius":14,"alignItems":"center"}}
              activeOpacity={0.85}
              onPress={() => {
                setActiveTrackingParcel(null);
                setCurrentScreen('HOME');
              }}
            >
              <Text style={{"fontSize":16,"fontWeight":"700","color":"#FFFFFF"}}>Back to Home</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {/* ================= MODAL 1: DROP TO FULL SCREEN SEARCH (Matching User Screenshot) ================= */}
      <Modal visible={showDropSearchModal} animationType="slide">
        <SafeAreaView style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

          {/* TOP HEADER: Back Arrow & "Drop to" Title */}
          <View style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":16,"paddingTop":12,"paddingBottom":16}}>
            <TouchableOpacity
              style={{"padding":4}}
              onPress={() => {
                setShowDropSearchModal(false);
                setSearchQuery('');
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={{"fontSize":22,"fontWeight":"800","color":"#0F172A","marginLeft":16}}>Drop to</Text>
          </View>

          {/* INPUT ROW: Red Bullseye Dot + Rounded Input Box */}
          <View style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":16,"marginBottom":16}}>
            <View style={{"width":28,"alignItems":"center","justifyContent":"center"}}>
              <Ionicons name="radio-button-on" size={18} color="#DC2626" />
            </View>
            <View style={{"flex":1,"borderWidth":1.5,"borderColor":"#94A3B8","borderRadius":14,"paddingHorizontal":16,"paddingVertical":10,"marginLeft":10,"backgroundColor":"#FFFFFF","flexDirection":"row","alignItems":"center"}}>
              <TextInput
                style={{"flex":1,"fontSize":16,"color":"#0F172A","padding":0}}
                placeholder=""
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                returnKeyType="search"
                onSubmitEditing={() => {
                  if (searchQuery.trim().length > 0) {
                    handleSelectDropAddress({
                      title: searchQuery.trim(),
                      address: `${searchQuery.trim()}, Delhi NCR`,
                    });
                  }
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* NOTE: "Select on map" option removed completely as requested */}

          {/* SUGGESTIONS & SEARCH RESULTS LIST */}
          <ScrollView
            style={{"flex":1,"paddingHorizontal":16}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* If user is typing: show matching search results */}
            {searchQuery.trim().length > 0 ? (
              <View>
                {/* Custom typed option if not exact match */}
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","paddingVertical":14}}
                  activeOpacity={0.7}
                  onPress={() =>
                    handleSelectDropAddress({
                      title: searchQuery.trim(),
                      address: `${searchQuery.trim()}, Delhi NCR`,
                    })
                  }
                >
                  <View style={{"width":32,"alignItems":"flex-start","justifyContent":"center"}}>
                    <Ionicons name="location-outline" size={22} color="#2563EB" />
                  </View>
                  <View style={{"flex":1,"marginRight":10}}>
                    <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginBottom":2}}>{searchQuery.trim()}</Text>
                    <Text style={{"fontSize":13,"color":"#64748B","lineHeight":18}}>Use this address in Delhi NCR</Text>
                  </View>
                </TouchableOpacity>
                <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0"}} />

                {/* Filtered Delhi NCR locations */}
                {filteredSearchPlaces.map((item, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      style={{"flexDirection":"row","alignItems":"center","paddingVertical":14}}
                      activeOpacity={0.7}
                      onPress={() => handleSelectDropAddress(item)}
                    >
                      <View style={{"width":32,"alignItems":"flex-start","justifyContent":"center"}}>
                        <Ionicons name="location-outline" size={22} color="#64748B" />
                      </View>
                      <View style={{"flex":1,"marginRight":10}}>
                        <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginBottom":2}}>{item.title}</Text>
                        <Text style={{"fontSize":13,"color":"#64748B","lineHeight":18}} numberOfLines={1}>
                          {item.address}
                        </Text>
                      </View>
                      <Ionicons name="heart-outline" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                    <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0"}} />
                  </View>
                ))}
              </View>
            ) : (
              /* If not typing: show previously used / recent locations (History) matching screenshot */
              <View>
                {recentDropLocations.map((item, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      style={{"flexDirection":"row","alignItems":"center","paddingVertical":14}}
                      activeOpacity={0.7}
                      onPress={() => handleSelectDropAddress(item)}
                    >
                      {/* Left: Clock / History Icon */}
                      <View style={{"width":32,"alignItems":"flex-start","justifyContent":"center"}}>
                        <Ionicons name="time-outline" size={22} color="#64748B" />
                      </View>

                      {/* Middle: Title & Subtitle */}
                      <View style={{"flex":1,"marginRight":10}}>
                        <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginBottom":2}}>{item.title}</Text>
                        <Text style={{"fontSize":13,"color":"#64748B","lineHeight":18}} numberOfLines={1}>
                          {item.address}
                        </Text>
                      </View>

                      {/* Right: Heart Icon */}
                      <Ionicons name="heart-outline" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                    <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0"}} />
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ================= MODAL: CONFIRM DROP DETAILS SLIDE (Matching User Screenshot) ================= */}
      <Modal
        visible={showDropContactModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDropContactModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{"flex":1,"backgroundColor":"rgba(15,23,42,0.5)","justifyContent":"flex-end"}}
        >
          <TouchableOpacity
            style={{"flex":1}}
            activeOpacity={1}
            onPress={() => setShowDropContactModal(false)}
          />
          <View style={{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":12,"paddingBottom":24,"maxHeight":"85%"}}>
            <View style={{"width":40,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":14}} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 16 }}
            >
              {/* House no. / Building (optional) */}
              <View style={{"flexDirection":"row","alignItems":"center","borderWidth":1.2,"borderColor":"#E2E8F0","borderRadius":14,"paddingHorizontal":14,"paddingVertical":12,"backgroundColor":"#FFFFFF","marginBottom":8}}>
                <Ionicons name="home-outline" size={20} color="#475569" style={{"marginRight":10}} />
                <TextInput
                  style={{"flex":1,"fontSize":15,"color":"#0F172A","padding":0}}
                  placeholder="House no./ Building (optional)"
                  placeholderTextColor="#94A3B8"
                  value={dropHouseBuilding}
                  onChangeText={setDropHouseBuilding}
                />
              </View>

              {/* Add contact details Header */}
              <Text style={{"fontSize":16,"fontWeight":"800","color":"#0F172A","marginTop":14,"marginBottom":10}}>Add contact details</Text>

              {/* Name* Input */}
              <View style={{"flexDirection":"row","alignItems":"center","borderWidth":1.2,"borderColor":"#E2E8F0","borderRadius":14,"paddingHorizontal":14,"paddingVertical":12,"backgroundColor":"#FFFFFF","marginBottom":8}}>
                <Ionicons name="person-outline" size={20} color="#475569" style={{"marginRight":10}} />
                <TextInput
                  style={{"flex":1,"fontSize":15,"color":"#0F172A","padding":0}}
                  placeholder="Name*"
                  placeholderTextColor="#94A3B8"
                  value={receiverName}
                  onChangeText={setReceiverName}
                />
                <Ionicons name="id-card-outline" size={22} color="#475569" />
              </View>

              {/* Use my contact checkbox */}
              <TouchableOpacity
                style={{"flexDirection":"row","alignItems":"center","marginVertical":10}}
                activeOpacity={0.7}
                onPress={() => {
                  const nextVal = !useMyContact;
                  setUseMyContact(nextVal);
                  if (nextVal) {
                    setReceiverName(senderName || 'Self');
                    setReceiverPhone(senderPhone || '9667617691');
                  }
                }}
              >
                <View style={[{"width":22,"height":22,"borderRadius":6,"borderWidth":1.5,"borderColor":"#94A3B8","justifyContent":"center","alignItems":"center","backgroundColor":"#FFFFFF"}, useMyContact && styles.checkboxSquareActive]}>
                  {useMyContact && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
                </View>
                <Text style={{"fontSize":14,"color":"#1E293B","marginLeft":10,"fontWeight":"500"}}>Use my contact for this booking</Text>
              </TouchableOpacity>

              {/* Phone Number* Input */}
              <View style={{"flexDirection":"row","alignItems":"center","borderWidth":1.2,"borderColor":"#E2E8F0","borderRadius":14,"paddingHorizontal":14,"paddingVertical":12,"backgroundColor":"#FFFFFF","marginBottom":8}}>
                <Ionicons name="call-outline" size={20} color="#475569" style={{"marginRight":10}} />
                <TextInput
                  style={{"flex":1,"fontSize":15,"color":"#0F172A","padding":0}}
                  placeholder="Phone Number*"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={receiverPhone}
                  onChangeText={setReceiverPhone}
                />
              </View>

              {/* Add to favourites Header */}
              <Text style={{"fontSize":16,"fontWeight":"800","color":"#0F172A","marginTop":14,"marginBottom":10}}>Add to favourites</Text>

              {/* Favourites Chips */}
              <View style={{"marginBottom":20}}>
                <View style={{"flexDirection":"row","alignItems":"center","gap":10,"flexWrap":"wrap"}}>
                  {[
                    { label: 'Work', icon: 'briefcase' },
                    { label: 'Gym', icon: 'barbell' },
                    { label: 'College', icon: 'school' },
                    { label: 'Hostel', icon: 'folder' },
                  ].map(({ label, icon }) => {
                    const isFav = selectedFavouriteTag === label;
                    return (
                      <TouchableOpacity
                        key={label}
                        style={[styles.favChip, isFav && styles.favChipActive]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedFavouriteTag(isFav ? null : label)}
                      >
                        <Ionicons name={icon} size={16} color={isFav ? '#2563EB' : '#475569'} />
                        <Text style={[{"fontSize":13,"fontWeight":"600","color":"#334155"}, isFav && styles.favChipTextActive]}>
                          {label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                  <TouchableOpacity
                    style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":14,"paddingVertical":9,"borderRadius":22,"borderWidth":1,"borderColor":"#E2E8F0","backgroundColor":"#FFFFFF","gap":6}}
                    activeOpacity={0.7}
                    onPress={() => Alert.alert('Add Favourite', 'Custom favourite label created.')}
                  >
                    <Ionicons name="add" size={18} color="#475569" />
                    <Text style={{"fontSize":13,"fontWeight":"600","color":"#334155"}}>Add New</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm drop details button */}
              <TouchableOpacity
                style={[
                  styles.confirmDropDetailsBtn,
                  (receiverName.trim().length > 0 || useMyContact) && styles.confirmDropDetailsBtnActive,
                ]}
                activeOpacity={0.85}
                onPress={handleConfirmDropDetails}
              >
                <Text
                  style={[
                    styles.confirmDropDetailsBtnText,
                    (receiverName.trim().length > 0 || useMyContact) && styles.confirmDropDetailsBtnTextActive,
                  ]}
                >
                  Confirm drop details
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ================= MODAL 2: EDIT PICKUP & SENDER ================= */}
      <Modal visible={showEditPickupModal} transparent animationType="slide">

        <View style={{"flex":1,"backgroundColor":"rgba(15,23,42,0.55)","justifyContent":"flex-end"}}>
          <View style={{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":12,"paddingBottom":32,"maxHeight":"85%"}}>
            <View style={{"width":40,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":14}} />
            <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":14}}>
              <Text style={{"fontSize":18,"fontWeight":"800","color":"#0F172A"}}>Edit Pickup Details</Text>
              <TouchableOpacity onPress={() => setShowEditPickupModal(false)} style={{"padding":4}}>
                <Ionicons name="close" size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={{"fontSize":13,"fontWeight":"700","color":"#334155","marginBottom":6}}>Pickup Address</Text>
            <TextInput
              style={{"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":12,"paddingHorizontal":14,"paddingVertical":10,"fontSize":14,"color":"#0F172A"}}
              value={pickupAddress}
              onChangeText={setPickupAddress}
              multiline
            />

            <TouchableOpacity
              style={{"backgroundColor":"#0F172A","paddingVertical":14,"borderRadius":14,"alignItems":"center","marginTop":18}}
              activeOpacity={0.85}
              onPress={() => setShowEditPickupModal(false)}
            >
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#FFFFFF"}}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL 3: PROHIBITED ITEMS ================= */}
      <Modal visible={showProhibitedModal} transparent animationType="fade">
        <View style={{"flex":1,"backgroundColor":"rgba(15,23,42,0.6)","justifyContent":"center","alignItems":"center","padding":24}}>
          <View style={{"backgroundColor":"#FFFFFF","borderRadius":20,"padding":20,"width":"100%"}}>
            <View style={{"flexDirection":"row","alignItems":"center","gap":8,"marginBottom":8}}>
              <Ionicons name="alert-circle" size={28} color="#DC2626" />
              <Text style={{"fontSize":18,"fontWeight":"800","color":"#0F172A"}}>Prohibited Items</Text>
            </View>
            <Text style={{"fontSize":13,"color":"#475569","lineHeight":18,"marginBottom":12}}>
              For safety and regulatory compliance, the following cannot be transported via Parcel:
            </Text>

            <View style={{"backgroundColor":"#FEF2F2","padding":12,"borderRadius":12,"marginBottom":16,"gap":8}}>
              <Text style={{"fontSize":12,"color":"#991B1B","lineHeight":18}}>❌ Currency, cash, coins, or precious bullion</Text>
              <Text style={{"fontSize":12,"color":"#991B1B","lineHeight":18}}>❌ Flammable liquids, explosives, or chemicals</Text>
              <Text style={{"fontSize":12,"color":"#991B1B","lineHeight":18}}>❌ Illegal drugs, contraband, or alcohol</Text>
              <Text style={{"fontSize":12,"color":"#991B1B","lineHeight":18}}>❌ Firearms, weapons, or sharp unsealed items</Text>
              <Text style={{"fontSize":12,"color":"#991B1B","lineHeight":18}}>❌ Live animals or perishable raw meat/fish</Text>
            </View>

            <TouchableOpacity
              style={{"backgroundColor":"#0F172A","paddingVertical":12,"borderRadius":12,"alignItems":"center"}}
              activeOpacity={0.85}
              onPress={() => setShowProhibitedModal(false)}
            >
              <Text style={{"fontSize":14,"fontWeight":"700","color":"#FFFFFF"}}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL 4: TERMS & CONDITIONS ================= */}
      <Modal visible={showTermsModal} transparent animationType="fade">
        <View style={{"flex":1,"backgroundColor":"rgba(15,23,42,0.6)","justifyContent":"center","alignItems":"center","padding":24}}>
          <View style={{"backgroundColor":"#FFFFFF","borderRadius":20,"padding":20,"width":"100%"}}>
            <Text style={{"fontSize":18,"fontWeight":"800","color":"#0F172A"}}>Terms & Conditions</Text>
            <Text style={[{"fontSize":13,"color":"#475569","lineHeight":18,"marginBottom":12}, { marginTop: 8 }]}>
              • Package weight must not exceed the declared limit.
              {'\n'}• Sender is solely responsible for package contents and legal packaging.
              {'\n'}• 4-digit PIN is required by the delivery partner at the drop spot.
              {'\n'}• Maximum package liability covered up to ₹2,000.
            </Text>

            <TouchableOpacity
              style={{"backgroundColor":"#0F172A","paddingVertical":12,"borderRadius":12,"alignItems":"center"}}
              activeOpacity={0.85}
              onPress={() => setShowTermsModal(false)}
            >
              <Text style={{"fontSize":14,"fontWeight":"700","color":"#FFFFFF"}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropTextInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    paddingVertical: 2,
  },
  checkboxSquareActive: {
    borderColor: '#0F172A',
    backgroundColor: '#0F172A',
  },
  favChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  favChipActive: {
    borderColor: '#0F172A',
    backgroundColor: '#F1F5F9',
  },
  favChipTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  confirmDropDetailsBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 26,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  confirmDropDetailsBtnActive: {
    backgroundColor: '#0F172A',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  confirmDropDetailsBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94A3B8',
  },
  confirmDropDetailsBtnTextActive: {
    color: '#FFFFFF',
  },
});

