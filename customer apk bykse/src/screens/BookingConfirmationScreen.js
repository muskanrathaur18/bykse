
﻿import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Modal,
  TextInput,
  ScrollView,
  Linking,
  StatusBar,
  Image,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { Button } from '../components/common/Button';

export const BookingConfirmationScreen = () => {
  const {
    setCurrentScreen,
    pickup,
    destination,
    activeBooking,
    updateBookingState,
    cancelActiveBooking,
    selectedRideCategory,
  } = useApp();
  const insets = useSafeAreaInsets();

  // Resolved Pickup & Drop from active booking or context
  const activePickup = activeBooking?.pickup || activeBooking?.rideDetails?.pickup || pickup;
  const activeDrop = activeBooking?.destination || activeBooking?.rideDetails?.destination || destination;

  const formatPillName = (text, fallback) => {
    if (!text) return fallback;
    if (text.length > 18) {
      return text.substring(0, 16) + '...';
    }
    return text;
  };

  // Internal sub-steps:
  // 'SEARCHING' -> 'ACCEPTED' -> 'ARRIVING'
  const [currentStep, setCurrentStep] = useState(
    activeBooking?.status === 'ACCEPTED'
      ? 'ACCEPTED'
      : activeBooking?.status === 'ARRIVING'
      ? 'ARRIVING'
      : 'SEARCHING'
  );

  // Search countdown & rejected captains counter (Fast 4s to show found screen)
  const [declinedCount, setDeclinedCount] = useState(0);
  const [searchTimer, setSearchTimer] = useState(4);
  const [searchProgress, setSearchProgress] = useState(0.2);

  // Selected extra tip
  const [selectedTip, setSelectedTip] = useState(0);
  const [showTripDetailsModal, setShowTripDetailsModal] = useState(false);
  const [connectingTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 4);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  });

  // ETA countdown once captain is accepted
  const [etaMins, setEtaMins] = useState(6);
  const [captainArrived, setCaptainArrived] = useState(false);

  // Safety Banner & Toolkit
  const [showSafetyBanner, setShowSafetyBanner] = useState(true);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  // Alternate Flow Modals
  const [showNoCaptainModal, setShowNoCaptainModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'captain', text: 'Namaste! I am on my way to your pickup point.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isGpsStale, setIsGpsStale] = useState(false);

  // Radar Animation for Search Step
  const radarAnim1 = useRef(new Animated.Value(0)).current;
  const radarAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(radarAnim1, {
        toValue: 1,
        duration: 2400,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => {
      Animated.loop(
        Animated.timing(radarAnim2, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        })
      ).start();
    }, 1200);
  }, []);

  // Searching Countdown & Progress Simulation
  useEffect(() => {
    if (currentStep !== 'SEARCHING') return;

    if (searchTimer <= 0) {
      handleCaptainFound();
      return;
    }

    const timer = setInterval(() => {
      setSearchTimer((prev) => prev - 1);
      setSearchProgress((prev) => Math.min(0.95, prev + 0.038));
      setDeclinedCount((prev) => (Math.random() > 0.4 && prev < 12 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, searchTimer]);

  // ETA countdown once captain is accepted
  useEffect(() => {
    let etaInterval = null;
    if (currentStep === 'ACCEPTED' || currentStep === 'ARRIVING') {
      etaInterval = setInterval(() => {
        setEtaMins((prev) => {
          if (prev <= 1) {
            setCaptainArrived(true);
            clearInterval(etaInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 7000);
    }
    return () => clearInterval(etaInterval);
  }, [currentStep]);

  // Base fare from active booking or default 163
  const baseFare = activeBooking?.rideDetails?.finalFare || activeBooking?.finalFare || 163;
  const totalFareWithTip = baseFare + selectedTip;

  const cleanVehicleName = (rawName) => {
    if (!rawName) {
      return selectedRideCategory === 'bike'
        ? 'TVS Radeon'
        : selectedRideCategory === 'auto'
        ? 'Bajaj RE Auto'
        : 'Maruti Dzire';
    }
    const cleaned = rawName
      .replace(/\(Yellow\/Black\)|\(Black\/Yellow\)/gi, '')
      .replace(/\b(Black|Yellow|Green|White|Red|Blue|Grey|Silver)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    return cleaned || 'TVS Radeon';
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';

  const formatPlateNumber = (rawPlate) => {
    if (!rawPlate) return 'DL01AB3492';
    return String(rawPlate).replace(/\s+/g, '').toUpperCase();
  };

  const rawCaptain = activeBooking?.captain;
  const captainDetails = {
    name: rawCaptain?.name || 'ARUN',
    rating: rawCaptain?.rating || 4.85,
    tripsCount: rawCaptain?.tripsCount || 1420,
    phone: rawCaptain?.phone || '+91 98765 43210',
    vehicleName: cleanVehicleName(
      rawCaptain?.vehicleName ||
        (selectedRideCategory === 'bike'
          ? 'TVS Radeon'
          : selectedRideCategory === 'auto'
          ? 'Bajaj RE Auto'
          : 'Maruti Dzire')
    ),
    plateNumber: formatPlateNumber(rawCaptain?.plateNumber || 'DL01AB3492'),
    otp: rawCaptain?.otp || '3471',
    avatar: (rawCaptain?.avatar && typeof rawCaptain.avatar === 'string' && rawCaptain.avatar.trim() !== '')
      ? rawCaptain.avatar
      : defaultAvatar,
  };

  const ridePin = String(activeBooking?.startOtp || rawCaptain?.otp || captainDetails?.otp || '3471')
    .padStart(4, '0')
    .slice(0, 4);
  const pinDigits = ridePin.split('');

  const handleCaptainFound = () => {
    setCurrentStep('ACCEPTED');
    updateBookingState({
      status: 'ACCEPTED',
      captain: captainDetails,
    });
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'captain', text: 'Got it, waiting at Gate 2!' },
      ]);
    }, 1200);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    setShowTripDetailsModal(false);
    cancelActiveBooking(cancelReason || 'Requested by customer');
  };

  // Toggle Tip selection
  const handleToggleTip = (amount) => {
    if (selectedTip === amount) {
      setSelectedTip(0);
    } else {
      setSelectedTip(amount);
    }
  };

  // Cancel reasons list matching Image 2
  const cancelReasonsList = [
    { id: 'accident', title: 'Requested by accident', icon: 'alert-circle-outline' },
    { id: 'wrong_vehicle', title: 'Requested wrong vehicle', icon: 'car-sport-outline' },
    { id: 'wrong_pickup', title: 'Selected wrong pickup', icon: 'location-outline' },
    { id: 'wrong_dropoff', title: 'Selected wrong dropoff', icon: 'navigate-outline' },
    { id: 'wait_long', title: 'Wait time was too long', icon: 'hourglass-outline' },
    { id: 'other', title: 'Other', icon: 'ellipsis-horizontal-circle-outline' },
  ];

  return (
    <SafeAreaView style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
      <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* ================= STEP 2: SEARCHING SCREEN ================= */}
        {currentStep === 'SEARCHING' ? (
          <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
            {/* TOP MAP WITH CHOSEN PICKUP & DROP PINS + SEARCH RADAR PULSE */}
            <View style={{"flex":0.42,"position":"relative","backgroundColor":"#E2E8F0","overflow":"hidden"}}>
              <InteractiveMap
                pickupName={formatPillName(activePickup?.shortName || activePickup?.landmark || activePickup?.address, 'Pickup')}
                dropName={formatPillName(activeDrop?.shortName || activeDrop?.landmark || activeDrop?.address, 'Drop')}
                onBackPress={() => setShowCancelModal(true)}
                style={{ width: '100%', height: '100%' }}
              >
                {/* PULSING RADAR RINGS OVER PICKUP LOCATION */}
                <View style={{"position":"absolute","top":55,"left":"24%","alignItems":"center","justifyContent":"center","zIndex":7}} pointerEvents="none">
                  <Animated.View
                    style={[
                      styles.radarPulseCircle,
                      {
                        transform: [
                          {
                            scale: radarAnim1.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.6, 2.6],
                            }),
                          },
                        ],
                        opacity: radarAnim1.interpolate({
                          inputRange: [0, 0.7, 1],
                          outputRange: [0.55, 0.25, 0],
                        }),
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.radarPulseCircle,
                      {
                        transform: [
                          {
                            scale: radarAnim2.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.6, 2.6],
                            }),
                          },
                        ],
                        opacity: radarAnim2.interpolate({
                          inputRange: [0, 0.7, 1],
                          outputRange: [0.55, 0.25, 0],
                        }),
                      },
                    ]}
                  />
                </View>
              </InteractiveMap>
            </View>

            {/* BOTTOM SHEET / CARD (Matching User Screenshot) */}
            <View style={[{"flex":0.58,"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":18,"paddingTop":12}, { paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20 }]}>
              {/* Drag Handle */}
              <View style={{"width":44,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":16}} />

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Heading & Subtitle Matching Screenshot */}
                <Text style={{"fontSize":22,"fontWeight":"800","color":"#0F172A","textAlign":"center","marginTop":2}}>Locating your driver</Text>
                <Text style={{"fontSize":14.5,"fontWeight":"500","color":"#64748B","textAlign":"center","marginTop":4,"marginBottom":16}}>Connecting you with a driver by {connectingTime}</Text>

                {/* Blue Progress Bar */}
                <View style={{"height":4,"backgroundColor":"#E2E8F0","borderRadius":2,"overflow":"hidden","marginBottom":16}}>
                  <View style={{"height":"100%","backgroundColor":"#0F172A","borderRadius":2}} style={{ width: `${searchProgress * 100}%` }} />
                </View>

                {/* CARD: BIKE SAVER DETAILS WITH 3-DOT BUTTON (Matching User Screenshot) */}
                <View style={{"backgroundColor":"#F8FAFC","borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","padding":16,"marginBottom":14}}>
                  <View style={{"flexDirection":"row","justifyContent":"space-between","alignItems":"center","marginBottom":8}}>
                    <Text style={{"fontSize":13,"fontWeight":"600","color":"#64748B"}}>
                      {activeBooking?.rideDetails?.variant?.name
                        ? `${activeBooking.rideDetails.variant.name} details`
                        : selectedRideCategory === 'cab'
                        ? 'Cab Economy details'
                        : selectedRideCategory === 'auto'
                        ? 'Auto Saver details'
                        : 'Bike Saver details'}
                    </Text>

                    {/* 3-DOT (•••) BUTTON */}
                    <TouchableOpacity
                      style={{"width":42,"height":42,"borderRadius":21,"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","justifyContent":"center","alignItems":"center"}}
                      activeOpacity={0.75}
                      onPress={() => setShowTripDetailsModal(true)}
                    >
                      <Ionicons name="ellipsis-horizontal" size={20} color="#0F172A" />
                    </TouchableOpacity>
                  </View>

                  <Text style={{"fontSize":17,"fontWeight":"800","color":"#0F172A","lineHeight":23,"marginBottom":12}}>
                    Meet at your pickup spot on {activePickup?.shortName || activePickup?.landmark || activePickup?.address || 'your pickup spot'}
                  </Text>

                  <View style={{"flexDirection":"row","alignItems":"center","alignSelf":"flex-start","backgroundColor":"#DCFCE7","paddingHorizontal":10,"paddingVertical":5,"borderRadius":8,"gap":5}}>
                    <Ionicons name="cash" size={14} color="#15803D" />
                    <Text style={{"fontSize":12.5,"fontWeight":"700","color":"#15803D"}}>Cash</Text>
                  </View>
                </View>

                {/* CARD 2: INCREASE YOUR CHANCES BY ADDING EXTRA (TIP OPTIONS) */}
                <View style={{"backgroundColor":"#F8FAFC","borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","paddingHorizontal":14,"paddingVertical":14,"marginBottom":16}}>
                  <View style={{"flexDirection":"row","alignItems":"center","marginBottom":12}}>
                    <Text style={{"fontSize":16,"marginRight":8}}>⚡</Text>
                    <Text style={{"fontSize":13.5,"fontWeight":"700","color":"#0F172A","flex":1}}>
                      Increase your chances by adding extra
                    </Text>
                  </View>

                  {/* Tip Pills: + ₹10, + ₹20, + ₹30, + ₹40 */}
                  <View style={{"flexDirection":"row","justifyContent":"space-between","gap":8}}>
                    {[10, 20, 30, 40].map((amount) => {
                      const isSelected = selectedTip === amount;
                      return (
                        <TouchableOpacity
                          key={amount}
                          style={[
                            styles.tipPillBtn,
                            isSelected && styles.tipPillBtnSelected,
                          ]}
                          activeOpacity={0.8}
                          onPress={() => handleToggleTip(amount)}
                        >
                          <Text
                            style={[
                              styles.tipPillText,
                              isSelected && styles.tipPillTextSelected,
                            ]}
                          >
                            + ₹{amount}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>



                {/* Dev Quick Test Shortcut */}
                <TouchableOpacity
                  style={{ alignSelf: 'center', marginTop: 14, padding: 4 }}
                  onPress={handleCaptainFound}
                >
                  <Text style={{ fontSize: 11, color: '#94A3B8' }}>Tap to simulate captain accept</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        ) : (
          /* ================= STEP 3 & 4: CAPTAIN ACCEPTED / ARRIVING (MATCHING SCREENSHOT) ================= */
          <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
            {/* TOP MAP WITH ROUTE, CAPTAIN APPROACHING, DOWNWARD ARROW & SAFETY BADGE */}
            <View style={{"flex":0.38,"position":"relative","backgroundColor":"#E2E8F0","overflow":"hidden"}}>
              <InteractiveMap
                pickupName={formatPillName(activePickup?.shortName || activePickup?.landmark || activePickup?.address, 'Pickup')}
                dropName={formatPillName(activeDrop?.shortName || activeDrop?.landmark || activeDrop?.address, 'Drop')}
                showDestination={true}
                showRoute={true}
                captainApproaching={true}
                captainType={selectedRideCategory}
                style={{ width: '100%', height: '100%' }}
              >
                {/* Top overlay controls matching screenshot: Circle Down Chevron & Safety Pill */}
                <View style={[{"position":"absolute","left":16,"right":16,"flexDirection":"row","justifyContent":"space-between","alignItems":"center","zIndex":10}, { top: insets.top > 0 ? insets.top + 8 : 14 }]}>
                  <TouchableOpacity
                    style={{"width":44,"height":44,"borderRadius":22,"backgroundColor":"rgba(15,23,42,0.75)","justifyContent":"center","alignItems":"center"}}
                    activeOpacity={0.8}
                    onPress={() => setCurrentScreen('HOME')}
                  >
                    <Ionicons name="chevron-down" size={24} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#FFFFFF","paddingHorizontal":14,"paddingVertical":9,"borderRadius":20,"gap":6}}
                    activeOpacity={0.8}
                    onPress={() => setShowSafetyModal(true)}
                  >
                    <Ionicons name="shield-checkmark" size={17} color="#2563EB" />
                    <Text style={{"fontSize":14,"fontWeight":"700","color":"#0F172A"}}>Safety</Text>
                  </TouchableOpacity>
                </View>
              </InteractiveMap>
            </View>

            {/* BOTTOM SHEET MATCHING SCREENSHOT */}
            <View style={[{"flex":0.62,"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":18,"paddingTop":12}, { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 16 }]}>
              {/* Drag Handle */}
              <View style={{"width":44,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":16}} />

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                {/* Heading: "Pickup in 6 min" */}
                <Text style={{"fontSize":22,"fontWeight":"900","color":"#0F172A","textAlign":"center","marginTop":2,"marginBottom":16}}>
                  {captainArrived ? 'Driver Has Arrived!' : `Pickup in ${etaMins || 6} min`}
                </Text>

                {/* PIN FOR THIS RIDE BANNER (Matching User Screenshot) */}
                <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","backgroundColor":"#162C4E","borderRadius":12,"paddingHorizontal":16,"paddingVertical":12,"marginBottom":14}}>
                  <Text style={{"fontSize":15,"fontWeight":"700","color":"#FFFFFF"}}>PIN for this ride</Text>
                  <View style={{"flexDirection":"row","alignItems":"center","gap":6}}>
                    {pinDigits.map((digit, idx) => (
                      <View key={idx} style={{"width":28,"height":30,"backgroundColor":"#3878BC","borderRadius":6,"justifyContent":"center","alignItems":"center"}}>
                        <Text style={{"fontSize":15,"fontWeight":"800","color":"#FFFFFF"}}>{digit}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* CARD 1: ROUTE & PICKUP DETAILS CARD WITH 3-DOT BUTTON */}
                <View style={{"backgroundColor":"#F8FAFC","borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","padding":16,"marginBottom":14}}>
                  <View style={{"flexDirection":"row","justifyContent":"space-between","alignItems":"center","marginBottom":8}}>
                    <Text style={{"fontSize":13,"fontWeight":"600","color":"#64748B"}}>
                      {activeBooking?.rideDetails?.variant?.name
                        ? `${activeBooking.rideDetails.variant.name} details`
                        : selectedRideCategory === 'cab'
                        ? 'Cab Economy details'
                        : selectedRideCategory === 'auto'
                        ? 'Auto Saver details'
                        : 'Bike Saver details'}
                    </Text>

                    {/* 3-DOT (•••) BUTTON - Rounded rect matching screenshot */}
                    <TouchableOpacity
                      style={{"width":48,"height":36,"borderRadius":10,"backgroundColor":"#F1F5F9","borderWidth":1,"borderColor":"#E2E8F0","justifyContent":"center","alignItems":"center"}}
                      activeOpacity={0.75}
                      onPress={() => setShowTripDetailsModal(true)}
                    >
                      <Ionicons name="ellipsis-horizontal" size={20} color="#0F172A" />
                    </TouchableOpacity>
                  </View>

                  <Text style={{"fontSize":17,"fontWeight":"800","color":"#0F172A","lineHeight":23,"marginBottom":12}}>
                    Meet at your pickup spot on {activePickup?.shortName || activePickup?.landmark || activePickup?.address || 'your pickup spot'}
                  </Text>

                  <View style={{"flexDirection":"row","alignItems":"center","alignSelf":"flex-start","backgroundColor":"#DCFCE7","paddingHorizontal":10,"paddingVertical":5,"borderRadius":8,"gap":5}}>
                    <Ionicons name="cash" size={14} color="#15803D" />
                    <Text style={{"fontSize":12.5,"fontWeight":"700","color":"#15803D"}}>Cash</Text>
                  </View>
                </View>

                {/* CARD 2: DRIVER & VEHICLE DETAILS CARD */}
                <View style={{"backgroundColor":"#F8FAFC","borderRadius":18,"borderWidth":1,"borderColor":"#E2E8F0","padding":16,"marginBottom":14}}>
                  <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
                    {/* Left: Driver Avatar, Rating Pill & Name */}
                    <View style={{"alignItems":"center","width":68}}>
                      <View style={{"position":"relative","alignItems":"center","justifyContent":"center","width":60,"height":60,"marginBottom":4}}>
                        <View style={{"width":56,"height":56,"borderRadius":28,"overflow":"hidden","backgroundColor":"#E2E8F0","borderWidth":2,"borderColor":"#FFFFFF"}}>
                          <Image
                            source={{ uri: captainDetails.avatar }}
                            style={{"width":56,"height":56,"borderRadius":28}}
                            resizeMode="cover"
                          />
                        </View>
                        <View style={{"position":"absolute","bottom":-5,"flexDirection":"row","alignItems":"center","backgroundColor":"#0F172A","paddingHorizontal":6,"paddingVertical":1.5,"borderRadius":10,"gap":2.5,"borderWidth":1,"borderColor":"#334155"}}>
                          <Ionicons name="star" size={10} color="#F59E0B" />
                          <Text style={{"fontSize":10,"fontWeight":"800","color":"#FFFFFF"}}>{captainDetails.rating}</Text>
                        </View>
                      </View>
                      <Text style={{"fontSize":14,"fontWeight":"800","color":"#0F172A","marginTop":2,"textAlign":"center"}}>{captainDetails.name}</Text>
                    </View>


                    {/* Right: Plate Number & Vehicle Model */}
                    <View style={{"alignItems":"flex-end","justifyContent":"center"}}>
                      <Text style={{"fontSize":19,"fontWeight":"900","color":"#0F172A","lineHeight":22}}>{captainDetails.plateNumber}</Text>
                      <Text style={{"fontSize":13,"fontWeight":"600","color":"#64748B","marginTop":1,"lineHeight":16}}>{captainDetails.vehicleName}</Text>
                    </View>
                  </View>

                  {/* Lower Row: Action Buttons (Message, Call, •••) */}
                  <View style={{"flexDirection":"row","alignItems":"center","gap":10}}>
                    {/* Message Button */}
                    <TouchableOpacity
                      style={{"flex":1,"height":48,"borderRadius":12,"backgroundColor":"#0F172A","flexDirection":"row","justifyContent":"center","alignItems":"center","gap":8}}
                      activeOpacity={0.8}
                      onPress={() => setShowChatModal(true)}
                    >
                      <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
                      <Text style={{"fontSize":15,"fontWeight":"700","color":"#FFFFFF"}}>Message</Text>
                    </TouchableOpacity>

                    {/* Call Button */}
                    <TouchableOpacity
                      style={{"width":48,"height":48,"borderRadius":12,"backgroundColor":"#F1F5F9","borderWidth":1,"borderColor":"#E2E8F0","justifyContent":"center","alignItems":"center"}}
                      activeOpacity={0.8}
                      onPress={() => Linking.openURL(`tel:${captainDetails.phone}`)}
                    >
                      <Ionicons name="call" size={18} color="#0F172A" />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {/* ================= MODAL 1: RIDE DETAILS MODAL (MATCHING USER IMAGE 1) ================= */}
        <Modal visible={showTripDetailsModal} transparent animationType="slide">
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.55)","justifyContent":"flex-end"}}>
            <View style={[{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":12,"maxHeight":"90%"}, { paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20 }]}>
              {/* Sheet Drag Handle */}
              <View style={{"width":44,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":18}} />

              <Text style={{"fontSize":22,"fontWeight":"800","color":"#0F172A","marginBottom":20,"textAlign":"center"}}>Ride details</Text>

              {/* ROUTE CONNECTED BLOCK */}
              <View style={{"flexDirection":"row","backgroundColor":"#F8FAFC","borderRadius":18,"padding":16,"borderWidth":1,"borderColor":"#E2E8F0","marginBottom":16}}>
                <View style={{"width":24,"alignItems":"center","paddingTop":4}}>
                  {/* Circle dot icon for pickup */}
                  <View style={{"width":16,"height":16,"borderRadius":8,"borderWidth":2,"borderColor":"#0F172A","backgroundColor":"#FFFFFF","justifyContent":"center","alignItems":"center"}}>
                    <View style={{"width":6,"height":6,"borderRadius":3,"backgroundColor":"#0F172A"}} />
                  </View>
                  <View style={{"width":2,"height":42,"backgroundColor":"#94A3B8","marginVertical":4}} />
                  {/* Square icon for drop */}
                  <View style={{"width":16,"height":16,"borderWidth":2,"borderColor":"#0F172A","backgroundColor":"#FFFFFF","justifyContent":"center","alignItems":"center"}}>
                    <View style={{"width":6,"height":6,"backgroundColor":"#0F172A"}} />
                  </View>
                </View>

                <View style={{"flex":1,"marginLeft":12}}>
                  {/* Pickup Section */}
                  <View style={styles.routeItemBlock}>
                    <Text style={{"fontSize":11.5,"fontWeight":"700","color":"#64748B","marginBottom":2}}>Meet at your pickup spot</Text>
                    <Text style={{"fontSize":14.5,"fontWeight":"700","color":"#0F172A","lineHeight":20}} numberOfLines={2}>
                      {activePickup?.address || activePickup?.shortName}
                    </Text>
                  </View>

                  {/* Drop Section */}
                  <View style={[styles.routeItemBlock, { marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={{"fontSize":11.5,"fontWeight":"700","color":"#64748B","marginBottom":2}}>Destination</Text>
                      <Text style={{"fontSize":14.5,"fontWeight":"700","color":"#0F172A","lineHeight":20}} numberOfLines={1}>
                        {activeDrop?.shortName || activeDrop?.landmark || activeDrop?.address}
                      </Text>
                    </View>

                    {/* Edit Destination Icon */}
                    <View style={{"flexDirection":"row","gap":8}}>
                      <TouchableOpacity
                        style={{"width":32,"height":32,"borderRadius":16,"backgroundColor":"#FFFFFF","borderWidth":1,"borderColor":"#CBD5E1","justifyContent":"center","alignItems":"center"}}
                        onPress={() => {
                          setShowTripDetailsModal(false);
                          setCurrentScreen('LOCATION_SEARCH');
                        }}
                      >
                        <Ionicons name="pencil" size={14} color="#0F172A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* FARE & PAYMENT ROW (from Image 1) */}
              <View style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#FFFFFF","borderRadius":16,"padding":14,"borderWidth":1,"borderColor":"#E2E8F0","marginBottom":20}}>
                <View style={{"width":40,"height":40,"borderRadius":20,"backgroundColor":"#F1F5F9","justifyContent":"center","alignItems":"center"}}>
                  <Ionicons name="person" size={18} color="#0F172A" />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>₹{totalFareWithTip.toFixed(2)}</Text>
                  <Text style={{"fontSize":12,"color":"#64748B","marginTop":2}}>Bykse Cash: ₹0.00 + Cash</Text>
                </View>

                <TouchableOpacity style={{"paddingHorizontal":14,"paddingVertical":7,"borderRadius":16,"backgroundColor":"#F1F5F9"}} activeOpacity={0.8}>
                  <Text style={{"fontSize":13,"fontWeight":"700","color":"#0F172A"}}>Switch</Text>
                </TouchableOpacity>
              </View>

              {/* CANCEL RIDE BUTTON (Red tinted text on clean button) */}
              <TouchableOpacity
                style={{"height":52,"borderRadius":26,"backgroundColor":"#FEF2F2","borderWidth":1,"borderColor":"#FEE2E2","justifyContent":"center","alignItems":"center","marginBottom":10}}
                activeOpacity={0.8}
                onPress={() => {
                  setShowTripDetailsModal(false);
                  setTimeout(() => setShowCancelModal(true), 250);
                }}
              >
                <Text style={{"fontSize":16,"fontWeight":"700","color":"#DC2626"}}>Cancel ride</Text>
              </TouchableOpacity>

              {/* CLOSE BUTTON */}
              <TouchableOpacity
                style={{"height":52,"borderRadius":26,"backgroundColor":"#F1F5F9","justifyContent":"center","alignItems":"center"}}
                activeOpacity={0.85}
                onPress={() => setShowTripDetailsModal(false)}
              >
                <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A"}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ================= MODAL 2: CANCEL RIDE WITH REASONS (MATCHING USER IMAGE 2) ================= */}
        <Modal visible={showCancelModal} transparent animationType="slide">
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.55)","justifyContent":"flex-end"}}>
            <View style={[{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":16,"maxHeight":"92%"}, { paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20 }]}>
              {/* Header: Back Arrow, 'Cancel ride?', 'Skip' */}
              <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingBottom":14,"borderBottomWidth":1}}>
                <TouchableOpacity
                  style={{"padding":4}}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={{"fontSize":18,"fontWeight":"800","color":"#0F172A"}}>Cancel ride?</Text>
                <TouchableOpacity
                  style={{"padding":6}}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Text style={{"fontSize":14,"fontWeight":"700","color":"#64748B"}}>Skip</Text>
                </TouchableOpacity>
              </View>

              <Text style={{"fontSize":20,"fontWeight":"800","color":"#0F172A","marginTop":18,"marginBottom":14}}>Why do you want to cancel?</Text>

              {/* REASONS LIST */}
              <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
                {cancelReasonsList.map((item) => {
                  const isSelected = cancelReason === item.title;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.cancelReasonItemRow,
                        isSelected && styles.cancelReasonItemRowSelected,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => setCancelReason(item.title)}
                    >
                      <View style={{"width":32,"alignItems":"center","marginRight":14}}>
                        <Ionicons name={item.icon} size={22} color={isSelected ? '#DC2626' : '#0F172A'} />
                      </View>
                      <Text
                        style={[
                          styles.cancelReasonItemText,
                          isSelected && styles.cancelReasonItemTextSelected,
                        ]}
                      >
                        {item.title}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={20} color="#DC2626" style={{ marginLeft: 'auto' }} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* BOTTOM ACTION BUTTON: "Keep my ride" or "Cancel ride" if reason selected */}
              {cancelReason ? (
                <TouchableOpacity
                  style={{"height":52,"borderRadius":26,"backgroundColor":"#DC2626","justifyContent":"center","alignItems":"center","marginTop":18}}
                  activeOpacity={0.85}
                  onPress={handleConfirmCancel}
                >
                  <Text style={{"fontSize":16,"fontWeight":"800","color":"#FFFFFF"}}>Cancel ride</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{"height":52,"borderRadius":26,"backgroundColor":"#E2E8F0","justifyContent":"center","alignItems":"center","marginTop":18}}
                  activeOpacity={0.85}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A"}}>Keep my ride</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>

        {/* ================= SAFETY TOOLKIT MODAL ================= */}
        <Modal visible={showSafetyModal} transparent animationType="slide">
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.55)","justifyContent":"flex-end"}}>
            <View style={[{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":12,"maxHeight":"90%"}, { paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20 }]}>
              <View style={{"width":44,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":18}} />
              <View style={styles.modalTopRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Ionicons name="shield-checkmark" size={24} color="#2563EB" />
                  <Text style={styles.cancelHeading}>Safety Toolkit</Text>
                </View>
                <TouchableOpacity onPress={() => setShowSafetyModal(false)}>
                  <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 14, gap: 12 }}>
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#F8FAFC","borderRadius":14,"borderWidth":1,"borderColor":"#E2E8F0","padding":14}}
                  onPress={() => Linking.openURL('tel:112')}
                >
                  <Ionicons name="call" size={20} color="#DC2626" />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Emergency Assistance (112)</Text>
                    <Text style={{"fontSize":12.5,"color":"#64748B","marginTop":2}}>Direct line to police and medical emergency</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#F8FAFC","borderRadius":14,"borderWidth":1,"borderColor":"#E2E8F0","padding":14}}
                  onPress={() => setShowSafetyModal(false)}
                >
                  <Ionicons name="share-social" size={20} color="#2563EB" />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Share Trip Details</Text>
                    <Text style={{"fontSize":12.5,"color":"#64748B","marginTop":2}}>Share live ride tracking with trusted contacts</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#F8FAFC","borderRadius":14,"borderWidth":1,"borderColor":"#E2E8F0","padding":14}}
                  onPress={() => setShowSafetyModal(false)}
                >
                  <Ionicons name="videocam" size={20} color="#10B981" />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Driver Recording Protection</Text>
                    <Text style={{"fontSize":12.5,"color":"#64748B","marginTop":2}}>Recording is enabled for mutual safety</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Button
                title="Done"
                onPress={() => setShowSafetyModal(false)}
                style={{ width: '100%', marginTop: 20 }}
              />
            </View>
          </View>
        </Modal>

        {/* ================= IN-APP CHAT MODAL ================= */}
        <Modal visible={showChatModal} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":16,"paddingVertical":12,"borderBottomWidth":1}}>
              <TouchableOpacity onPress={() => setShowChatModal(false)} style={{ padding: 4 }}>
                <Ionicons name="arrow-back" size={24} color="#0F172A" />
              </TouchableOpacity>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{"fontSize":15,"fontWeight":"800","color":"#0F172A"}}>{captainDetails.name}</Text>
                <Text style={{"fontSize":12,"color":"#64748B"}}>Captain • {captainDetails.vehicleName}</Text>
              </View>
            </View>

            <ScrollView style={{"flex":1,"backgroundColor":"#F8FAFC"}} contentContainerStyle={{ padding: SPACING.md }}>
              {chatMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.chatBubble,
                    msg.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleCaptain,
                  ]}
                >
                  <Text
                    style={[
                      styles.chatBubbleText,
                      msg.sender === 'user' ? { color: '#FFFFFF' } : { color: '#0F172A' },
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={{"flexDirection":"row","alignItems":"center","padding":12,"backgroundColor":"#FFFFFF","borderTopWidth":1,"gap":8}}>
              <TextInput
                style={{"flex":1,"borderWidth":1,"borderColor":"#E2E8F0","borderRadius":9999,"paddingHorizontal":16,"paddingVertical":8,"fontSize":14}}
                placeholder="Message your Captain..."
                placeholderTextColor="#94A3B8"
                value={chatInput}
                onChangeText={setChatInput}
                onSubmitEditing={handleSendMessage}
              />
              <TouchableOpacity style={{"width":40,"height":40,"borderRadius":20,"backgroundColor":"#0F172A","justifyContent":"center","alignItems":"center"}} onPress={handleSendMessage}>
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  radarPulseCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(59, 130, 246, 0.28)',
    borderWidth: 1.5,
    borderColor: '#3B82F6',
  },
  tipPillBtn: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipPillBtnSelected: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  tipPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tipPillTextSelected: {
    color: '#FBBF24',
    fontWeight: '800',
  },
  routeItemBlock: {},
  cancelReasonItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  cancelReasonItemRowSelected: {
    borderColor: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  cancelReasonItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  cancelReasonItemTextSelected: {
    color: '#0F172A',
    fontWeight: '800',
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  chatBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    marginBottom: 8,
  },
  chatBubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E293B',
  },
  chatBubbleCaptain: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chatBubbleText: {
    fontSize: 13,
    lineHeight: 18,
  },
});

