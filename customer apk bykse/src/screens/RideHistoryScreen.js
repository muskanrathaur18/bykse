import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export const RideHistoryScreen = () => {
  const { setCurrentScreen, rideHistory, repeatBooking } = useApp();
  const insets = useSafeAreaInsets();

  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All'); // 'All' | 'Parcel'
  const [isAddressExpanded, setIsAddressExpanded] = useState(true);

  // Fallback initial rides matching user's Image 1 & Image 2
  const defaultRides = [
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
      fare: 0,
      priceStr: '₹0.0',
      status: 'Cancelled',
      duration: '51.4 mins',
      distance: '18.5 kms',
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
      fare: 0,
      priceStr: '₹0.0',
      status: 'Cancelled',
      duration: '48.0 mins',
      distance: '18.5 kms',
    },
  ];

  const allRides = rideHistory && rideHistory.length > 0 ? rideHistory : defaultRides;

  const displayRides = allRides.filter((r) => {
    if (selectedFilter === 'Parcel') {
      return (
        r.category === 'parcel' ||
        (r.type && r.type.toLowerCase().includes('parcel'))
      );
    }
    return true;
  });

  /* ==================================================== */
  /* VIEW 2: RIDE DETAILS SCREEN (Exact Match to Image 2)  */
  /* ==================================================== */
  if (selectedRide) {
    const isCancelled = selectedRide.status === 'Cancelled';
    const isParcel =
      selectedRide.category === 'parcel' ||
      (selectedRide.type && selectedRide.type.toLowerCase().includes('parcel'));

    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* Details Header (Image 2) */}
        <View
          style={[
            styles.headerRow,
            { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 10 },
          ]}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedRide(null)}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Details Card (Image 2) */}
          <View style={styles.detailsMainCard}>
            <View style={styles.detailsCardPadding}>
              {/* Top Row: Title + Parcel Graphic */}
              <View style={styles.detailsCardTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailsRideType}>
                    {selectedRide.type || (isParcel ? 'Parcel Ride' : 'Bike Ride')}
                  </Text>
                  <Text style={styles.detailsDateText}>
                    {selectedRide.date || '26 Oct 2026 • 01:07 PM'}
                  </Text>
                </View>

                {/* Package / Vehicle Graphic */}
                <View style={styles.detailsGraphicBox}>
                  {isParcel ? (
                    <View style={styles.parcelIconBadge}>
                      <Ionicons name="cube" size={24} color="#D97706" />
                    </View>
                  ) : (
                    <View style={styles.bikeIconBadge}>
                      <Ionicons name="bicycle" size={24} color="#0F172A" />
                    </View>
                  )}
                </View>
              </View>

              {/* Price & Status Row */}
              <View style={styles.detailsPriceStatusRow}>
                <Text style={styles.detailsPriceAmount}>
                  ₹{selectedRide.fare ?? 0}
                </Text>

                <View
                  style={[
                    styles.detailsStatusBadge,
                    isCancelled
                      ? { backgroundColor: '#FEF2F2' }
                      : { backgroundColor: '#DCFCE7' },
                  ]}
                >
                  <Text
                    style={[
                      styles.detailsStatusText,
                      isCancelled ? { color: '#DC2626' } : { color: '#16A34A' },
                    ]}
                  >
                    {selectedRide.status || 'Cancelled'}
                  </Text>
                </View>
              </View>

              {/* Collapsible Address Details Header */}
              <TouchableOpacity
                style={styles.addressHeaderRow}
                activeOpacity={0.7}
                onPress={() => setIsAddressExpanded(!isAddressExpanded)}
              >
                <Text style={styles.addressHeadingText}>Address details</Text>
                <Ionicons
                  name={isAddressExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#475569"
                />
              </TouchableOpacity>

              {isAddressExpanded && (
                <View style={styles.routeContainer}>
                  {/* Ride ID */}
                  <Text style={styles.rideIdText}>
                    Ride ID #{selectedRide.id || 'RD17930002326062287'}
                  </Text>

                  {/* Route Timeline */}
                  <View style={styles.timelineRow}>
                    <View style={styles.timelineIndicators}>
                      {/* Green Ring */}
                      <View style={styles.greenRing}>
                        <View style={styles.greenDotInner} />
                      </View>
                      {/* Dotted Line */}
                      <View style={styles.dottedLine}>
                        <Text style={styles.dottedChar}>┆</Text>
                        <Text style={styles.dottedChar}>┆</Text>
                      </View>
                      {/* Red Ring */}
                      <View style={styles.redRing}>
                        <View style={styles.redDotInner} />
                      </View>
                    </View>

                    <View style={styles.timelineAddressCol}>
                      {/* Pickup */}
                      <View style={styles.timelineAddressBox}>
                        <Text style={styles.addressBold}>
                          {selectedRide.pickup || 'B/164/1, Sainik Nagar'}
                        </Text>
                        <Text style={styles.addressMuted}>
                          {selectedRide.pickupFull ||
                            'Mansa Ram Park, Uttam Nagar, Delhi, 110059, India'}
                        </Text>
                      </View>

                      {/* Drop */}
                      <View style={[styles.timelineAddressBox, { marginTop: 14 }]}>
                        <Text style={styles.addressBold}>
                          {selectedRide.drop || 'Nangal Dewat, Sector D'}
                        </Text>
                        <Text style={styles.addressMuted}>
                          {selectedRide.dropFull ||
                            'Vasant Kunj, New Delhi, Delhi, India'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Distance & Duration */}
                  <Text style={styles.distanceDurationText}>
                    {selectedRide.duration || '51.4 mins'} •{' '}
                    {selectedRide.distance || '18.5 kms'}
                  </Text>
                </View>
              )}
            </View>

            {/* Bottom Soft Blue Need Help Banner (Image 2) */}
            <TouchableOpacity
              style={styles.needHelpBanner}
              activeOpacity={0.8}
              onPress={() => setCurrentScreen('HELP_CENTER')}
            >
              <View style={styles.headsetIconBox}>
                <Ionicons name="headset" size={18} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.needHelpTitle}>Need help?</Text>
                <Text style={styles.needHelpSubtitle}>We're a tap away</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ==================================================== */
  /* VIEW 1: RIDE HISTORY LIST (Exact Match to Image 1)   */
  /* ==================================================== */
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header: ← Ride History */}
      <View
        style={[
          styles.headerRow,
          { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 10 },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setCurrentScreen('PROFILE')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Pill: Parcel (Image 1) */}
        <View style={styles.pillsRow}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'Parcel' && styles.filterPillActive,
            ]}
            onPress={() =>
              setSelectedFilter(selectedFilter === 'Parcel' ? 'All' : 'Parcel')
            }
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'Parcel' && styles.filterPillTextActive,
              ]}
            >
              Parcel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ride List Items (Image 1) */}
        <View style={styles.rideListContainer}>
          {displayRides.map((ride, index) => (
            <React.Fragment key={ride.id || index}>
              <TouchableOpacity
                style={styles.rideListItem}
                activeOpacity={0.65}
                onPress={() => setSelectedRide(ride)}
              >
                {/* Left Bike/Vehicle Icon */}
                <View style={styles.listVehicleIconBox}>
                  <Ionicons name="bicycle" size={26} color="#0F172A" />
                </View>

                {/* Ride Info Column */}
                <View style={styles.listInfoCol}>
                  <Text style={styles.listDropTitle}>
                    {ride.drop || ride.title || 'Nangal Dewat, Sector D'}
                  </Text>
                  <Text style={styles.listDateText}>
                    {ride.date || '26 Oct 2026 • 01:07 PM'}
                  </Text>
                  <Text style={styles.listFareStatusText}>
                    {ride.priceStr || `₹${ride.fare || 0}.0`} •{' '}
                    {ride.status || 'Cancelled'}
                  </Text>
                </View>

                {/* Right Chevron */}
                <Ionicons name="chevron-forward" size={18} color="#0F172A" />
              </TouchableOpacity>

              {index < displayRides.length - 1 && <View style={styles.listDivider} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 6,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Filter Pills */
  pillsRow: {
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  filterPillActive: {
    borderColor: '#0F172A',
    backgroundColor: '#0F172A',
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },


  /* Ride List (Image 1) */
  rideListContainer: {
    paddingHorizontal: 16,
  },
  rideListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  listVehicleIconBox: {
    width: 36,
    alignItems: 'flex-start',
    marginRight: 12,
  },
  listInfoCol: {
    flex: 1,
  },
  listDropTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  listDateText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },
  listFareStatusText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  listDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },


  /* ==================================================== */
  /* Details Screen Styles (Image 2)                      */
  /* ==================================================== */
  detailsMainCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  detailsCardPadding: {
    padding: 18,
  },
  detailsCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsRideType: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  detailsDateText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  detailsGraphicBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parcelIconBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bikeIconBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailsPriceStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailsPriceAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  detailsStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  detailsStatusText: {
    fontSize: 13,
    fontWeight: '700',
  },

  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  addressHeadingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  routeContainer: {
    marginTop: 4,
  },
  rideIdText: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 16,
    fontWeight: '500',
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineIndicators: {
    alignItems: 'center',
    width: 24,
    paddingTop: 3,
  },
  greenRing: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  greenDotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#16A34A',
  },
  dottedLine: {
    alignItems: 'center',
    marginVertical: 1,
  },
  dottedChar: {
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 12,
  },
  redRing: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  redDotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DC2626',
  },

  timelineAddressCol: {
    flex: 1,
    marginLeft: 12,
  },
  timelineAddressBox: {},
  addressBold: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  addressMuted: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 18,
  },
  distanceDurationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginLeft: 36,
    marginTop: 14,
    marginBottom: 6,
  },

  needHelpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headsetIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  needHelpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  needHelpSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 8,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
  },
  modalSubText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginTop: 6,
  },
  confirmGreenBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 12,
  },
  confirmGreenBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
