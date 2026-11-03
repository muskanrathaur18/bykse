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

export const RideCompletionScreen = () => {
  const {
    setCurrentScreen,
    activeBooking,
    processFarePayment,
    walletBalance,
  } = useApp();

  const [paymentMode, setPaymentMode] = useState(
    activeBooking?.paymentMethod || 'cash'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  const finalFare = activeBooking?.finalFare || 78;
  const bookingId = activeBooking?.bookingId || '#BYK-84920';

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      processFarePayment(paymentMode);
    }, 1200);
  };

  const handleProceedToRating = () => {
    setCurrentScreen('RATING');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark-done" size={32} color="#10B981" />
          </View>
          <Text style={styles.headerTitle}>Destination Reached!</Text>
          <Text style={styles.headerSub}>Booking ID: {bookingId}</Text>
        </View>

        <ScrollView style={styles.scrollBody} contentContainerStyle={{ padding: SPACING.lg }}>
          {/* Final Payable Amount Card */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>TOTAL FINAL AMOUNT</Text>
            <Text style={styles.amountValue}>₹{finalFare}.00</Text>
            <View style={styles.paidBadge}>
              <Text style={styles.paidBadgeText}>
                {paymentSuccess ? '✓ Payment Confirmed' : 'Payment Pending'}
              </Text>
            </View>
          </View>

          {/* Itemized Fare Breakdown (Step 9) */}
          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Fare Breakdown</Text>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Base Ride Fare</Text>
              <Text style={styles.fareVal}>₹{finalFare - 10}</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Distance Traveled (7.4 km)</Text>
              <Text style={styles.fareVal}>Included</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>GST & Platform Access Fee (5%)</Text>
              <Text style={styles.fareVal}>₹6.00</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Tolls & Surcharges</Text>
              <Text style={styles.fareVal}>₹4.00</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.fareRow}>
              <Text style={styles.totalLabel}>Total Quoted Amount</Text>
              <Text style={styles.totalVal}>₹{finalFare}.00</Text>
            </View>

            {/* Fare dispute link */}
            <TouchableOpacity
              style={styles.disputeLink}
              onPress={() => setShowDisputeModal(true)}
            >
              <Ionicons name="help-circle-outline" size={14} color="#D97706" />
              <Text style={styles.disputeLinkText}>Have a question about this fare?</Text>
            </TouchableOpacity>
          </View>

          {/* Payment Method Selector (Step 9) */}
          {!paymentSuccess && (
            <View style={styles.paymentMethodsCard}>
              <Text style={styles.breakdownTitle}>Select Payment Method</Text>

              <TouchableOpacity
                style={[styles.payOption, paymentMode === 'cash' && styles.payOptionActive]}
                onPress={() => setPaymentMode('cash')}
              >
                <Ionicons name="cash-outline" size={20} color="#10B981" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.payTitle}>Pay Cash to Captain</Text>
                  <Text style={styles.paySub}>Pay ₹{finalFare} directly after trip</Text>
                </View>
                {paymentMode === 'cash' && (
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.primaryDark} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.payOption, paymentMode === 'wallet' && styles.payOptionActive]}
                onPress={() => setPaymentMode('wallet')}
              >
                <Ionicons name="wallet-outline" size={20} color="#D97706" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.payTitle}>Bykse Wallet</Text>
                  <Text style={styles.paySub}>Available balance: ₹{walletBalance}</Text>
                </View>
                {paymentMode === 'wallet' && (
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.primaryDark} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.payOption, paymentMode === 'upi' && styles.payOptionActive]}
                onPress={() => setPaymentMode('upi')}
              >
                <Ionicons name="flash-outline" size={20} color="#3B82F6" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.payTitle}>UPI / GPay / PhonePe</Text>
                  <Text style={styles.paySub}>Instant bank transfer</Text>
                </View>
                {paymentMode === 'upi' && (
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.primaryDark} />
                )}
              </TouchableOpacity>

              <Button
                title={paymentMode === 'cash' ? 'Confirm Cash Payment Received' : `Pay ₹${finalFare} Now`}
                onPress={handlePay}
                loading={isProcessing}
                size="lg"
                style={{ marginTop: SPACING.md }}
              />
            </View>
          )}

          {/* Payment Done -> Proceed to Rating Button */}
          {paymentSuccess && (
            <View style={styles.successBox}>
              <Text style={styles.successDesc}>
                Payment received! Digital receipt saved to your Ride History.
              </Text>
              <Button
                title="Rate Captain & Finish"
                onPress={handleProceedToRating}
                size="lg"
                rightIcon={<Ionicons name="star" size={18} color="#1E293B" />}
                style={{ width: '100%', marginTop: SPACING.md }}
              />
            </View>
          )}
        </ScrollView>

        {/* Fare Dispute Modal */}
        <Modal visible={showDisputeModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Fare Dispute</Text>
              <Text style={styles.modalSub}>
                If you were charged extra for waiting time, route detour or cash mismatch, our support team will review and refund the difference to your Bykse Wallet.
              </Text>
              <Button
                title="Open Support Ticket"
                onPress={() => {
                  setShowDisputeModal(false);
                  setCurrentScreen('HELP_CENTER');
                }}
                size="md"
                style={{ width: '100%', marginBottom: 8 }}
              />
              <Button
                title="Close"
                variant="outline"
                onPress={() => setShowDisputeModal(false)}
                size="md"
                style={{ width: '100%' }}
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
  topHeader: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scrollBody: {
    flex: 1,
  },
  amountCard: {
    backgroundColor: '#FFFDF5',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#1E293B',
    marginVertical: 4,
  },
  paidBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  paidBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  fareLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  fareVal: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#D97706',
  },
  disputeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.md,
    alignSelf: 'center',
  },
  disputeLinkText: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '700',
  },
  paymentMethodsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  payOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 8,
    gap: 12,
  },
  payOptionActive: {
    borderColor: COLORS.primaryDark,
    backgroundColor: '#FFFDF5',
  },
  payTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  paySub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  successBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  successDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
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
    maxWidth: 380,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginBottom: SPACING.md,
  },
});
