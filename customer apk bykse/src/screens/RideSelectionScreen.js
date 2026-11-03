
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from '../components/map/InteractiveMap';

export const RideSelectionScreen = () => {
  const {
    setCurrentScreen,
    pickup,
    destination,
    setDestination,
    routeInfo,
    initiateBooking,
    paymentMethod,
    setPaymentMethod,
    draftBooking,
    setDraftBooking,
    activeServiceSource,
    parcelDestination,
    weddingDestination,
  } = useApp();
  const insets = useSafeAreaInsets();

  const activeDrop =
    activeServiceSource === 'PARCEL'
      ? (parcelDestination || draftBooking?.destination)
      : activeServiceSource === 'WEDDING'
      ? (weddingDestination || draftBooking?.destination)
      : (destination || draftBooking?.destination);

  const handleBackPress = () => {
    if (activeServiceSource === 'PARCEL') {
      setCurrentScreen('PARCEL_DELIVERY');
    } else if (activeServiceSource === 'WEDDING') {
      setCurrentScreen('WEDDING_RIDES');
    } else {
      setDestination(null);
      setCurrentScreen('LOCATION_SEARCH');
    }
  };

  const km = routeInfo?.distanceKm || 14.2;
  const durationMins = routeInfo?.durationMins || Math.round(km * 2.0 + 4);

  // Dynamic Drop Time based on current time + durationMins
  const now = new Date();
  const dropTimeDate = new Date(now.getTime() + durationMins * 60000);
  const dropHours = dropTimeDate.getHours();
  const dropMinutes = dropTimeDate.getMinutes();
  const ampm = dropHours >= 12 ? 'pm' : 'am';
  const formattedHours = dropHours % 12 || 12;
  const formattedMinutes = dropMinutes < 10 ? '0' + dropMinutes : dropMinutes;
  const dropTimeStr = `${formattedHours}:${formattedMinutes} ${ampm}`;

  // Vehicle ETA in mins away
  const bikeEta = Math.min(6, Math.max(2, Math.round(km * 0.15 + 2)));
  const autoEta = Math.min(6, Math.max(3, Math.round(km * 0.18 + 3)));
  const cabEta = Math.min(8, Math.max(3, Math.round(km * 0.2 + 3)));

  // Dynamic Fares calculation based on distance (km):
  // At 14.2 km (screenshot benchmark):
  // Bike: 180, Auto: 313, Auto Priority: 335, Cab Economy: 374, Cab Priority: 439, Cab Premium: 483, Cab XL: 637, Auto Pet: 364
  const bikeFare = Math.max(40, Math.round(35 + km * 10.2));
  const autoFare = Math.max(70, Math.round(55 + km * 18.17));
  const autoPriorityFare = autoFare + Math.round(15 + km * 0.5);
  const autoPetFare = autoFare + Math.round(35 + km * 1.1);
  const cabEconomyFare = Math.max(120, Math.round(90 + km * 20.0));
  const cabPriorityFare = cabEconomyFare + Math.round(45 + km * 1.4);
  const cabPremiumFare = Math.round(cabEconomyFare * 1.29);
  const cabXlFare = Math.round(cabEconomyFare * 1.70);

  const isWedding = activeServiceSource === 'WEDDING';
  const weddingDetails = draftBooking?.variant?.weddingDetails;
  const weddingFare = draftBooking?.finalFare || draftBooking?.variant?.finalFare || 3500;

  // Selected ride key
  const [selectedRideKey, setSelectedRideKey] = useState(isWedding ? 'wedding_fleet' : 'bike');
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Exact 9 vehicle options from Image 2 & Image 3 with dynamic prices
  const weddingVipFare = weddingFare + Math.round(1500 * (weddingDetails?.quantity || 1));
  const weddingSaverFare = Math.max(2200, Math.round(weddingFare * 0.75));

  const ridesData = isWedding
    ? [
        {
          key: 'wedding_fleet',
          title: draftBooking?.variant?.name || `${weddingDetails?.quantity || 1}x ${weddingDetails?.carModel || 'Wedding Luxury Fleet'}`,
          subtitle: `${weddingDetails?.color || 'Royal White'} • Date: ${weddingDetails?.eventDate || 'Confirmed'}`,
          meta: `${weddingDetails?.quantity || 1} Vehicle(s) • Doorstep Chauffeur Included`,
          price: `₹${weddingFare.toLocaleString('en-IN')}`,
          rawPrice: weddingFare,
          iconType: 'wedding_fleet',
          badge: { text: 'Selected Fleet', type: 'yellow' },
        },
        {
          key: 'wedding_vip',
          title: `${weddingDetails?.quantity || 1}x ${weddingDetails?.carModel || 'Car'} (Royal VIP Decor)`,
          subtitle: 'Fresh Floral Bridal/Baraat Decor • VIP Chauffeur',
          meta: 'Full Floral Styling + Chauffeur in Formal Attire',
          price: `₹${weddingVipFare.toLocaleString('en-IN')}`,
          rawPrice: weddingVipFare,
          iconType: 'wedding_vip',
          badge: { text: 'VIP Royal Decor', type: 'yellow' },
        },
        {
          key: 'wedding_saver',
          title: `${weddingDetails?.quantity || 1}x Wedding Guest Shuttle`,
          subtitle: 'AC Transit Cab for Guests & Family',
          meta: 'Point-to-Point Venue & Hotel Pickup/Drop',
          price: `₹${weddingSaverFare.toLocaleString('en-IN')}`,
          rawPrice: weddingSaverFare,
          iconType: 'wedding_saver',
          badge: { text: 'Guest Saver', type: 'pink' },
        },
      ]
    : [
    {
      key: 'bike',
      title: 'Bike',
      subtitle: 'Quick Bike rides',
      meta: `${bikeEta} mins away • Drop ${dropTimeStr} • 👤 1`,
      price: `₹${bikeFare}`,
      rawPrice: bikeFare,
      iconType: 'bike',
      badge: null,
    },
    {
      key: 'auto',
      title: 'Auto',
      subtitle: null,
      meta: `${autoEta} mins • Drop ${dropTimeStr}`,
      price: `₹${autoFare}`,
      rawPrice: autoFare,
      iconType: 'auto',
      badge: null,
    },
    {
      key: 'auto_priority',
      title: 'Auto Priority',
      subtitle: null,
      meta: `${autoEta} mins • Drop ${dropTimeStr}`,
      price: `₹${autoPriorityFare}`,
      rawPrice: autoPriorityFare,
      iconType: 'auto_priority',
      badge: { text: 'Quickest', type: 'yellow' },
    },
    {
      key: 'cab_economy',
      title: 'Cab Economy',
      subtitle: null,
      meta: `${cabEta} mins • Drop ${dropTimeStr}`,
      price: `₹${cabEconomyFare}`,
      rawPrice: cabEconomyFare,
      iconType: 'cab_economy',
      badge: null,
    },
    {
      key: 'cab_priority',
      title: 'Cab Priority',
      subtitle: null,
      meta: `${cabEta} mins • Drop ${dropTimeStr}`,
      price: `₹${cabPriorityFare}`,
      rawPrice: cabPriorityFare,
      iconType: 'cab_priority',
      badge: null,
    },
    {
      key: 'cab_premium',
      title: 'Cab Premium',
      subtitle: null,
      meta: `${cabEta} mins • Drop ${dropTimeStr}`,
      price: `₹${cabPremiumFare}`,
      rawPrice: cabPremiumFare,
      iconType: 'cab_premium',
      badge: null,
    },
    {
      key: 'cab_xl',
      title: 'Cab XL',
      subtitle: null,
      meta: `${cabEta} mins • Drop ${dropTimeStr}`,
      price: `₹${cabXlFare}`,
      rawPrice: cabXlFare,
      iconType: 'cab_xl',
      badge: null,
    },
    {
      key: 'auto_pet',
      title: 'Auto Pet',
      subtitle: null,
      meta: `${autoEta} mins • Drop ${dropTimeStr}`,
      price: `₹${autoPetFare}`,
      rawPrice: autoPetFare,
      iconType: 'auto_pet',
      badge: null,
    },
  ];

  const selectedRide = ridesData.find((r) => r.key === selectedRideKey) || ridesData[0];

  const formatPillName = (name, fallback) => {
    const raw = (name || fallback || '').trim();
    if (raw.length > 15) return raw.substring(0, 14) + '...';
    return raw;
  };

  const renderRadio = (isSelected) => (
    <View style={[{"width":24,"height":24,"borderRadius":12,"borderWidth":2,"borderColor":"#64748B","justifyContent":"center","alignItems":"center"}, isSelected && styles.radioOuterSelected]}>
      {isSelected && <View style={{"width":12,"height":12,"borderRadius":6,"backgroundColor":"#1E3A8A"}} />}
    </View>
  );

  const handleSelectPayment = (key) => {
    setPaymentMethod(key);
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 200);
  };

  const getPaymentLabel = (method) => {
    switch (method) {
      case 'gpay':
        return 'GPay';
      case 'phonepe':
        return 'PhonePe';
      case 'idfc':
        return 'IDFC Bank';
      case 'pay_at_drop':
        return 'Pay at drop';
      case 'cash':
      default:
        return 'Cash';
    }
  };

  const renderSelectedPaymentIcon = (method) => {
    switch (method) {
      case 'gpay':
        return (
          <Image
            source={require('../../assets/gpay_logo.png')}
            style={{"width":32,"height":14,"marginRight":6}}
            resizeMode="contain"
          />
        );
      case 'phonepe':
        return (
          <Image
            source={require('../../assets/phonepe_logo.png')}
            style={{"width":20,"height":20,"borderRadius":10,"marginRight":6}}
            resizeMode="contain"
          />
        );
      case 'idfc':
        return (
          <Image
            source={require('../../assets/idfc_logo.png')}
            style={{"width":20,"height":20,"borderRadius":10,"marginRight":6}}
            resizeMode="contain"
          />
        );
      case 'pay_at_drop':
        return <Ionicons name="qr-code-outline" size={17} color="#0F172A" style={{ marginRight: 6 }} />;
      case 'cash':
      default:
        return <Ionicons name="card-outline" size={17} color="#0F172A" style={{ marginRight: 6 }} />;
    }
  };

  const handleBookNow = () => {
    const fareNumber = parseInt(String(selectedRide.price).replace(/[^0-9]/g, ''), 10) || 180;
    const bookingPayload = isWedding
      ? {
          ...draftBooking,
          finalFare: fareNumber,
          variant: {
            ...draftBooking?.variant,
            name: selectedRide.title,
            finalFare: fareNumber,
          },
          paymentMethod: paymentMethod || 'cash',
        }
      : {
      category: selectedRide.key.includes('cab')
        ? 'cab'
        : selectedRide.key.includes('auto')
        ? 'auto'
        : 'bike',
      variant: {
        name: selectedRide.title,
        finalFare: fareNumber,
      },
      paymentMethod: paymentMethod || 'cash',
      finalFare: fareNumber,
      pickup: pickup,
      destination: destination,
    };
    setDraftBooking(bookingPayload);
    setCurrentScreen('CHECK_PICKUP');
  };

  const renderRideIcon = (type) => {
    switch (type) {
      case 'bike':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <FontAwesome5 name="motorcycle" size={26} color="#0F172A" />
          </View>
        );
      case 'bike_women':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <View style={{"flexDirection":"row","gap":2,"marginBottom":2}}>
              <Ionicons name="star" size={8} color="#EC4899" />
              <Ionicons name="star" size={10} color="#EC4899" />
              <Ionicons name="star" size={8} color="#EC4899" />
            </View>
            <FontAwesome5 name="motorcycle" size={24} color="#0F172A" />
          </View>
        );
      case 'auto':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <MaterialCommunityIcons name="rickshaw" size={28} color="#047857" />
          </View>
        );
      case 'auto_priority':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <View style={{"position":"absolute","top":-4,"left":2,"zIndex":2}}>
              <Ionicons name="flash" size={12} color="#F59E0B" />
            </View>
            <MaterialCommunityIcons name="rickshaw" size={28} color="#047857" />
          </View>
        );
      case 'cab_economy':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <Ionicons name="car" size={26} color="#475569" />
          </View>
        );
      case 'cab_priority':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <View style={{"position":"absolute","top":-4,"left":2,"zIndex":2}}>
              <Ionicons name="flash" size={12} color="#EF4444" />
            </View>
            <Ionicons name="car" size={26} color="#0F172A" />
          </View>
        );
      case 'wedding_vip':
      case 'wedding_saver':
      case 'wedding_fleet':
      case 'cab_premium':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <View style={{"position":"absolute","top":-4,"left":2,"zIndex":2}}>
              <Ionicons name="sparkles" size={12} color="#D97706" />
            </View>
            <FontAwesome5 name="car-side" size={24} color="#B45309" />
          </View>
        );
      case 'cab_xl':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <FontAwesome5 name="shuttle-van" size={24} color="#1E293B" />
          </View>
        );
      case 'auto_pet':
        return (
          <View style={{"width":48,"height":44,"justifyContent":"center","alignItems":"center","marginRight":12}}>
            <View style={{"position":"absolute","top":-4,"left":2,"zIndex":2}}>
              <FontAwesome5 name="paw" size={10} color="#2563EB" />
            </View>
            <MaterialCommunityIcons name="rickshaw" size={28} color="#047857" />
          </View>
        );
      default:
        return <FontAwesome5 name="car" size={24} color="#0F172A" />;
    }
  };

  return (
    <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* FULL SCROLL VIEW: Map on top + Rides list below (Scroll up reveals Image 3) */}
      <ScrollView
        style={{"flex":1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* REAL DELHI MAP AREA (Image 2) */}
        <InteractiveMap
          pickupName={formatPillName(pickup?.shortName || pickup?.address, 'B34, Sainik N...')}
          dropName={formatPillName(activeDrop?.shortName || activeDrop?.address, 'Enter drop location')}
          onBackPress={handleBackPress}
          onEditPickup={handleBackPress}
          onEditDrop={handleBackPress}
          onAddStopPress={() => {}}
          onRecenterPress={() => {}}
          style={{ height: 320 }}
        />

        {/* BOTTOM SHEET CARD (Rounded top corners, rides list) */}
        <View style={{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"marginTop":-20,"paddingTop":10,"paddingHorizontal":16}}>
          {/* Top Grab Handle */}
          <View style={{"width":44,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":12}} />

          {/* RIDES LIST (Image 2 & Image 3) */}
          <View style={{"gap":10}}>
            {ridesData.map((item) => {
              const isSelected = selectedRideKey === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.rideCard,
                    isSelected && styles.rideCardSelected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedRideKey(item.key)}
                >
                  {/* Left: Vehicle Illustration / Icon */}
                  {renderRideIcon(item.iconType)}

                  {/* Center: Details */}
                  <View style={{"flex":1}}>
                    <Text style={{"fontSize":15,"fontWeight":"800","color":"#0F172A","marginBottom":2}}>{item.title}</Text>

                    {/* Pink Badge for Bike Rated by Women */}
                    {item.badge && item.badge.type === 'pink' && (
                      <View style={{"backgroundColor":"#FDF2F8","paddingHorizontal":8,"paddingVertical":2,"borderRadius":6,"alignSelf":"flex-start","marginBottom":4}}>
                        <Text style={{"fontSize":11,"fontWeight":"700","color":"#DB2777"}}>{item.badge.text}</Text>
                      </View>
                    )}

                    {/* Yellow Badge for Quickest */}
                    {item.badge && item.badge.type === 'yellow' && (
                      <View style={{"backgroundColor":"#FEF3C7","paddingHorizontal":8,"paddingVertical":2,"borderRadius":6,"alignSelf":"flex-start","marginBottom":4}}>
                        <Text style={{"fontSize":11,"fontWeight":"800","color":"#B45309"}}>{item.badge.text}</Text>
                      </View>
                    )}

                    {/* Subtitle if any */}
                    {item.subtitle && (
                      <Text style={{"fontSize":12,"color":"#64748B","marginBottom":3}}>{item.subtitle}</Text>
                    )}

                    {/* ETA & Drop Meta */}
                    <Text style={{"fontSize":12,"color":"#64748B"}}>{item.meta}</Text>
                  </View>

                  {/* Right: Fare Price */}
                  <View style={{"marginLeft":10,"alignItems":"flex-end"}}>
                    <Text style={{"fontSize":18,"fontWeight":"900","color":"#0F172A"}}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* DOCKED BOTTOM ACTION BAR (Left: Payment method, Right: Book Now) */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 6 : 14 },
        ]}
      >
        <View style={{"flexDirection":"row","alignItems":"center","gap":12}}>
          {/* Left: Payment Method Button (Replacing Bargain & Book) */}
          <TouchableOpacity
            style={{"flex":1,"height":52,"backgroundColor":"#FFFFFF","borderWidth":1.2,"borderColor":"#CBD5E1","borderRadius":26,"paddingHorizontal":14,"flexDirection":"row","alignItems":"center","justifyContent":"space-between"}}
            activeOpacity={0.8}
            onPress={() => setShowPaymentModal(true)}
          >
            <View style={{"flexDirection":"row","alignItems":"center","flex":1}}>
              {renderSelectedPaymentIcon(paymentMethod)}
              <Text style={{"fontSize":14,"fontWeight":"700","color":"#0F172A","marginLeft":4,"flex":1}} numberOfLines={1}>
                {getPaymentLabel(paymentMethod)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#0F172A" />
          </TouchableOpacity>

          {/* Right: Book Now (Solid Yellow button) */}
          <TouchableOpacity
            style={{"flex":1.3,"height":52,"backgroundColor":"#0F172A","borderRadius":26,"alignItems":"center","justifyContent":"center"}}
            activeOpacity={0.85}
            onPress={handleBookNow}
          >
            <Text style={{"fontSize":16,"fontWeight":"800","color":"#FFFFFF"}}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PAYMENTS MODAL (Matching User Screenshot exactly, without AmazonPay) */}
      <Modal visible={showPaymentModal} transparent animationType="slide">
        <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.45)","justifyContent":"flex-end"}}>
          <View style={{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":10,"maxHeight":"92%"}}>
            {/* Drag Handle */}
            <View style={{"width":44,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":12}} />

            {/* Header: Back arrow & Title */}
            <View style={{"flexDirection":"row","alignItems":"center","marginBottom":16}}>
              <TouchableOpacity
                onPress={() => setShowPaymentModal(false)}
                activeOpacity={0.7}
                style={{"padding":4,"marginRight":12}}
              >
                <Ionicons name="arrow-back" size={24} color="#0F172A" />
              </TouchableOpacity>
              <Text style={{"fontSize":22,"fontWeight":"800","color":"#0F172A"}}>Payments</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 25 }}>
              {/* Total Fare Row */}
              <View style={{"flexDirection":"row","justifyContent":"space-between","alignItems":"center","paddingVertical":8}}>
                <Text style={{"fontSize":18,"fontWeight":"700","color":"#0F172A"}}>Total Fare</Text>
                <Text style={{"fontSize":24,"fontWeight":"900","color":"#0F172A"}}>{selectedRide.price}</Text>
              </View>

              {/* Dotted Divider */}
              <View style={{"borderBottomWidth":1.5,"marginVertical":14}} />

              {/* SECTION: Pay by any UPI app */}
              <View style={{"flexDirection":"row","alignItems":"center","marginBottom":12,"marginTop":6}}>
                <Image
                  source={require('../../assets/upi_logo.png')}
                  style={{"width":62,"height":25,"marginRight":10}}
                  resizeMode="contain"
                />
                <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A"}}>Pay by any UPI app</Text>
              </View>

              {/* UPI Options Card */}
              <View style={{"backgroundColor":"#FFFFFF","borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","overflow":"hidden"}}>
                {/* 1. GPay */}
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingHorizontal":16,"paddingVertical":14}}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPayment('gpay')}
                >
                  <View style={{"flexDirection":"row","alignItems":"center","flex":1}}>
                    <Image
                      source={require('../../assets/gpay_logo.png')}
                      style={{"width":40,"height":18}}
                      resizeMode="contain"
                    />
                    <Text style={{"fontSize":15,"fontWeight":"600","color":"#0F172A","marginLeft":14}}>GPay</Text>
                  </View>
                  {renderRadio(paymentMethod === 'gpay')}
                </TouchableOpacity>

                <View style={{"height":1,"backgroundColor":"#F1F5F9","marginLeft":54}} />

                {/* 2. PhonePe */}
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingHorizontal":16,"paddingVertical":14}}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPayment('phonepe')}
                >
                  <View style={{"flexDirection":"row","alignItems":"center","flex":1}}>
                    <Image
                      source={require('../../assets/phonepe_logo.png')}
                      style={{"width":28,"height":28,"borderRadius":14}}
                      resizeMode="contain"
                    />
                    <Text style={{"fontSize":15,"fontWeight":"600","color":"#0F172A","marginLeft":14}}>PhonePe</Text>
                  </View>
                  {renderRadio(paymentMethod === 'phonepe')}
                </TouchableOpacity>

                <View style={{"height":1,"backgroundColor":"#F1F5F9","marginLeft":54}} />

                {/* 3. IDFC FIRST Bank */}
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingHorizontal":16,"paddingVertical":14}}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPayment('idfc')}
                >
                  <View style={{"flexDirection":"row","alignItems":"center","flex":1}}>
                    <Image
                      source={require('../../assets/idfc_logo.png')}
                      style={{"width":28,"height":28,"borderRadius":14}}
                      resizeMode="contain"
                    />
                    <Text style={{"fontSize":15,"fontWeight":"600","color":"#0F172A","marginLeft":14}}>IDFC FIRST Bank</Text>
                  </View>
                  {renderRadio(paymentMethod === 'idfc')}
                </TouchableOpacity>
              </View>

              {/* SECTION: Pay Later */}
              <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginTop":22,"marginBottom":10}}>Pay Later</Text>
              <View style={{"backgroundColor":"#FFFFFF","borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","overflow":"hidden"}}>
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingHorizontal":16,"paddingVertical":14}}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPayment('pay_at_drop')}
                >
                  <View style={{"flexDirection":"row","alignItems":"center","flex":1}}>
                    <View style={{"width":32,"alignItems":"center"}}>
                      <Ionicons name="qr-code-outline" size={22} color="#0F172A" />
                    </View>
                    <Text style={{"fontSize":15,"fontWeight":"600","color":"#0F172A","marginLeft":14}}>Pay at drop</Text>
                  </View>
                  {renderRadio(paymentMethod === 'pay_at_drop')}
                </TouchableOpacity>

                {/* Go cashless tag */}
                <View style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#F8FAFC","borderRadius":12,"paddingHorizontal":12,"paddingVertical":9,"marginHorizontal":16,"marginBottom":14}}>
                  <Ionicons name="pricetag" size={14} color="#334155" style={{ marginRight: 8 }} />
                  <Text style={{"fontSize":12,"color":"#334155","fontWeight":"500","flex":1}}>
                    Go cashless, after ride pay by scanning QR code
                  </Text>
                </View>
              </View>

              {/* SECTION: Others */}
              <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginTop":22,"marginBottom":10}}>Others</Text>
              <View style={{"backgroundColor":"#FFFFFF","borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","overflow":"hidden"}}>
                <TouchableOpacity
                  style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingHorizontal":16,"paddingVertical":14}}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPayment('cash')}
                >
                  <View style={{"flexDirection":"row","alignItems":"center","flex":1}}>
                    <View style={{"width":32,"alignItems":"center"}}>
                      <Ionicons name="card-outline" size={22} color="#0F172A" />
                    </View>
                    <Text style={{"fontSize":15,"fontWeight":"600","color":"#0F172A","marginLeft":14}}>Cash</Text>
                  </View>
                  {renderRadio(paymentMethod === 'cash' || !paymentMethod)}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  radioOuterSelected: {
    borderColor: '#1E3A8A',
  },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rideCardSelected: {
    borderColor: '#0F172A',
    borderWidth: 1.5,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
});

