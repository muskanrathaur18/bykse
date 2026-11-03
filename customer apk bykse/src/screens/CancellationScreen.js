import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Button } from '../components/common/Button';

export const CancellationScreen = () => {
  const { setCurrentScreen, activeBooking, cancelActiveBooking } = useApp();

  const [selectedReason, setSelectedReason] = useState('Captain bahut late hai');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [cancellationConfirmed, setCancellationConfirmed] = useState(false);

  // Cancellation reasons from Image 3
  const reasonsList = [
    'Captain bahut late hai',
    'Captain pickup location nahi mil raha',
    'Customer ne galat pickup select kiya',
    'Customer ne galat destination select kiya',
    'Ab ride ki zarurat nahi hai',
    'Payment/fare issue',
    'Captain ne cancel karne ko kaha',
    'Vehicle/registration details mismatch',
    'Safety concern',
    'Other reason',
  ];

  // Fee calculation rule: If booking was within 3 mins, fee = 0
  const isFeeApplicable = false; // within policy window
  const cancellationFee = isFeeApplicable ? 25 : 0;

  const handleConfirmCancel = () => {
    setCancellationConfirmed(true);
    cancelActiveBooking(selectedReason, cancellationFee);
  };

  const handleRebook = () => {
    setCurrentScreen('LOCATION_SEARCH');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setCurrentScreen('BOOKING_STATUS')}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cancel Ride</Text>
          <View style={{ width: 36 }} />
        </View>

        {!cancellationConfirmed ? (
          <ScrollView style={styles.scrollBody} contentContainerStyle={{ padding: SPACING.lg }}>
            {/* Policy & Fee Banner */}
            <View style={styles.feeBanner}>
              <View style={styles.feeIconCircle}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.feeTitle}>
                  Cancellation Fee: ₹{cancellationFee} (Free Cancellation)
                </Text>
                <Text style={styles.feeSub}>
                  No penalty charged since cancellation is within the free 3-minute grace window.
                </Text>
              </View>
            </View>

            <Text style={styles.sectionHeader}>Please select a cancellation reason:</Text>

            {/* Reasons Radio List */}
            <View style={styles.reasonsCard}>
              {reasonsList.map((reason, index) => {
                const isSelected = selectedReason === reason;
                return (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reasonItem,
                      index < reasonsList.length - 1 && styles.reasonItemBorder,
                      isSelected && styles.reasonItemActive,
                    ]}
                    onPress={() => setSelectedReason(reason)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={isSelected ? '#D97706' : COLORS.textMuted}
                    />
                    <Text style={[styles.reasonText, isSelected && styles.reasonTextActive]}>
                      {reason}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Fee dispute link */}
            <TouchableOpacity
              style={styles.disputeLink}
              onPress={() => setShowDisputeModal(true)}
            >
              <Ionicons name="help-circle-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.disputeLinkText}>Questions regarding cancellation fee policy?</Text>
            </TouchableOpacity>

            {/* Action Button */}
            <Button
              title="Confirm Cancellation"
              variant="danger"
              onPress={handleConfirmCancel}
              size="lg"
              style={{ marginTop: SPACING.md }}
            />
          </ScrollView>
        ) : (
          /* Cancellation Success Screen */
          <View style={styles.successContainer}>
            <View style={styles.cancelDoneCircle}>
              <Ionicons name="checkmark-circle" size={54} color="#10B981" />
            </View>
            <Text style={styles.cancelledTitle}>Ride Successfully Cancelled</Text>
            <Text style={styles.cancelledSub}>
              Reason: {selectedReason}. Zero cancellation fees deducted.
            </Text>

            <Button
              title="Book Another Ride"
              onPress={handleRebook}
              size="lg"
              style={{ width: '80%', marginTop: SPACING.xl }}
            />

            <Button
              title="Back to Home"
              variant="outline"
              onPress={() => setCurrentScreen('HOME')}
              size="md"
              style={{ width: '80%', marginTop: SPACING.sm }}
            />
          </View>
        )}

        {/* Fee Policy Modal */}
        <Modal visible={showDisputeModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Cancellation Policy</Text>
              <Text style={styles.modalSub}>
                1. Free cancellation within 3 minutes of booking request.
                {'\n'}2. If driver is delayed beyond ETA, cancellation is 100% free at any point.
                {'\n'}3. Any wrongful fee deduction can be disputed for instant wallet credit.
              </Text>
              <Button
                title="Got It"
                onPress={() => setShowDisputeModal(false)}
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
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  scrollBody: {
    flex: 1,
  },
  feeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: SPACING.md,
    gap: 12,
  },
  feeIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#065F46',
  },
  feeSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  reasonsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    gap: 12,
  },
  reasonItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  reasonItemActive: {
    backgroundColor: '#FFFDF5',
  },
  reasonText: {
    fontSize: 13,
    color: COLORS.text,
    flex: 1,
  },
  reasonTextActive: {
    fontWeight: '700',
    color: '#92400E',
  },
  disputeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: SPACING.md,
  },
  disputeLinkText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  cancelDoneCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cancelledTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  cancelledSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
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
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
