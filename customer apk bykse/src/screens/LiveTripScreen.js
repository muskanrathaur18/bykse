import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Animated,
  Linking,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { Button } from '../components/common/Button';

export const LiveTripScreen = () => {
  const {
    setCurrentScreen,
    activeBooking,
    pickup,
    destination,
    setDestination,
    routeInfo,
    updateRouteCalculation,
    completeTrip,
  } = useApp();

  // In-trip dynamic progress
  const [remainingKm, setRemainingKm] = useState(6.8);
  const [remainingMins, setRemainingMins] = useState(18);

  // In-trip Edge Cases states (Image 2)
  const [showRouteDeviation, setShowRouteDeviation] = useState(false);
  const [showStaleGps, setShowStaleGps] = useState(false);
  const [showStoppedAlert, setShowStoppedAlert] = useState(false);
  const [showEditDestModal, setShowEditDestModal] = useState(false);
  const [newDestInput, setNewDestInput] = useState('');
  const [revisedFare, setRevisedFare] = useState(null);
  const [showSafetySheet, setShowSafetySheet] = useState(false);

  const captain = activeBooking?.captain || {
    name: 'Vikram Sharma',
    rating: 4.89,
    phone: '+91 98765 43210',
    vehicleName: 'Honda Activa 6G (DL 01 AB 3492)',
  };

  // Simulated ride progression timer
  useEffect(() => {
    const tripInterval = setInterval(() => {
      setRemainingKm((prev) => {
        if (prev <= 0.8) {
          clearInterval(tripInterval);
          return 0.2;
        }
        return Math.round((prev - 0.6) * 10) / 10;
      });
      setRemainingMins((prev) => (prev > 2 ? prev - 2 : 1));
    }, 4500);

    return () => clearInterval(tripInterval);
  }, []);

  const handleApplyEditDestination = () => {
    if (!newDestInput.trim()) return;
    const updatedDest = {
      ...destination,
      address: newDestInput,
      shortName: newDestInput.split(',')[0],
      coords: { x: 85, y: 72 },
    };
    setDestination(updatedDest);
    updateRouteCalculation(pickup, updatedDest);
    setRevisedFare((activeBooking?.finalFare || 78) + 25);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View style={styles.livePulseDot} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.headerTitle}>Trip In Progress</Text>
            <Text style={styles.headerSub}>
              {remainingKm > 0.5
                ? `Dropping at ${destination.shortName || 'Destination'}`
                : 'Approaching Destination!'}
            </Text>
          </View>

          {/* Emergency SOS Button (Image 2) */}
          <TouchableOpacity
            style={styles.sosTopBtn}
            onPress={() => setShowSafetySheet(true)}
          >
            <Ionicons name="alert-circle" size={16} color="#FFFFFF" />
            <Text style={styles.sosTopBtnText}>SOS 112</Text>
          </TouchableOpacity>
        </View>

        {/* Live Vector Map showing route and moving position */}
        <View style={styles.mapBox}>
          <InteractiveMap
            pickupCoords={pickup.coords}
            destCoords={destination.coords}
            showDestination={true}
            showRoute={true}
            captainApproaching={true}
            style={{ height: 260 }}
          />

          {/* Stale GPS & Reconnect Indicator */}
          {showStaleGps && (
            <View style={styles.staleGpsOverlay}>
              <Ionicons name="cloud-offline" size={14} color="#FFFFFF" />
              <Text style={styles.staleGpsText}>Weak GPS • Reconnecting...</Text>
            </View>
          )}

          {/* Route Deviation Banner (Image 2 edge case) */}
          {showRouteDeviation && (
            <View style={styles.deviationBanner}>
              <Ionicons name="navigate-circle" size={18} color="#D97706" />
              <View style={{ flex: 1 }}>
                <Text style={styles.deviationTitle}>Route Deviation Detected</Text>
                <Text style={styles.deviationSub}>Captain took alternate faster flyover route.</Text>
              </View>
              <TouchableOpacity onPress={() => setShowRouteDeviation(false)}>
                <Ionicons name="close" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ScrollView style={styles.scrollBody} contentContainerStyle={{ padding: SPACING.lg }}>
          {/* Live Progress Card (ETA & Remaining Distance) */}
          <View style={styles.progressCard}>
            <View style={styles.progressMetricRow}>
              <View style={styles.metricCol}>
                <Text style={styles.metricLabel}>ESTIMATED TIME</Text>
                <Text style={styles.metricBig}>{remainingMins} mins</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricCol}>
                <Text style={styles.metricLabel}>DISTANCE LEFT</Text>
                <Text style={styles.metricBig}>{remainingKm} km</Text>
              </View>
            </View>

            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(100, Math.max(15, ((7.4 - remainingKm) / 7.4) * 100))}%` },
                ]}
              />
            </View>
          </View>

          {/* Captain Strip */}
          <View style={styles.captainStrip}>
            <View style={styles.captainAvatar}>
              <Text style={styles.captainAvatarText}>VS</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.captainName}>{captain.name}</Text>
              <Text style={styles.captainVeh}>{captain.vehicleName}</Text>
            </View>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={() => Linking.openURL(`tel:${captain.phone}`)}
            >
              <Ionicons name="call" size={18} color="#047857" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundIconBtn, { backgroundColor: '#F1F5F9' }]}
              onPress={() => alert('Live location share link copied.')}
            >
              <Ionicons name="share-social" size={18} color="#1E293B" />
            </TouchableOpacity>
          </View>

          {/* Destination & Edit Destination Option (Image 2) */}
          <View style={styles.destSummaryCard}>
            <View style={styles.destHeaderRow}>
              <View style={styles.redDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.destLabel}>DROPOFF DESTINATION</Text>
                <Text style={styles.destAddress} numberOfLines={2}>
                  {destination.address}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editDestBtn}
                onPress={() => setShowEditDestModal(true)}
              >
                <Ionicons name="create-outline" size={16} color="#D97706" />
                <Text style={styles.editDestText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* In-Trip Edge Cases Simulation Buttons (Image 2) */}
          <View style={styles.testSimBox}>
            <Text style={styles.testSimHead}>Test In-Trip Edge Cases:</Text>
            <View style={styles.testSimButtons}>
              <TouchableOpacity
                style={styles.simChip}
                onPress={() => setShowRouteDeviation(!showRouteDeviation)}
              >
                <Text style={styles.simChipText}>Toggle Deviation Alert</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.simChip}
                onPress={() => setShowStaleGps(!showStaleGps)}
              >
                <Text style={styles.simChipText}>Toggle Stale GPS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.simChip}
                onPress={() => setShowStoppedAlert(true)}
              >
                <Text style={styles.simChipText}>Simulate 3m Stop</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Arrive at Destination Button (Completes Trip -> Step 9) */}
          <Button
            title="Arrived at Destination (Complete Trip)"
            onPress={completeTrip}
            size="lg"
            rightIcon={<Ionicons name="checkmark-done" size={20} color="#1E293B" />}
            style={{ marginTop: SPACING.lg }}
          />
        </ScrollView>

        {/* Change Destination Modal (Step 8 Edge Case) */}
        <Modal visible={showEditDestModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalTopRow}>
                <Text style={styles.modalTitle}>Change Drop Destination</Text>
                <TouchableOpacity onPress={() => setShowEditDestModal(false)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSub}>
                Enter new address. Fares and distance will recalculate automatically with your consent.
              </Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Enter new destination address..."
                value={newDestInput}
                onChangeText={setNewDestInput}
              />

              {revisedFare && (
                <View style={styles.revisedFareBox}>
                  <Text style={styles.revisedFareTitle}>Revised Quoted Fare: ₹{revisedFare}</Text>
                  <Text style={styles.revisedFareSub}>+₹25 difference due to extra 2.1 km</Text>
                </View>
              )}

              <Button
                title={revisedFare ? 'Confirm & Apply Destination' : 'Calculate Revised Fare'}
                onPress={() => {
                  if (!revisedFare) {
                    handleApplyEditDestination();
                  } else {
                    setShowEditDestModal(false);
                    setRevisedFare(null);
                  }
                }}
                size="md"
                style={{ width: '100%', marginTop: SPACING.md }}
              />
            </View>
          </View>
        </Modal>

        {/* Vehicle Stopped Check Alert */}
        <Modal visible={showStoppedAlert} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Ionicons name="alert-circle" size={42} color={COLORS.warning} />
              <Text style={[styles.modalTitle, { marginTop: 10 }]}>Are you safe?</Text>
              <Text style={[styles.modalSub, { textAlign: 'center' }]}>
                We detected that your vehicle has been stationary for over 3 minutes.
              </Text>

              <Button
                title="I Am Safe (Normal Traffic / Signal)"
                onPress={() => setShowStoppedAlert(false)}
                size="md"
                style={{ width: '100%', marginBottom: 8 }}
              />
              <Button
                title="Need Help / Emergency"
                variant="danger"
                onPress={() => {
                  setShowStoppedAlert(false);
                  setShowSafetySheet(true);
                }}
                size="md"
                style={{ width: '100%' }}
              />
            </View>
          </View>
        </Modal>

        {/* SOS Emergency Modal */}
        <Modal visible={showSafetySheet} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalTopRow}>
                <Text style={[styles.modalTitle, { color: COLORS.danger }]}>Emergency SOS (112)</Text>
                <TouchableOpacity onPress={() => setShowSafetySheet(false)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSub}>
                Instant police emergency contact and Bykse 24x7 Safety Response unit.
              </Text>

              <TouchableOpacity
                style={styles.sosBigBtn}
                onPress={() => Linking.openURL('tel:112')}
              >
                <Ionicons name="call" size={24} color="#FFFFFF" />
                <Text style={styles.sosBigBtnText}>DIAL 112 (POLICE)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sosBigBtn, { backgroundColor: '#10B981', marginTop: 10 }]}
                onPress={() => {
                  setShowSafetySheet(false);
                  setCurrentScreen('SAFETY_HUB');
                }}
              >
                <Ionicons name="shield-checkmark" size={22} color="#FFFFFF" />
                <Text style={styles.sosBigBtnText}>OPEN SAFETY & SHARE HUB</Text>
              </TouchableOpacity>

              <Button
                title="Close"
                variant="outline"
                onPress={() => setShowSafetySheet(false)}
                size="md"
                style={{ width: '100%', marginTop: SPACING.md }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  livePulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sosTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 4,
  },
  sosTopBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  mapBox: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  staleGpsOverlay: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    gap: 6,
  },
  staleGpsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  deviationBanner: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#FDE68A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...SHADOWS.md,
  },
  deviationTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
  },
  deviationSub: {
    fontSize: 10,
    color: '#B45309',
  },
  scrollBody: {
    flex: 1,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  progressMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  metricBig: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.border,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  captainStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    gap: 12,
  },
  captainAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captainAvatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  captainName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  captainVeh: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  roundIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.successLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  destHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  redDot: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.danger,
    borderRadius: 2,
  },
  destLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  destAddress: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  editDestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  editDestText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  testSimBox: {
    backgroundColor: '#F8FAFC',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  testSimHead: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  testSimButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  simChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  simChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.sm,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  modalSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  revisedFareBox: {
    width: '100%',
    backgroundColor: '#FFFBEB',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },
  revisedFareTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#92400E',
  },
  revisedFareSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  sosBigBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.danger,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    gap: 8,
    marginTop: SPACING.md,
  },
  sosBigBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});
