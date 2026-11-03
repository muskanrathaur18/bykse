import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Modal,
  Linking,
  Dimensions,
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

export const CaptainPickupScreen = () => {
  const {
    setCurrentScreen,
    activeBooking,
    updateBookingState,
    verifyTripPin,
    pickup,
    destination,
  } = useApp();

  // Status: 'APPROACHING' | 'ARRIVED'
  const [pickupStatus, setPickupStatus] = useState(
    activeBooking?.status === 'CAPTAIN_ARRIVED' ? 'ARRIVED' : 'APPROACHING'
  );
  const [etaMins, setEtaMins] = useState(2);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showVehicleVerifyGuide, setShowVehicleVerifyGuide] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'captain', text: 'Namaste! I am on my way to your pickup location.' },
  ]);

  const captain = activeBooking?.captain || {
    name: 'Vikram Sharma',
    rating: 4.89,
    tripsCount: 1420,
    phone: '+91 98765 43210',
    vehicleName: 'Honda Activa 6G (Yellow/Black)',
    plateNumber: 'DL 01 AB 3492',
    otp: '4821',
  };

  // Simulate Captain Arriving countdown
  useEffect(() => {
    let timer = null;
    if (pickupStatus === 'APPROACHING') {
      timer = setInterval(() => {
        setEtaMins((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPickupStatus('ARRIVED');
            updateBookingState({ status: 'CAPTAIN_ARRIVED' });
            return 0;
          }
          return prev - 1;
        });
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [pickupStatus]);

  // Handle PIN submission to start trip (Step 7 requirement 5, 6, 7)
  const handleStartRide = () => {
    if (!pinInput || pinInput.length < 4) {
      setPinError('Please enter the complete 4-digit PIN');
      return;
    }

    const success = verifyTripPin(pinInput);
    if (!success) {
      setPinError(`Incorrect PIN (${pinInput}). Share PIN ${captain.otp} with captain.`);
    } else {
      setPinError('');
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: chatInput },
    ]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'captain', text: 'Ok, see you in 1 minute!' },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setCurrentScreen('HOME')}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.headerTitle}>
              {pickupStatus === 'ARRIVED' ? 'Captain Has Arrived' : 'Captain is Approaching'}
            </Text>
            <Text style={styles.headerSub}>
              {pickupStatus === 'ARRIVED' ? 'Waiting at pickup spot' : `Arriving in ~${etaMins} mins`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.safetyActionBtn}
            onPress={() => setCurrentScreen('SAFETY_HUB')}
          >
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Live Vector Map */}
        <View style={styles.mapBox}>
          <InteractiveMap
            pickupCoords={pickup.coords}
            destCoords={destination.coords}
            showDestination={true}
            showRoute={true}
            captainApproaching={pickupStatus === 'APPROACHING'}
            style={{ height: 230 }}
          />

          {/* Quick Pickup Label Pin Tag */}
          <View style={styles.pickupFloatingBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.pickupFloatingText} numberOfLines={1}>
              {pickup.shortName || pickup.address}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.scrollBody} contentContainerStyle={{ padding: SPACING.lg }}>
          {/* Status Alert Banner */}
          <View
            style={[
              styles.statusBanner,
              pickupStatus === 'ARRIVED'
                ? { backgroundColor: COLORS.successLight, borderColor: '#A7F3D0' }
                : { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
            ]}
          >
            <Ionicons
              name={pickupStatus === 'ARRIVED' ? 'checkmark-circle' : 'time'}
              size={22}
              color={pickupStatus === 'ARRIVED' ? '#047857' : '#B45309'}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.statusBannerTitle,
                  pickupStatus === 'ARRIVED' ? { color: '#047857' } : { color: '#92400E' },
                ]}
              >
                {pickupStatus === 'ARRIVED'
                  ? 'Captain Arrived at Pickup!'
                  : `Captain Arriving in ${etaMins} mins`}
              </Text>
              <Text style={styles.statusBannerSub}>
                {pickupStatus === 'ARRIVED'
                  ? 'Verify vehicle license plate and share your OTP below to begin ride.'
                  : 'Captain is navigating towards Saujanya Block, NGV.'}
              </Text>
            </View>
          </View>

          {/* Captain & Vehicle Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>VS</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.captainName}>{captain.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>
                    {captain.rating} • {captain.tripsCount} rides completed
                  </Text>
                </View>
                <Text style={styles.vehicleName}>{captain.vehicleName}</Text>
              </View>

              {/* Vehicle Number Plate */}
              <View style={styles.plateCard}>
                <Text style={styles.plateInd}>IND</Text>
                <Text style={styles.plateNo}>{captain.plateNumber}</Text>
              </View>
            </View>

            {/* Quick Vehicle Verification Guide button (Step 7 requirement 3) */}
            <TouchableOpacity
              style={styles.verifyGuideBtn}
              onPress={() => setShowVehicleVerifyGuide(true)}
            >
              <Ionicons name="information-circle-outline" size={16} color="#D97706" />
              <Text style={styles.verifyGuideText}>Vehicle & Safety Verification Checklist</Text>
            </TouchableOpacity>

            {/* Action Buttons: Call & In-App Chat */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Linking.openURL(`tel:${captain.phone}`)}
              >
                <Ionicons name="call" size={18} color="#047857" />
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => setShowChatModal(true)}
              >
                <Ionicons name="chatbubble-ellipses" size={18} color="#1E293B" />
                <Text style={styles.chatButtonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP / PIN Verification Card to Start Ride (Step 7 requirement 5, 6, 7) */}
          <View style={styles.startOtpCard}>
            <View style={styles.otpHeaderRow}>
              <View>
                <Text style={styles.otpCardLabel}>YOUR TRIP START PIN</Text>
                <Text style={styles.otpCardSub}>Share this 4-digit code with Captain to begin trip</Text>
              </View>
              <View style={styles.bigOtpBadge}>
                <Text style={styles.bigOtpText}>{captain.otp}</Text>
              </View>
            </View>

            {/* Simulated Driver PIN Entry Test */}
            <View style={styles.pinVerifySection}>
              <Text style={styles.pinVerifyInstruction}>
                Driver PIN Entry Verification Simulation:
              </Text>
              <View style={styles.pinInputRow}>
                <TextInput
                  style={[styles.pinTextInput, pinError ? { borderColor: COLORS.danger } : null]}
                  placeholder={`Enter ${captain.otp} to verify`}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={pinInput}
                  onChangeText={(val) => {
                    setPinInput(val);
                    setPinError('');
                  }}
                />
                <Button
                  title="Verify & Start Ride"
                  onPress={handleStartRide}
                  size="md"
                  style={{ minHeight: 46 }}
                />
              </View>
              {pinError ? <Text style={styles.pinErrorText}>{pinError}</Text> : null}
            </View>
          </View>

          {/* Pickup Address & Customer Notes */}
          <View style={styles.pickupDetailsCard}>
            <Text style={styles.detailsCardLabel}>PICKUP LOCATION</Text>
            <Text style={styles.detailsAddressText}>{pickup.address}</Text>
            {pickup.landmark && (
              <View style={styles.instructionBadge}>
                <Ionicons name="flag" size={14} color="#D97706" />
                <Text style={styles.instructionText}>Note: {pickup.landmark}</Text>
              </View>
            )}
          </View>

          {/* Cancel Ride Action */}
          <TouchableOpacity
            style={styles.cancelRideLink}
            onPress={() => setCurrentScreen('CANCELLATION')}
          >
            <Ionicons name="close-circle-outline" size={18} color={COLORS.danger} />
            <Text style={styles.cancelRideLinkText}>Cancel Ride (Free within 3 mins)</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Vehicle Verification Checklist Modal */}
        <Modal visible={showVehicleVerifyGuide} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalTopRow}>
                <Text style={styles.modalTitle}>Safety & Vehicle Verification</Text>
                <TouchableOpacity onPress={() => setShowVehicleVerifyGuide(false)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSub}>
                Before boarding, always perform these 3 mandatory checks:
              </Text>

              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={22} color="#10B981" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>Number Plate Matches</Text>
                  <Text style={styles.checkDesc}>Vehicle plate must be DL 01 AB 3492.</Text>
                </View>
              </View>

              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={22} color="#10B981" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>Captain Identity</Text>
                  <Text style={styles.checkDesc}>Driver name Vikram Sharma wearing yellow helmet.</Text>
                </View>
              </View>

              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={22} color="#10B981" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>Never Ride Without Helmet</Text>
                  <Text style={styles.checkDesc}>Sanitized helmet provided by captain.</Text>
                </View>
              </View>

              <Button
                title="Understood"
                onPress={() => setShowVehicleVerifyGuide(false)}
                size="md"
                style={{ width: '100%', marginTop: SPACING.md }}
              />
            </View>
          </View>
        </Modal>

        {/* Chat Modal */}
        <Modal visible={showChatModal} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={styles.chatTopBar}>
              <TouchableOpacity onPress={() => setShowChatModal(false)}>
                <Ionicons name="arrow-back" size={24} color={COLORS.text} />
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.chatTitle}>Captain Vikram Sharma</Text>
                <Text style={styles.chatSub}>{captain.plateNumber}</Text>
              </View>
            </View>

            <ScrollView style={styles.chatContent} contentContainerStyle={{ padding: SPACING.md }}>
              {chatMessages.map((m) => (
                <View
                  key={m.id}
                  style={[
                    styles.chatBubble,
                    m.sender === 'user' ? styles.bubbleUser : styles.bubbleCaptain,
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      m.sender === 'user' ? { color: '#FFFFFF' } : { color: COLORS.text },
                    ]}
                  >
                    {m.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Message Captain..."
                value={chatInput}
                onChangeText={setChatInput}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
                <Ionicons name="send" size={18} color="#1E293B" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
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
  safetyActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.successLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBox: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pickupFloatingBadge: {
    position: 'absolute',
    top: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 6,
    ...SHADOWS.sm,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  pickupFloatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  scrollBody: {
    flex: 1,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    gap: 12,
    marginBottom: SPACING.md,
  },
  statusBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  statusBannerSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  captainName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  vehicleName: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  plateCard: {
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  plateInd: {
    fontSize: 8,
    fontWeight: '900',
    color: '#3B82F6',
  },
  plateNo: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1E293B',
  },
  verifyGuideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 8,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
    gap: 6,
  },
  verifyGuideText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: SPACING.md,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.successLight,
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 6,
  },
  callButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  chatButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  startOtpCard: {
    backgroundColor: '#FFFDF5',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  otpCardLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  otpCardSub: {
    fontSize: 11,
    color: '#78350F',
    marginTop: 2,
  },
  bigOtpBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: '#D97706',
  },
  bigOtpText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 3,
  },
  pinVerifySection: {
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
    paddingTop: SPACING.md,
  },
  pinVerifyInstruction: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 6,
  },
  pinInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pinTextInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  pinErrorText: {
    fontSize: 11,
    color: COLORS.danger,
    fontWeight: '700',
    marginTop: 4,
  },
  pickupDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  detailsCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  detailsAddressText: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 16,
  },
  instructionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    backgroundColor: '#FEF3C7',
    padding: 6,
    borderRadius: RADIUS.sm,
  },
  instructionText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '600',
  },
  cancelRideLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  cancelRideLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.danger,
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
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: SPACING.md,
  },
  checkTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  checkDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  chatTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chatTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  chatSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  chatContent: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatBubble: {
    padding: 12,
    borderRadius: RADIUS.lg,
    maxWidth: '80%',
    marginBottom: 8,
  },
  bubbleCaptain: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E293B',
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 18,
  },
  chatInputRow: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
    gap: 8,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
