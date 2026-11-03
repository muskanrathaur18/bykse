import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/common/Button';

export const AuthScreen = () => {
  const { setCurrentScreen, loginUser } = useApp();

  // Screen Sub-step: 'PHONE' | 'OTP' | 'PROFILE'
  const [authStep, setAuthStep] = useState('PHONE');

  // Phone input states
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // OTP states
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // New user profile state
  const [isNewUser, setIsNewUser] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Modals
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState('terms'); // 'terms' | 'privacy'
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  // Input refs for OTP auto-focus
  const otpInputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (authStep === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [authStep, timer]);

  // Handle Send OTP
  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Check blocked account edge case
    if (phoneNumber === '0000000000') {
      setShowBlockedModal(true);
      return;
    }

    setPhoneError('');
    setIsSendingOtp(true);

    setTimeout(() => {
      setIsSendingOtp(false);
      setAuthStep('OTP');
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '']);
      setOtpError('');
    }, 800);
  };

  // Handle OTP digit entry
  const handleOtpChange = (val, index) => {
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);
    setOtpError('');

    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = () => {
    const entered = otp.join('');
    if (entered.length < 4) {
      setOtpError('Please enter the complete 4-digit OTP');
      return;
    }

    setIsVerifying(true);
    setOtpError('');

    setTimeout(() => {
      setIsVerifying(false);

      // Edge case: Test invalid OTP if user entered 0000
      if (entered === '0000') {
        const remaining = attemptsLeft - 1;
        setAttemptsLeft(remaining);
        if (remaining <= 0) {
          setOtpError('Maximum retry limit reached. Please wait 5 minutes.');
        } else {
          setOtpError(`Incorrect OTP. ${remaining} attempt(s) remaining.`);
        }
        return;
      }

      // Login user and navigate directly to Home page
      loginUser(phoneNumber, '');
      setCurrentScreen('HOME');
    }, 600);
  };

  // Complete profile for new user
  const handleCompleteProfile = () => {
    const name = fullName.trim() || 'New User';
    loginUser(phoneNumber, name, email);
    setCurrentScreen('HOME');
  };

  const handleResend = (channel = 'SMS') => {
    setCanResend(false);
    setTimer(30);
    setOtp(['', '', '', '']);
    setOtpError('');
    // Simulated resend toast
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerCardWrapper}>
            {/* STEP 1: Phone Number Card */}
            {authStep === 'PHONE' && (
              <View style={styles.card}>
                <Text style={styles.formTitle}>Login</Text>

                <Text style={styles.fieldLabel}>Mobile Number</Text>
                <View style={styles.phoneInputRow}>
                  <View style={styles.countryPicker}>
                    <Text style={styles.countryFlag}>🇮🇳</Text>
                    <Text style={styles.countryText}>{countryCode}</Text>
                  </View>

                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={(val) => {
                      setPhoneNumber(val.replace(/[^0-9]/g, ''));
                      setPhoneError('');
                    }}
                  />
                </View>

                {phoneError ? (
                  <Text style={styles.errorText}>{phoneError}</Text>
                ) : null}


                <Button
                  title="Continue"
                  onPress={handleSendOtp}
                  loading={isSendingOtp}
                  size="lg"
                  style={{ marginTop: SPACING.xl, width: '100%' }}
                />

                {/* Terms and Privacy policy */}
                <View style={styles.legalLinksRow}>
                  <Text style={styles.legalText}>By proceeding, you agree to our </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setPolicyType('terms');
                      setShowPolicyModal(true);
                    }}
                  >
                    <Text style={styles.legalLink}>Terms</Text>
                  </TouchableOpacity>
                  <Text style={styles.legalText}> & </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setPolicyType('privacy');
                      setShowPolicyModal(true);
                    }}
                  >
                    <Text style={styles.legalLink}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* STEP 2: OTP Verification Card */}
            {authStep === 'OTP' && (
              <View style={styles.card}>
                <View style={styles.changeNumberRow}>
                  <TouchableOpacity
                    style={styles.editNumberBtn}
                    onPress={() => setAuthStep('PHONE')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="arrow-back" size={16} color="#0F172A" />
                    <Text style={styles.editNumberText}>Change Number</Text>
                  </TouchableOpacity>
                  <Text style={styles.sentToText}>+91 {phoneNumber}</Text>
                </View>

                <Text style={styles.formTitle}>Verify OTP</Text>
                <Text style={styles.formSub}>Enter the 4-digit code sent to your number</Text>

                {/* 4 Digit Boxes */}
                <View style={styles.otpBoxesRow}>
                  {[0, 1, 2, 3].map((index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (otpInputRefs.current[index] = ref)}
                      style={[
                        styles.otpBox,
                        otp[index] ? styles.otpBoxFilled : null,
                        otpError ? styles.otpBoxError : null,
                      ]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={otp[index]}
                      onChangeText={(val) => handleOtpChange(val, index)}
                    />
                  ))}
                </View>

                {otpError ? (
                  <View style={styles.errorBanner}>
                    <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                    <Text style={styles.errorText}>{otpError}</Text>
                  </View>
                ) : null}

                {/* Resend & Timer */}
                <View style={styles.resendSection}>
                  {!canResend ? (
                    <Text style={styles.timerText}>
                      Resend OTP in <Text style={styles.timerCount}>{timer}s</Text>
                    </Text>
                  ) : (
                    <View style={styles.resendActionsRow}>
                      <TouchableOpacity
                        style={styles.resendBtn}
                        onPress={() => handleResend('SMS')}
                      >
                        <Ionicons name="chatbubble-outline" size={14} color="#1E293B" />
                        <Text style={styles.resendBtnText}>Resend via SMS</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.resendBtn, { borderColor: '#10B981' }]}
                        onPress={() => handleResend('WhatsApp')}
                      >
                        <FontAwesome5 name="whatsapp" size={14} color="#10B981" />
                        <Text style={[styles.resendBtnText, { color: '#047857' }]}>
                          Send OTP via WhatsApp
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <Button
                  title="Verify & Login"
                  onPress={handleVerifyOtp}
                  loading={isVerifying}
                  size="lg"
                  style={{ marginTop: SPACING.xl, width: '100%' }}
                />
              </View>
            )}

            {/* STEP 3: Profile Details for New User */}
            {authStep === 'PROFILE' && (
              <View style={styles.card}>
                <Text style={styles.fieldLabel}>Your Full Name *</Text>
                <TextInput
                  style={styles.textInputField}
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <Text style={[styles.fieldLabel, { marginTop: SPACING.md }]}>
                  Email Address (Optional)
                </Text>
                <TextInput
                  style={styles.textInputField}
                  placeholder="e.g. rahul@example.com"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <Button
                  title="Get Started"
                  onPress={handleCompleteProfile}
                  size="lg"
                  style={{ marginTop: SPACING.xl, width: '100%' }}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Legal Terms Modal */}
        <Modal visible={showPolicyModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.policyModalCard}>
              <View style={styles.policyHeader}>
                <Text style={styles.policyTitle}>
                  {policyType === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </Text>
                <TouchableOpacity onPress={() => setShowPolicyModal(false)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.policyBody}>
                <Text style={styles.policyParagraph}>
                  Welcome to Bykse. By using our bike taxi, auto, and cab booking service, you agree to comply with our ride policies, pricing rules, and safety guidelines.
                </Text>
                <Text style={styles.policyParagraph}>
                  1. Transparent Pricing: All fares are calculated dynamically based on distance, traffic, and vehicle category.
                </Text>
                <Text style={styles.policyParagraph}>
                  2. Safety First: Helmets are mandatory on all bike rides. 24x7 SOS emergency assistance is available throughout the ride.
                </Text>
                <Text style={styles.policyParagraph}>
                  3. Privacy & Location: Your coordinates are collected only to connect you with nearby captains and track live ride progress.
                </Text>
              </ScrollView>

              <Button
                title="I Understand"
                onPress={() => setShowPolicyModal(false)}
                size="md"
                style={{ width: '100%', marginTop: SPACING.md }}
              />
            </View>
          </View>
        </Modal>

        {/* Blocked Account Modal Edge Case */}
        <Modal visible={showBlockedModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.policyModalCard}>
              <Ionicons name="ban" size={44} color={COLORS.danger} style={{ alignSelf: 'center' }} />
              <Text style={[styles.policyTitle, { textAlign: 'center', marginTop: 10 }]}>
                Account Suspended
              </Text>
              <Text style={[styles.policyParagraph, { textAlign: 'center', marginVertical: 10 }]}>
                This mobile number has been suspended due to policy violations. Please contact customer support.
              </Text>
              <Button
                title="Close"
                variant="outline"
                onPress={() => setShowBlockedModal(false)}
                size="md"
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  centerCardWrapper: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  brandLogoImg: {
    width: 140,
    height: 52,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 12,
    lineHeight: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 20,
  },
  formSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 18,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    gap: 6,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 12,
    letterSpacing: 0.5,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 6,
    fontWeight: '600',
  },
  testHintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 14,
    marginTop: 16,
    gap: 8,
  },
  testHintText: {
    fontSize: 12,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 16,
  },
  legalLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legalText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  legalLink: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  changeNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editNumberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editNumberText: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
  },
  sentToText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '700',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 10,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  otpBoxFilled: {
    borderColor: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  otpBoxError: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  resendSection: {
    marginTop: 16,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  timerCount: {
    fontWeight: '700',
    color: COLORS.text,
  },
  resendActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: '#FFFFFF',
  },
  resendBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  textInputField: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  policyModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl,
    maxHeight: '75%',
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  policyBody: {
    marginVertical: SPACING.sm,
  },
  policyParagraph: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
});
