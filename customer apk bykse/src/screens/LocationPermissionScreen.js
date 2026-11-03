import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Button } from '../components/common/Button';

export const LocationPermissionScreen = () => {
  const {
    setCurrentScreen,
    setHasLocationPermission,
    isGpsEnabled,
    setIsGpsEnabled,
    user,
  } = useApp();

  const [simulatedGpsOff, setSimulatedGpsOff] = useState(!isGpsEnabled);

  const handleGrantPermission = () => {
    setHasLocationPermission(true);
    // If user is already logged in, go to HOME, else go to AUTH (Screen 4)
    if (user && user.isLoggedIn) {
      setCurrentScreen('HOME');
    } else {
      setCurrentScreen('AUTH');
    }
  };

  const handleManualSearchMode = () => {
    // Permission denied fallback -> user sets location manually
    setHasLocationPermission(false);
    if (user && user.isLoggedIn) {
      setCurrentScreen('HOME');
    } else {
      setCurrentScreen('AUTH');
    }
  };

  const handleEnableGps = () => {
    setSimulatedGpsOff(false);
    setIsGpsEnabled(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Visual Phone / Location Illustration */}
          <View style={styles.illustrationCard}>
            <View style={styles.outerRadarRing}>
              <View style={styles.innerRadarRing}>
                <View style={styles.pinCircle}>
                  <Ionicons name="location-sharp" size={36} color="#FFFFFF" />
                </View>
              </View>
            </View>

            {/* Approximate Pin adjustment note */}
            <View style={styles.pinAdjustTag}>
              <Ionicons name="options-outline" size={14} color="#1E293B" />
              <Text style={styles.pinAdjustText}>Adjustable Pickup Pin</Text>
            </View>
          </View>

          {/* Title and Purpose Explanation */}
          <Text style={styles.title}>Location Permission</Text>
          <Text style={styles.explanation}>We need your location to find nearby drivers, set accurate pickup points, and keep your rides safe.</Text>

          {/* Value propositions */}
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: COLORS.successLight }]}>
                <Ionicons name="speedometer-outline" size={20} color={COLORS.success} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureHead}>Fastest Pickup</Text>
                <Text style={styles.featureDesc}>
                  Allows nearby Captains to locate you accurately in 2-3 mins.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: COLORS.primaryLight }]}>
                <MaterialCommunityIcons name="shield-check-outline" size={22} color="#D97706" />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureHead}>Trip Safety & Live Sharing</Text>
                <Text style={styles.featureDesc}>
                  Enables live ride tracking and SOS emergency support.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: COLORS.infoLight }]}>
                <Ionicons name="navigate-outline" size={20} color={COLORS.info} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureHead}>Transparent Fares</Text>
                <Text style={styles.featureDesc}>
                  Calculates exact distance and best route avoiding traffic.
                </Text>
              </View>
            </View>
          </View>

          {/* GPS OFF Prompt (Image 2: GPS off ho to Enable Location prompt) */}
          {simulatedGpsOff && (
            <View style={styles.gpsWarningBox}>
              <Ionicons name="alert-circle" size={22} color={COLORS.warning} />
              <View style={{ flex: 1 }}>
                <Text style={styles.gpsWarnTitle}>Device GPS is Turned Off</Text>
                <Text style={styles.gpsWarnDesc}>
                  Turn on High Accuracy GPS for precise pickup positioning.
                </Text>
              </View>
              <TouchableOpacity style={styles.enableGpsBtn} onPress={handleEnableGps}>
                <Text style={styles.enableGpsBtnText}>Turn On</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Background location privacy policy disclosure */}
          <View style={styles.privacyNoteBox}>
            <Ionicons name="lock-closed-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.privacyNoteText}>
              Background location is only accessed during active ride tracking for your safety.
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.bottomActions}>
          <Button
            title="Allow While Using App"
            onPress={handleGrantPermission}
            leftIcon={<Ionicons name="navigate" size={18} color="#1E293B" />}
            size="lg"
            style={{ width: '100%', marginBottom: SPACING.sm }}
          />

          <Button
            title="Set Location Manually"
            variant="outline"
            onPress={handleManualSearchMode}
            leftIcon={<Ionicons name="search" size={16} color={COLORS.text} />}
            size="md"
            style={{ width: '100%' }}
          />
        </View>
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
  scrollContent: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  illustrationCard: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  outerRadarRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 193, 7, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRadarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 193, 7, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  pinAdjustTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginTop: -14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  pinAdjustText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  explanation: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  featureList: {
    width: '100%',
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  featureTextCol: {
    flex: 1,
  },
  featureHead: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  featureDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  gpsWarningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    width: '100%',
    marginTop: SPACING.lg,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  gpsWarnTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  gpsWarnDesc: {
    fontSize: 11,
    color: '#78350F',
    marginTop: 1,
  },
  enableGpsBtn: {
    backgroundColor: '#92400E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  enableGpsBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  privacyNoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  privacyNoteText: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 15,
  },
  bottomActions: {
    padding: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.lg,
  },
});
