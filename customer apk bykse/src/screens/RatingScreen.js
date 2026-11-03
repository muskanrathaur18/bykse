import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Button } from '../components/common/Button';

export const RatingScreen = () => {
  const { setCurrentScreen, activeBooking, submitTripRating, walletBalance } = useApp();

  const [stars, setStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['Polite Captain', 'Safe Driving']);
  const [reviewText, setReviewText] = useState('');
  const [selectedTip, setSelectedTip] = useState(0);

  const availableTags = [
    'Polite Captain',
    'Clean Vehicle',
    'Safe Driving',
    'Followed Route',
    'Provided Helmet',
    'On Time Arrival',
  ];

  const captain = activeBooking?.captain || {
    name: 'Vikram Sharma',
    rating: 4.89,
    vehicleName: 'Honda Activa 6G (DL 01 AB 3492)',
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    submitTripRating({
      stars,
      tags: selectedTags,
      review: reviewText,
      tip: selectedTip,
    });
  };

  const handleSkip = () => {
    submitTripRating({
      stars: 5,
      tags: [],
      review: '',
      tip: 0,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rate Your Experience</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Captain Info Card */}
          <View style={styles.captainCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>VS</Text>
            </View>
            <Text style={styles.captainName}>{captain.name}</Text>
            <Text style={styles.vehicleInfo}>{captain.vehicleName}</Text>
          </View>

          {/* 1. Star Rating (1 to 5 Stars) */}
          <View style={styles.starsContainer}>
            <Text style={styles.starsPrompt}>How was your ride?</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStars(s)}
                  activeOpacity={0.7}
                  style={styles.starTouch}
                >
                  <Ionicons
                    name={s <= stars ? 'star' : 'star-outline'}
                    size={38}
                    color={s <= stars ? '#F59E0B' : '#CBD5E1'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.starFeedbackText}>
              {stars === 5
                ? 'Excellent Ride!'
                : stars === 4
                ? 'Good Experience'
                : stars === 3
                ? 'Average'
                : 'Could be better'}
            </Text>
          </View>

          {/* 2. Optional Feedback Tags */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionLabel}>What did you like the most?</Text>
            <View style={styles.tagsWrapper}>
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagChip, isSelected && styles.tagChipActive]}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text style={[styles.tagText, isSelected && styles.tagTextActive]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 3. Written Review Box */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionLabel}>Add a Note for Captain (Optional)</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write feedback or appreciation..."
              multiline
              numberOfLines={3}
              value={reviewText}
              onChangeText={setReviewText}
            />
          </View>

          {/* 4. Tip Option (Optional) */}
          <View style={styles.sectionBox}>
            <View style={styles.tipHeaderRow}>
              <Text style={styles.sectionLabel}>Tip Your Captain (Optional)</Text>
              <Text style={styles.walletBalText}>Wallet: ₹{walletBalance}</Text>
            </View>
            <Text style={styles.tipSub}>100% of the tip goes directly to the captain.</Text>

            <View style={styles.tipChipsRow}>
              {[0, 10, 20, 50].map((amt) => {
                const isSelected = selectedTip === amt;
                return (
                  <TouchableOpacity
                    key={amt}
                    style={[styles.tipChip, isSelected && styles.tipChipActive]}
                    onPress={() => setSelectedTip(amt)}
                  >
                    <Text style={[styles.tipChipText, isSelected && styles.tipChipTextActive]}>
                      {amt === 0 ? 'No Tip' : `₹${amt}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 7. Complaint / Issue shortcut link */}
          <TouchableOpacity
            style={styles.complaintLink}
            onPress={() => setCurrentScreen('HELP_CENTER')}
          >
            <Ionicons name="alert-circle-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.complaintLinkText}>Faced an issue during this ride? Report here</Text>
          </TouchableOpacity>

          {/* 5. Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>
              {selectedTip > 0 ? `Submit Feedback & Tip ₹${selectedTip}` : 'Submit Feedback'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  skipBtn: {
    padding: 6,
  },
  skipBtnText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  captainCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  captainName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  vehicleInfo: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  starsContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  starsPrompt: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  starTouch: {
    padding: 2,
  },
  starFeedbackText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#D97706',
  },
  sectionBox: {
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#F8FAFC',
  },
  tagChipActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryDark,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tagTextActive: {
    color: '#92400E',
    fontWeight: '700',
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: 10,
    fontSize: 13,
    color: COLORS.text,
    textAlignVertical: 'top',
    height: 70,
  },
  tipHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletBalText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  tipSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  tipChipsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tipChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  tipChipActive: {
    backgroundColor: '#D97706',
    borderColor: '#B45309',
  },
  tipChipText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
  },
  tipChipTextActive: {
    color: '#FFFFFF',
  },
  complaintLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: SPACING.sm,
  },
  complaintLinkText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    elevation: 4,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
