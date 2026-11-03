import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export const SafetyFeaturesScreen = () => {
  const {
    setCurrentScreen,
    trustedContacts,
    addTrustedContact,
    removeTrustedContact,
  } = useApp();
  const insets = useSafeAreaInsets();

  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Family');

  const [showSosModal, setShowSosModal] = useState(false);

  const handleSaveContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    addTrustedContact({
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      relation: newContactRelation,
    });
    setShowAddContactModal(false);
    setNewContactName('');
    setNewContactPhone('');
  };

  const handleShareLiveLocation = () => {
    Alert.alert(
      'Live Location Sharing',
      'Live Bykse ride tracking link copied to clipboard! You can share it with family & friends via WhatsApp or SMS.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header: ← Safety toolkit */}
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
        <Text style={styles.headerTitle}>Safety toolkit</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Graphic Illustration Banner (Image 1) */}
        <View style={styles.topIllustrationBanner}>
          {/* Background Map Grid Effect */}
          <View style={styles.mapGridPattern}>
            <View style={styles.mapLineH} />
            <View style={styles.mapLineH2} />
            <View style={styles.mapLineV} />
            <View style={styles.mapLineV2} />
          </View>

          {/* Floating Floating Lock on left */}
          <View style={styles.floatingLockBadge}>
            <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
          </View>

          {/* Center Smartphone with Shield Graphic */}
          <View style={styles.centerPhoneGraphic}>
            <View style={styles.phoneScreen}>
              <View style={styles.phoneShieldCircle}>
                <Ionicons name="shield-checkmark" size={36} color="#2563EB" />
              </View>
            </View>
          </View>

          {/* Floating Yellow Auto bubble */}
          <View style={styles.floatingAutoBadge}>
            <Ionicons name="car-outline" size={16} color="#92400E" />
          </View>

          {/* Floating Green Pin */}
          <View style={styles.floatingPinBadge}>
            <Ionicons name="location" size={16} color="#16A34A" />
          </View>

          {/* Floating Thumbs Up badge */}
          <View style={styles.floatingThumbBadge}>
            <Ionicons name="thumbs-up" size={14} color="#D97706" />
          </View>
        </View>

        {/* Safety all the way Heading & Description (Image 1) */}
        <View style={styles.headingSection}>
          <Text style={styles.safetyAllTheWayTitle}>Safety all the way</Text>
          <Text style={styles.safetyDescription}>
            At Bykse, your safety and peace of mind come first. Here are our advanced measures and dedicated provisions to protect you on every ride.
          </Text>
        </View>

        {/* Card: "What we offer?" (Image 1 & Image 2) */}
        <View style={styles.whatWeOfferCard}>
          <Text style={styles.whatWeOfferTitle}>What we offer?</Text>

          {/* 1. 24X7 Proactive Safety Checks */}
          <View style={styles.offerItemRow}>
            <View style={[styles.offerIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="git-branch-outline" size={20} color="#16A34A" />
            </View>
            <View style={styles.offerTextCol}>
              <Text style={styles.offerItemTitle}>24X7 Proactive Ride Monitoring</Text>
              <Text style={styles.offerItemDesc}>
                Real-time automated trip surveillance with instant check-ins in case of:{'\n'}
                • Drop location differences{'\n'}
                • Unplanned idle stops / Stationary vehicle{'\n'}
                • Sudden route deviations or detour alerts
              </Text>
            </View>
          </View>
          <View style={styles.offerDivider} />

          {/* 2. SOS button */}
          <TouchableOpacity
            style={styles.offerItemRow}
            activeOpacity={0.7}
            onPress={() => setShowSosModal(true)}
          >
            <View style={[styles.offerIconWrap, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="radio-outline" size={20} color="#DC2626" />
            </View>
            <View style={styles.offerTextCol}>
              <Text style={styles.offerItemTitle}>SOS Emergency Response</Text>
              <Text style={styles.offerItemDesc}>
                One-tap instant connection to our 24X7 Bykse Rapid Support Unit & direct access to police emergency services.
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.offerDivider} />

          {/* 3. Late night ride completion check */}
          <View style={styles.offerItemRow}>
            <View style={[styles.offerIconWrap, { backgroundColor: '#CCFBF1' }]}>
              <Ionicons name="moon" size={20} color="#0D9488" />
            </View>
            <View style={styles.offerTextCol}>
              <Text style={styles.offerItemTitle}>Late Night Safety Shield</Text>
              <Text style={styles.offerItemDesc}>
                Automated post-ride verification call & tracking assurance for rides taken between 10 PM to 6 AM.
              </Text>
            </View>
          </View>
          <View style={styles.offerDivider} />

          {/* 4. Trip insurance */}
          <View style={styles.offerItemRow}>
            <View style={[styles.offerIconWrap, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="document-text-outline" size={20} color="#0F172A" />
            </View>
            <View style={styles.offerTextCol}>
              <Text style={styles.offerItemTitle}>Comprehensive Trip Insurance</Text>
              <Text style={styles.offerItemDesc}>
                From pickup to destination, all Bykse trips are covered with zero-deductible accidental & medical insurance.
              </Text>
            </View>
          </View>
          <View style={styles.offerDivider} />

          {/* 5. Verified Captains */}
          <View style={styles.offerItemRow}>
            <View style={[styles.offerIconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="checkmark-done-circle-outline" size={20} color="#D97706" />
            </View>
            <View style={styles.offerTextCol}>
              <Text style={styles.offerItemTitle}>100% Verified Captains</Text>
              <Text style={styles.offerItemDesc}>
                Every Captain passes mandatory background checks, police verification, and regular vehicle health audits.
              </Text>
            </View>
          </View>
        </View>

        {/* Italic Disclaimer Note (Image 2) */}
        <Text style={styles.disclaimerText}>
          Please note: All safety features and insurance protections are active only during official rides booked through the Bykse app. Never accept offline rides.
        </Text>

        {/* THINGS YOU CAN DO Section (Image 2 & Image 3) */}
        <Text style={styles.thingsYouCanDoHeader}>THINGS YOU CAN DO</Text>

        <View style={styles.thingsListContainer}>
          {/* Item 1: Helmet always */}
          <View style={styles.thingRow}>
            <View style={[styles.thingIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="shield-outline" size={22} color="#D97706" />
            </View>
            <View style={styles.thingTextCol}>
              <Text style={styles.thingTitle}>Mandatory Helmet on Bike-Taxi</Text>
              <Text style={styles.thingDesc}>
                Always ask for and wear a clean ISI helmet provided by your Captain. If not provided, inform us immediately.
              </Text>
            </View>
          </View>
          <View style={styles.thingDivider} />

          {/* Item 2: Live location sharing */}
          <TouchableOpacity
            style={styles.thingRow}
            activeOpacity={0.7}
            onPress={handleShareLiveLocation}
          >
            <View style={[styles.thingIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="share-social-outline" size={22} color="#0284C7" />
            </View>
            <View style={styles.thingTextCol}>
              <Text style={styles.thingTitle}>Live Location & Trip Sharing</Text>
              <Text style={styles.thingDesc}>
                Share your live ride GPS status, vehicle number, and Captain details with family & trusted friends.
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.thingDivider} />

          {/* Item 3: Your ride. Your rules */}
          <View style={styles.thingRow}>
            <View style={[styles.thingIconBox, { backgroundColor: '#EDE9FE' }]}>
              <Ionicons name="happy-outline" size={22} color="#7C3AED" />
            </View>
            <View style={styles.thingTextCol}>
              <Text style={styles.thingTitle}>Your Ride, Your Comfort</Text>
              <Text style={styles.thingDesc}>
                You have every right to instruct the Captain to maintain a safe speed and follow proper traffic guidelines.
              </Text>
            </View>
          </View>
          <View style={styles.thingDivider} />

          {/* Item 4: Add trusted contacts */}
          <TouchableOpacity
            style={styles.thingRow}
            activeOpacity={0.7}
            onPress={() => setShowContactsModal(true)}
          >
            <View style={[styles.thingIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="people-outline" size={22} color="#D97706" />
            </View>
            <View style={styles.thingTextCol}>
              <Text style={styles.thingTitle}>Add Trusted Emergency Contacts</Text>
              <Text style={styles.thingDesc}>
                Add your family members as trusted contacts to receive automated alerts with your live coordinates in emergencies.
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.thingDivider} />

          {/* Item 5: Don’t share personal information */}
          <View style={styles.thingRow}>
            <View style={[styles.thingIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="lock-closed-outline" size={22} color="#0F172A" />
            </View>
            <View style={styles.thingTextCol}>
              <Text style={styles.thingTitle}>Number Masking & Data Privacy</Text>
              <Text style={styles.thingDesc}>
                • Your personal phone number is never revealed to the Captain.{'\n'}
                • All in-app calls and messages are securely routed through Bykse's private relay.
              </Text>
            </View>
          </View>
          <View style={styles.thingDivider} />

          {/* Item 6: Always share feedback */}
          <View style={styles.thingRow}>
            <View style={[styles.thingIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="chatbubbles-outline" size={22} color="#0891B2" />
            </View>
            <View style={styles.thingTextCol}>
              <Text style={styles.thingTitle}>Rate & Review Every Trip</Text>
              <Text style={styles.thingDesc}>
                Help us keep Bykse rides safe, clean, and courteous by sharing your ratings and feedback after each ride.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Trusted Contacts Modal */}
      <Modal visible={showContactsModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxHeight: '85%' }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeading}>Trusted Contacts</Text>
              <TouchableOpacity onPress={() => setShowContactsModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.addContactRowBtn}
                onPress={() => setShowAddContactModal(true)}
              >
                <Ionicons name="person-add-outline" size={20} color="#16A34A" />
                <Text style={styles.addContactRowBtnText}>+ Add New Trusted Contact</Text>
              </TouchableOpacity>

              {trustedContacts.map((contact) => (
                <View key={contact.id} style={styles.contactItemRow}>
                  <View style={styles.contactIconWrap}>
                    <Ionicons name="person" size={18} color="#1E293B" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.contactNameText}>
                      {contact.name} ({contact.relation})
                    </Text>
                    <Text style={styles.contactPhoneText}>{contact.phone}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeTrustedContact(contact.id)}
                    style={{ padding: 6 }}
                  >
                    <Ionicons name="trash-outline" size={18} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Contact Modal */}
      <Modal visible={showAddContactModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeading}>Add Contact</Text>
              <TouchableOpacity onPress={() => setShowAddContactModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Papa, Sister, Friend"
              value={newContactName}
              onChangeText={setNewContactName}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>Phone Number</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="+91 9876543210"
              keyboardType="phone-pad"
              value={newContactPhone}
              onChangeText={setNewContactPhone}
            />

            <TouchableOpacity
              style={styles.saveGreenBtn}
              onPress={handleSaveContact}
            >
              <Text style={styles.saveGreenBtnText}>Save Trusted Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* SOS Emergency Modal */}
      <Modal visible={showSosModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { alignItems: 'center' }]}>
            <View style={styles.sosWarningCircle}>
              <Ionicons name="alert-circle" size={48} color="#DC2626" />
            </View>
            <Text style={[styles.modalHeading, { marginTop: 12 }]}>Emergency SOS Assistance</Text>
            <Text style={styles.sosDialogDesc}>
              Do you need immediate police or emergency response assistance?
            </Text>

            <TouchableOpacity
              style={styles.sosCall112Btn}
              onPress={() => {
                setShowSosModal(false);
                Linking.openURL('tel:112');
              }}
            >
              <Ionicons name="call" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.sosCall112BtnText}>Call Police (112)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelGrayBtn}
              onPress={() => setShowSosModal(false)}
            >
              <Text style={styles.cancelGrayBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  /* Top Banner Graphic (Image 1) */
  topIllustrationBanner: {
    height: 160,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGridPattern: {
    ...StyleSheet.absoluteFillObject,
  },
  mapLineH: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#DBEAFE',
  },
  mapLineH2: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#DBEAFE',
  },
  mapLineV: {
    position: 'absolute',
    left: 70,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#DBEAFE',
  },
  mapLineV2: {
    position: 'absolute',
    right: 70,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#DBEAFE',
  },
  centerPhoneGraphic: {
    width: 100,
    height: 130,
    borderRadius: 16,
    backgroundColor: '#1E3A8A',
    padding: 4,
    transform: [{ rotate: '-8deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneShieldCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingLockBadge: {
    position: 'absolute',
    top: 24,
    left: 80,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingAutoBadge: {
    position: 'absolute',
    bottom: 24,
    left: 65,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  floatingPinBadge: {
    position: 'absolute',
    top: 36,
    right: 70,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingThumbBadge: {
    position: 'absolute',
    bottom: 30,
    right: 50,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Heading Section (Image 1) */
  headingSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
  },
  safetyAllTheWayTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  safetyDescription: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },

  /* What we offer Card (Image 1 & 2) */
  whatWeOfferCard: {
    backgroundColor: '#F8FAFC',
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    padding: 18,
    marginTop: 6,
  },
  whatWeOfferTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  offerItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
  },
  offerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  offerTextCol: {
    flex: 1,
  },
  offerItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  offerItemDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 21,
  },
  offerDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  /* Disclaimer Note (Image 2) */
  disclaimerText: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#1E3A8A',
    marginHorizontal: 16,
    marginVertical: 22,
    lineHeight: 22,
  },

  /* THINGS YOU CAN DO (Image 2 & 3) */
  thingsYouCanDoHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  thingsListContainer: {
    paddingHorizontal: 16,
  },
  thingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  thingIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  thingTextCol: {
    flex: 1,
  },
  thingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  thingDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 21,
  },
  thingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
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
  addContactRowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 14,
    gap: 8,
  },
  addContactRowBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16A34A',
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  contactIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  contactPhoneText: {
    fontSize: 13,
    color: '#64748B',
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0F172A',
  },
  saveGreenBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  saveGreenBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  sosWarningCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosDialogDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginVertical: 14,
  },
  sosCall112Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 22,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 10,
  },
  sosCall112BtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelGrayBtn: {
    paddingVertical: 10,
  },
  cancelGrayBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
});
