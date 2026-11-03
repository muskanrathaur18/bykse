import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('SPLASH');

  // App Config & Language
  const [language, setLanguageState] = useState('en');
  const [isOnline, setIsOnline] = useState(true);
  const [appUpdateRequired, setAppUpdateRequired] = useState(false);

  // User Session & Profile (Editable details for Step 13)
  const [user, setUser] = useState({
    name: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    dob: '',
    memberSince: '',
    rating: 5.0,
    totalRides: 0,
    isLoggedIn: false,
    avatar: '',
  });

  const [profileSubView, setProfileSubView] = useState('MAIN');

  // Permissions & Location
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [isGpsEnabled, setIsGpsEnabled] = useState(true);
  const [serviceZoneAvailable, setServiceZoneAvailable] = useState(true);

  // Locations
  const [pickup, setPickup] = useState({
    id: 'p_current',
    address: 'B34, Sainik Nagar, Mansa Ram Park, Uttam Nagar, Delhi',
    shortName: 'B34, Sainik N...',
    landmark: 'Mansa Ram Park',
    lat: 28.6219,
    lng: 77.0375,
    coords: { x: 26, y: 35 },
  });

  const [destination, setDestination] = useState(null);
  const [parcelDestination, setParcelDestination] = useState(null);
  const [weddingDestination, setWeddingDestination] = useState(null);
  const [activeServiceSource, setActiveServiceSource] = useState('RIDE'); // 'RIDE' | 'PARCEL' | 'WEDDING'

  const [routeInfo, setRouteInfo] = useState({
    distanceKm: 0,
    durationMins: 0,
  });

  // Ride & Fare Selection
  const [selectedRideCategory, setSelectedRideCategory] = useState('bike'); // 'bike' | 'auto' | 'cab'
  const [selectedRideVariant, setSelectedRideVariant] = useState('bike_standard');
  const [appliedCoupon, setAppliedCoupon] = useState('BYKSE50');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' | 'wallet' | 'upi' | 'card'
  const [walletBalance, setWalletBalance] = useState(250);
  const [flexiFareOffer, setFlexiFareOffer] = useState(0); // for Auto Flexi fare

  // Step 6, 7, 8, 9: Active Booking & Trip Lifecycle
  const [activeBooking, setActiveBookingState] = useState(null);
  const [draftBooking, setDraftBooking] = useState(null);
  const [alternateFlowMessage, setAlternateFlowMessage] = useState(null);
  const [showWeddingModal, setShowWeddingModal] = useState(false);

  // Step 12: Ride History (Upcoming, Completed, Cancelled)
  const [rideHistory, setRideHistory] = useState([
    {
      id: 'RD17930002326062287',
      category: 'parcel',
      type: 'Parcel Ride',
      title: 'Nangal Dewat, Sector D',
      pickup: 'B/164/1, Sainik Nagar',
      pickupFull: 'Mansa Ram Park, Uttam Nagar, Delhi, 110059, India',
      drop: 'Nangal Dewat, Sector D',
      dropFull: 'Vasant Kunj, New Delhi, Delhi, India',
      date: '26 Oct 2026 • 01:07 PM',
      distance: '18.5 kms',
      duration: '51.4 mins',
      fare: 0,
      priceStr: '₹0.0',
      status: 'Cancelled',
      paymentMethod: 'Cash',
      paymentStatus: 'Cancelled',
      cancelReason: 'Customer requested cancellation',
    },
    {
      id: 'RD17930001849129034',
      category: 'bike',
      type: 'Bike Ride',
      title: 'Nangal Dewat, Sector D',
      pickup: 'B/164/1, Sainik Nagar',
      pickupFull: 'Mansa Ram Park, Uttam Nagar, Delhi, 110059, India',
      drop: 'Nangal Dewat, Sector D',
      dropFull: 'Vasant Kunj, New Delhi, Delhi, India',
      date: '22 Oct 2026 • 04:33 PM',
      distance: '18.5 kms',
      duration: '48.0 mins',
      fare: 0,
      priceStr: '₹0.0',
      status: 'Cancelled',
      paymentMethod: 'Cash',
      paymentStatus: 'Cancelled',
      cancelReason: 'Customer requested cancellation',
    },
    {
      id: 'BYK-77412',
      category: 'auto',
      type: 'Bykse Auto',
      status: 'Completed',
      date: 'Yesterday, 10:15 AM',
      pickup: 'Indiranagar Metro Station',
      drop: 'Koramangala Sony World Signal',
      distance: '5.2 km',
      duration: '18 mins',
      fare: 85,
      paymentMethod: 'Bykse Wallet',
      paymentStatus: 'Paid',
      captain: {
        name: 'Suresh Gowda',
        rating: 4.95,
        vehicle: 'Bajaj RE Auto (KA 03 MX 9912)',
      },
      invoiceUrl: 'INV-77412.pdf',
    },
    {
      id: 'BYK-66104',
      category: 'cab',
      type: 'Cab Mini',
      status: 'Cancelled',
      date: '07 Oct, 08:30 PM',
      pickup: 'ECOSPACE Business Park',
      drop: 'HSR Layout Sector 2',
      distance: '4.1 km',
      duration: '14 mins',
      fare: 0,
      paymentMethod: 'UPI',
      paymentStatus: 'Refunded (₹0 fee)',
      cancelReason: 'Captain asked to cancel / delayed arrival',
      captain: {
        name: 'Manjunath K',
        rating: 4.75,
        vehicle: 'Maruti WagonR (KA 05 AJ 4410)',
      },
    },
    {
      id: 'BYK-99015',
      category: 'bike',
      type: 'Bike Taxi',
      status: 'Upcoming',
      date: 'Tomorrow, 09:30 AM',
      pickup: 'Saujanya Block, NGV Koramangala',
      drop: 'Indiranagar 100ft Road',
      distance: '6.2 km',
      duration: '20 mins',
      fare: 65,
      paymentMethod: 'Cash',
      paymentStatus: 'Scheduled',
      captain: null,
    },
  ]);

  // Step 13: Saved Addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'home',
      title: 'Home',
      address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
      tag: 'home',
      isDefault: true,
      coords: { x: 75, y: 68 },
    },
    {
      id: 'work',
      title: 'Work',
      address: 'ECOSPACE Business Park, Outer Ring Rd, Bengaluru',
      tag: 'briefcase',
      isDefault: false,
      coords: { x: 80, y: 35 },
    },
    {
      id: 'gym',
      title: 'Cult.fit Gym',
      address: '100ft Rd, 4th Block, Koramangala, Bengaluru',
      tag: 'fitness',
      isDefault: false,
      coords: { x: 45, y: 50 },
    },
  ]);

  // Step 14: Wallet Transactions Ledger
  const [walletTransactions, setWalletTransactions] = useState([
    {
      id: 'TXN-94810',
      type: 'CREDIT',
      title: 'Added Money via UPI',
      sub: 'Google Pay • Ref: 981249821',
      amount: 200,
      date: 'Today, 01:20 PM',
      status: 'Success',
    },
    {
      id: 'TXN-87412',
      type: 'DEBIT',
      title: 'Ride Payment #BYK-77412',
      sub: 'Bykse Auto Trip',
      amount: 85,
      date: 'Yesterday, 10:35 AM',
      status: 'Success',
      rideId: 'BYK-77412',
    },
    {
      id: 'TXN-66104',
      type: 'REFUND',
      title: 'Refund on Cancelled Trip #BYK-66104',
      sub: 'Zero fee policy refund',
      amount: 50,
      date: '07 Oct, 08:35 PM',
      status: 'Success',
      rideId: 'BYK-66104',
    },
  ]);

  // Step 15: Available Coupons
  const [coupons, setCoupons] = useState([
    {
      code: 'BYKSE50',
      title: '50% OFF up to ₹35',
      desc: 'Valid on first 3 Bike Taxi rides in Bengaluru',
      discountPct: 50,
      maxDiscount: 35,
      minFare: 40,
      category: 'bike',
      expiresIn: 'Ends in 3 days',
      terms: 'Applicable only on standard bike rides. Cannot be clubbed with other offers.',
    },
    {
      code: 'AUTO100',
      title: '₹20 Flat OFF on Auto',
      desc: 'No surge charge • Valid on auto rides above ₹60',
      discountPct: 0,
      flatDiscount: 20,
      minFare: 60,
      category: 'auto',
      expiresIn: 'Valid till 31 Oct',
      terms: 'Valid once per user per day. Applicable across all operational city zones.',
    },
    {
      code: 'SUPERPASS',
      title: 'Flat 20% OFF on Cabs',
      desc: 'Valid on Mini, Sedan and XL rides',
      discountPct: 20,
      maxDiscount: 60,
      minFare: 120,
      category: 'cab',
      expiresIn: 'Valid this weekend',
      terms: 'Applies on total fare before tolls. Valid across all payment modes.',
    },
    {
      code: 'METRO20',
      title: '₹15 OFF on Metro Feeder',
      desc: 'Special last-mile connectivity to any metro station',
      discountPct: 0,
      flatDiscount: 15,
      minFare: 30,
      category: 'bike',
      expiresIn: 'Valid all month',
      terms: 'Drop must be within 200m of an authorized Metro station.',
    },
  ]);

  // Step 16: Notifications Center
  const [notifications, setNotifications] = useState([
    {
      id: 'N1',
      title: 'Captain Assigned!',
      body: 'Vikram Sharma is arriving in 3 mins. Start OTP: 4821',
      time: '10 mins ago',
      read: false,
      type: 'booking',
      targetScreen: 'BOOKING_STATUS',
    },
    {
      id: 'N2',
      title: '₹35 Saved with BYKSE50',
      body: 'Promo discount successfully applied on your trip!',
      time: '1 hour ago',
      read: false,
      type: 'promo',
      targetScreen: 'HOME',
    },
    {
      id: 'N3',
      title: 'Safety Tip for Night Rides',
      body: 'Always check captain vehicle plate before boarding and share live trip with loved ones.',
      time: 'Yesterday',
      read: true,
      type: 'safety',
      targetScreen: 'HOME',
    },
    {
      id: 'N4',
      title: 'Refund Processed #BYK-66104',
      body: '₹50 credited back to your Bykse Wallet successfully.',
      time: '2 days ago',
      read: true,
      type: 'wallet',
      targetScreen: 'HOME',
    },
  ]);

  // Step 17: Support & Complaint Tickets
  const [supportTickets, setSupportTickets] = useState([
    {
      id: 'TKT-8912',
      category: 'Fare / Payment',
      rideId: 'BYK-77412',
      issue: 'Extra charge dispute on waiting time',
      description: 'The captain arrived early and added 5 mins extra waiting time that was not accrued.',
      status: 'Resolved',
      createdAt: 'Yesterday, 11:00 AM',
      resolvedAt: 'Yesterday, 02:30 PM',
      resolution: '₹15 extra charge refunded to Bykse Wallet.',
    },
  ]);

  // Step 18: Safety Features State
  const [trustedContacts, setTrustedContacts] = useState([
    { id: 'tc1', name: 'Papa', phone: '+91 98450 12345', relation: 'Father' },
    { id: 'tc2', name: 'Pooja (Sister)', phone: '+91 97410 98765', relation: 'Sister' },
  ]);

  const [lostItemReports, setLostItemReports] = useState([
    {
      id: 'LOST-102',
      rideId: 'BYK-77412',
      item: 'Black Leather Wallet',
      description: 'Left on the back seat of the auto',
      status: 'In Investigation',
      reportedAt: 'Yesterday',
    },
  ]);

  // Step 19: Additional Services State (Parcel, Metro, Auto Share/Pet)
  const [parcelBookings, setParcelBookings] = useState([
    {
      id: 'PCL-8419',
      itemType: 'Documents / Office Keys',
      weightKg: '1.5 kg',
      senderName: 'Rahul Sharma',
      senderPhone: '+91 98765 43210',
      receiverName: 'Amit Verma',
      receiverPhone: '+91 98110 54321',
      pickup: 'Saujanya Block, NGV Koramangala',
      drop: 'ECOSPACE Business Park, Bellandur',
      fare: 65,
      deliveryPin: '9421',
      status: 'Delivered',
      date: 'Yesterday, 04:30 PM',
    },
  ]);

  const [metroTickets, setMetroTickets] = useState([
    {
      id: 'MTR-5521',
      line: 'Purple Line',
      source: 'Indiranagar Metro Station',
      destination: 'MG Road Metro Station',
      passengers: 1,
      fare: 30,
      qrCodeData: 'BYKSE-MTR-5521-IND-MG-QR',
      status: 'Active',
      purchasedAt: 'Today, 10:15 AM',
      validTill: 'Today, 11:59 PM',
    },
  ]);

  // Step 20: Scheduled Rides State
  const [scheduledRides, setScheduledRides] = useState([
    {
      id: 'SCH-99015',
      pickup: 'Saujanya Block, NGV Koramangala',
      drop: 'Indiranagar 100ft Road',
      category: 'bike',
      vehicleName: 'Bike Taxi',
      dateText: 'Tomorrow, 09:30 AM',
      scheduledTimestamp: Date.now() + 86400000,
      estimatedFare: 65,
      status: 'Confirmed',
    },
  ]);

  // Load Initial Storage Data
  useEffect(() => {
    (async () => {
      const savedLang = await StorageService.getLanguage();
      if (savedLang) setLanguageState(savedLang);

      // Always start with login screen when app opens
      await StorageService.clearUserSession();

      const savedBooking = await StorageService.getActiveBooking();
      if (savedBooking && savedBooking.status !== 'CANCELLED') {
        setActiveBookingState(savedBooking);
      }
    })();
  }, []);

  // Translation helper fallback
  const t = (key) => key;

  const setLanguage = async (lang) => {
    setLanguageState(lang);
    await StorageService.setLanguage(lang);
  };

  const loginUser = async (phone, name = '', email = '') => {
    const newUser = {
      phone,
      name: name || '',
      firstName: name ? name.split(' ')[0] : '',
      lastName: name ? (name.split(' ')[1] || '') : '',
      email: email || '',
      gender: '',
      dob: '',
      memberSince: '',
      rating: 5.0,
      totalRides: 0,
      isLoggedIn: true,
      avatar: name ? name.substring(0, 2).toUpperCase() : '',
      registeredAt: new Date().toISOString(),
    };
    setUser(newUser);
    await StorageService.setUserSession(newUser);
  };

  const logoutUser = async () => {
    setUser({
      name: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: '',
      dob: '',
      memberSince: '',
      rating: 5.0,
      totalRides: 0,
      isLoggedIn: false,
      avatar: '',
    });
    await StorageService.clearUserSession();
    await StorageService.clearActiveBooking();
    setActiveBookingState(null);
    setCurrentScreen('AUTH');
  };

  // Recalculate route distance & time when pickup or destination changes
  const updateRouteCalculation = (p, d) => {
    if (!p || !d) return;

    let km = d.distanceKm;

    if (!km) {
      const destText = (d.shortName || d.address || '').toLowerCase();
      if (destText.includes('nawada') || destText.includes('uttam nagar') || destText.includes('mor') || destText.includes('janakpuri')) {
        km = 2.8;
      } else if (destText.includes('vegas') || destText.includes('dwarka') || destText.includes('sector 14') || destText.includes('sector 16')) {
        km = 6.2;
      } else if (destText.includes('nangal') || destText.includes('dewat') || destText.includes('vasant kunj') || destText.includes('mahipalpur')) {
        km = 14.2;
      } else if (destText.includes('airport') || destText.includes('del') || destText.includes('terminal')) {
        km = 19.5;
      } else if (destText.includes('connaught') || destText.includes('cp') || destText.includes('central delhi')) {
        km = 22.5;
      } else if (destText.includes('gurugram') || destText.includes('cyber') || destText.includes('noida')) {
        km = 28.0;
      } else {
        const dx = Math.abs((p.coords?.x || 26) - (d.coords?.x || 55));
        const dy = Math.abs((p.coords?.y || 35) - (d.coords?.y || 65));
        km = Math.max(2.5, Math.round(Math.sqrt(dx * dx + dy * dy) * 0.45 * 10) / 10);
      }
    }

    const duration = Math.round(km * 2.0 + 4);
    setRouteInfo({
      distanceKm: km,
      durationMins: duration,
    });
  };

  // Default Simulated Captain
  const defaultCaptain = {
    name: 'ARUN',
    rating: 4.85,
    tripsCount: 1420,
    phone: '+91 98765 43210',
    vehicleName: 'TVS Radeon',
    plateNumber: 'DL01AB3492',
    otp: '3471',
    etaMins: 3,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  };

  // Create Booking Action
  const initiateBooking = async (rideDetails) => {
    const bookingId = 'BYK-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      bookingId,
      status: 'SEARCHING', // 'SEARCHING' | 'ACCEPTED' | 'CAPTAIN_ARRIVED' | 'IN_TRIP' | 'COMPLETED' | 'CANCELLED'
      createdAt: new Date().toISOString(),
      rideDetails,
      pickup,
      destination,
      routeInfo,
      captain: defaultCaptain,
      startOtp: '3471',
      searchProgress: 0,
      paymentMethod,
      finalFare: rideDetails?.finalFare || 78,
      paymentStatus: 'PENDING',
    };
    setActiveBookingState(newBooking);
    await StorageService.setActiveBooking(newBooking);
    setCurrentScreen('BOOKING_STATUS');
    return newBooking;
  };

  const updateBookingState = async (updates) => {
    setActiveBookingState((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      StorageService.setActiveBooking(updated);
      return updated;
    });
  };

  // Verify PIN to Start Ride (Step 7: PIN check logic)
  const verifyTripPin = (enteredPin) => {
    if (!activeBooking) return false;
    if (enteredPin === activeBooking.startOtp || enteredPin === '4821') {
      updateBookingState({
        status: 'IN_TRIP',
        startedAt: new Date().toISOString(),
      });
      setCurrentScreen('LIVE_TRIP');
      return true;
    }
    return false;
  };

  // Complete Ride (Step 9: Destination reached)
  const completeTrip = () => {
    if (!activeBooking) return;
    updateBookingState({
      status: 'COMPLETED',
      completedAt: new Date().toISOString(),
    });
    setCurrentScreen('RIDE_COMPLETION');
  };

  // Pay Fare (Step 9)
  const processFarePayment = (method = 'Cash') => {
    if (method === 'Bykse Wallet' || method === 'wallet') {
      setWalletBalance((prev) => Math.max(0, prev - (activeBooking?.finalFare || 78)));
      // Add transaction
      const newTxn = {
        id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
        type: 'DEBIT',
        title: `Ride Payment #${activeBooking?.bookingId}`,
        sub: `${activeBooking?.rideDetails?.variant?.name || 'Bykse Ride'}`,
        amount: activeBooking?.finalFare || 78,
        date: 'Just now',
        status: 'Success',
        rideId: activeBooking?.bookingId,
      };
      setWalletTransactions((prev) => [newTxn, ...prev]);
    }
    updateBookingState({
      paymentStatus: 'Paid',
      paidVia: method,
    });
  };

  // Submit Rating & Tip (Step 10)
  const submitTripRating = ({ stars, tags, review, tip }) => {
    if (tip > 0 && walletBalance >= tip) {
      setWalletBalance((prev) => prev - tip);
      const tipTxn = {
        id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
        type: 'DEBIT',
        title: `Tip for Captain ${activeBooking?.captain?.name || 'Vikram'}`,
        sub: `Ride #${activeBooking?.bookingId}`,
        amount: tip,
        date: 'Just now',
        status: 'Success',
      };
      setWalletTransactions((prev) => [tipTxn, ...prev]);
    }

    // Add to completed ride history
    if (activeBooking) {
      const historyItem = {
        id: activeBooking.bookingId,
        category: activeBooking.rideDetails?.category || 'bike',
        type: activeBooking.rideDetails?.variant?.name || 'Bike Taxi',
        status: 'Completed',
        date: 'Today, Just now',
        pickup: activeBooking.pickup?.address,
        drop: activeBooking.destination?.address,
        distance: `${activeBooking.routeInfo?.distanceKm} km`,
        duration: `${activeBooking.routeInfo?.durationMins} mins`,
        fare: activeBooking.finalFare,
        paymentMethod: activeBooking.paidVia || 'Cash',
        paymentStatus: 'Paid',
        captain: activeBooking.captain,
        ratingGiven: stars,
        feedbackTags: tags,
        reviewText: review,
        tipGiven: tip,
        invoiceUrl: `INV-${activeBooking.bookingId}.pdf`,
      };
      setRideHistory((prev) => [historyItem, ...prev]);
    }

    // Clear active booking
    StorageService.clearActiveBooking();
    setActiveBookingState(null);
    setCurrentScreen('HOME');
  };

  // Cancel Booking (Step 11)
  const cancelActiveBooking = async (reason = 'Customer requested cancellation', fee = 0) => {
    if (activeBooking) {
      const cancelledItem = {
        id: activeBooking.bookingId,
        category: activeBooking.rideDetails?.category || 'bike',
        type: activeBooking.rideDetails?.variant?.name || 'Bike Taxi',
        status: 'Cancelled',
        date: 'Today, Just now',
        pickup: activeBooking.pickup?.address,
        drop: activeBooking.destination?.address,
        distance: `${activeBooking.routeInfo?.distanceKm} km`,
        fare: fee,
        paymentMethod: fee > 0 ? 'Bykse Wallet' : 'None',
        paymentStatus: fee > 0 ? 'Fee Charged' : 'Free Cancellation',
        cancelReason: reason,
        captain: activeBooking.captain,
      };
      setRideHistory((prev) => [cancelledItem, ...prev]);
      await StorageService.clearActiveBooking();
      setActiveBookingState(null);
    }
    setCurrentScreen('HOME');
  };

  // Create Support Complaint Ticket (Step 17)
  const createSupportTicket = (ticketData) => {
    const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    const newTicket = {
      id: ticketId,
      status: 'Open',
      createdAt: 'Just now',
      ...ticketData,
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  // Step 18 Actions
  const addTrustedContact = (contact) => {
    const newContact = {
      id: 'tc_' + Date.now(),
      ...contact,
    };
    setTrustedContacts((prev) => [...prev, newContact]);
  };

  const removeTrustedContact = (id) => {
    setTrustedContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const reportLostItem = (reportData) => {
    const newReport = {
      id: 'LOST-' + Math.floor(100 + Math.random() * 900),
      status: 'Submitted',
      reportedAt: 'Just now',
      ...reportData,
    };
    setLostItemReports((prev) => [newReport, ...prev]);
    return newReport;
  };

  // Step 19 Actions
  const createParcelBooking = (data) => {
    const parcelId = 'PCL-' + Math.floor(1000 + Math.random() * 9000);
    const newParcel = {
      id: parcelId,
      deliveryPin: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'Driver Assigned',
      date: 'Today, Just now',
      ...data,
    };
    setParcelBookings((prev) => [newParcel, ...prev]);
    return newParcel;
  };

  const bookMetroTicket = (data) => {
    const ticketId = 'MTR-' + Math.floor(1000 + Math.random() * 9000);
    const newTicket = {
      id: ticketId,
      qrCodeData: `BYKSE-${ticketId}-QR`,
      status: 'Active',
      purchasedAt: 'Today, Just now',
      validTill: 'Today, 11:59 PM',
      ...data,
    };
    setMetroTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  // Step 20 Actions
  const createScheduledRide = (data) => {
    const schedId = 'SCH-' + Math.floor(10000 + Math.random() * 90000);
    const newSched = {
      id: schedId,
      status: 'Confirmed',
      ...data,
    };
    setScheduledRides((prev) => [newSched, ...prev]);
    return newSched;
  };

  const cancelScheduledRide = (id) => {
    setScheduledRides((prev) => prev.filter((s) => s.id !== id));
  };

  const repeatBooking = (pastRide) => {
    if (!pastRide) return;
    setPickup({
      id: 'rep_p',
      address: pastRide.pickup,
      shortName: pastRide.pickup.split(',')[0],
      coords: { x: 40, y: 45 },
    });
    setDestination({
      id: 'rep_d',
      address: pastRide.drop,
      shortName: pastRide.drop.split(',')[0],
      coords: { x: 75, y: 68 },
    });
    setSelectedRideCategory(pastRide.category || 'bike');
    setCurrentScreen('RIDE_SELECTION');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        language,
        setLanguage,
        t,
        user,
        setUser,
        profileSubView,
        setProfileSubView,
        loginUser,
        logoutUser,
        hasLocationPermission,
        setHasLocationPermission,
        isGpsEnabled,
        setIsGpsEnabled,
        serviceZoneAvailable,
        setServiceZoneAvailable,
        isOnline,
        setIsOnline,
        appUpdateRequired,
        setAppUpdateRequired,
        pickup,
        setPickup,
        destination,
        setDestination,
        parcelDestination,
        setParcelDestination,
        weddingDestination,
        setWeddingDestination,
        activeServiceSource,
        setActiveServiceSource,
        routeInfo,
        setRouteInfo,
        updateRouteCalculation,
        selectedRideCategory,
        setSelectedRideCategory,
        selectedRideVariant,
        setSelectedRideVariant,
        appliedCoupon,
        setAppliedCoupon,
        paymentMethod,
        setPaymentMethod,
        walletBalance,
        setWalletBalance,
        flexiFareOffer,
        setFlexiFareOffer,
        activeBooking,
        draftBooking,
        setDraftBooking,
        initiateBooking,
        updateBookingState,
        cancelActiveBooking,
        verifyTripPin,
        completeTrip,
        processFarePayment,
        submitTripRating,
        alternateFlowMessage,
        setAlternateFlowMessage,
        rideHistory,
        setRideHistory,
        savedAddresses,
        setSavedAddresses,
        walletTransactions,
        setWalletTransactions,
        coupons,
        setCoupons,
        notifications,
        setNotifications,
        supportTickets,
        createSupportTicket,
        trustedContacts,
        addTrustedContact,
        removeTrustedContact,
        lostItemReports,
        reportLostItem,
        parcelBookings,
        createParcelBooking,
        metroTickets,
        bookMetroTicket,
        scheduledRides,
        createScheduledRide,
        cancelScheduledRide,
        repeatBooking,
        showWeddingModal,
        setShowWeddingModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);


