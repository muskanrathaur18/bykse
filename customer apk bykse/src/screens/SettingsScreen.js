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
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export const SettingsScreen = () => {
  const {
    setCurrentScreen,
    user,
    logoutUser,
    savedAddresses,
    setSavedAddresses,
    setProfileSubView,
  } = useApp();
  const insets = useSafeAreaInsets();

  // Sub-view: 'SETTINGS' | 'ABOUT'
  const [currentSubView, setCurrentSubView] = useState('SETTINGS');

  // Modals state
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Delete Reason selection
  const deleteReasons = [
    'Bykse unserviceable in my area',
    'Have my own vehicle now',
    'No exciting offers',
    'Poor App experience',
    'Moved to a different Ride booking app',
    'Change of phone number',
  ];
  const [selectedReason, setSelectedReason] = useState(deleteReasons[0]);
  const [otherReasonText, setOtherReasonText] = useState('');

  const handleConfirmDeleteAccount = () => {
    setShowDeleteModal(false);
    Alert.alert(
      'Account Deletion Request',
      'Your account deletion request has been submitted. You will be logged out now.',
      [
        {
          text: 'OK',
          onPress: () => logoutUser(),
        },
      ]
    );
  };

  /* ==================================================== */
  /* SUB-VIEW: ABOUT SCREEN (Image 2)                     */
  /* ==================================================== */
  if (currentSubView === 'ABOUT') {
    const aboutLinks = [
      'Privacy Policy',
      'Terms and conditions',
      'Join the team',
    ];

    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* About Header (Image 2) */}
        <View
          style={[
            styles.headerRow,
            { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 10 },
          ]}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setCurrentSubView('SETTINGS')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>

          {/* Help Pill on right */}
          <TouchableOpacity
            style={styles.helpPillBtn}
            onPress={() => setCurrentScreen('HELP_CENTER')}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle-outline" size={18} color="#0F172A" />
            <Text style={styles.helpPillText}>Help</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        >
          {/* About Links List */}
          <View style={styles.aboutLinksContainer}>
            {aboutLinks.map((item, index) => (
              <React.Fragment key={item}>
                <TouchableOpacity
                  style={styles.aboutRow}
                  activeOpacity={0.65}
                  onPress={() =>
                    Alert.alert(
                      item,
                      `Viewing ${item}.`
                    )
                  }
                >
                  <Text style={styles.aboutRowText}>{item}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#0F172A" />
                </TouchableOpacity>
                <View style={styles.aboutDivider} />
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ==================================================== */
  /* MAIN SETTINGS SCREEN (Image 1 & Image 3)             */
  /* ==================================================== */
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header: ← Settings + Help Pill (Image 3) */}
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
        <Text style={styles.headerTitle}>Settings</Text>

        <TouchableOpacity
          style={styles.helpPillBtn}
          onPress={() => setCurrentScreen('HELP_CENTER')}
          activeOpacity={0.7}
        >
          <Ionicons name="help-circle-outline" size={18} color="#0F172A" />
          <Text style={styles.helpPillText}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: GENERAL (Image 3) */}
        <Text style={styles.sectionHeaderTitle}>GENERAL</Text>

        <View style={styles.settingsCard}>
          {/* Item 1: Profile */}
          <TouchableOpacity
            style={styles.cardItemRow}
            activeOpacity={0.65}
            onPress={() => {
              setProfileSubView('DETAILS');
              setCurrentScreen('PROFILE');
            }}
          >
            <View style={styles.iconBox}>
              <Ionicons name="person-outline" size={20} color="#64748B" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.itemTitle}>Profile</Text>
              <Text style={styles.itemSubtitle}>
                {user?.phone ? (user.phone.startsWith('+91') ? user.phone : `+91 ${user.phone}`) : ''}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Section 2: OTHERS (Image 1 & Image 3) */}
        <Text style={[styles.sectionHeaderTitle, { marginTop: 24 }]}>OTHERS</Text>

        <View style={styles.settingsCard}>
          {/* Item 1: About */}
          <TouchableOpacity
            style={styles.cardItemRow}
            activeOpacity={0.65}
            onPress={() => setCurrentSubView('ABOUT')}
          >
            <View style={styles.iconBox}>
              <Ionicons name="information-circle-outline" size={22} color="#64748B" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.itemTitle}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.cardDivider} />

          {/* Item 3: Logout */}
          <TouchableOpacity
            style={styles.cardItemRow}
            activeOpacity={0.65}
            onPress={() => setShowLogoutModal(true)}
          >
            <View style={styles.iconBox}>
              <Ionicons name="log-out-outline" size={20} color="#64748B" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.itemTitle}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.cardDivider} />

          {/* Item 4: Delete Account */}
          <TouchableOpacity
            style={styles.cardItemRow}
            activeOpacity={0.65}
            onPress={() => setShowDeleteModal(true)}
          >
            <View style={styles.iconBox}>
              <Ionicons name="trash-outline" size={20} color="#DC2626" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.itemTitle}>Delete Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ==================================================== */}
      /* LOG OUT? BOTTOM SHEET (Image 3)                      */
      /* ==================================================== */
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.sheetOverlay}>
          <TouchableWithoutFeedback onPress={() => setShowLogoutModal(false)}>
            <View style={styles.sheetBackdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.sheetCard}>
            {/* Top Handle */}
            <View style={styles.sheetHandle} />

            {/* Title */}
            <Text style={styles.logoutModalTitle}>Log out?</Text>
            <Text style={styles.logoutModalDesc}>
              Are you sure you want to log out from the Bykse App?
            </Text>

            {/* Red Logout Button */}
            <TouchableOpacity
              style={styles.logoutRedBtn}
              activeOpacity={0.85}
              onPress={() => {
                setShowLogoutModal(false);
                logoutUser();
              }}
            >
              <Text style={styles.logoutRedBtnText}>Logout</Text>
            </TouchableOpacity>

            {/* Outline Go Back Button */}
            <TouchableOpacity
              style={styles.goBackOutlineBtn}
              activeOpacity={0.8}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.goBackOutlineBtnText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ==================================================== */}
      /* DELETE ACCOUNT REASON BOTTOM SHEET (Image 4)         */
      /* ==================================================== */
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.sheetOverlay}>
          <TouchableWithoutFeedback onPress={() => setShowDeleteModal(false)}>
            <View style={styles.sheetBackdrop} />
          </TouchableWithoutFeedback>

          {/* Floating Close Button (X) above bottom sheet */}
          <View style={styles.floatingCloseWrapper}>
            <TouchableOpacity
              style={styles.floatingCloseBtn}
              onPress={() => setShowDeleteModal(false)}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={22} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <View style={[styles.sheetCard, { paddingBottom: 28 }]}>
            {/* Top Handle */}
            <View style={styles.sheetHandle} />

            {/* Title */}
            <Text style={styles.deleteModalTitle}>Delete Account Reason</Text>

            {/* Radio Options List (Image 4) */}
            <View style={styles.reasonsListContainer}>
              {deleteReasons.map((reason) => {
                const isSelected = selectedReason === reason;
                return (
                  <TouchableOpacity
                    key={reason}
                    style={styles.reasonOptionRow}
                    activeOpacity={0.7}
                    onPress={() => setSelectedReason(reason)}
                  >
                    <Text style={styles.reasonOptionText}>{reason}</Text>

                    {/* Radio Circle */}
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && styles.radioCircleSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInnerDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* other reason input field */}
            <View style={styles.otherReasonInputWrap}>
              <TextInput
                style={styles.otherReasonInput}
                placeholder="other reason"
                placeholderTextColor="#94A3B8"
                value={otherReasonText}
                onChangeText={setOtherReasonText}
              />
            </View>

            {/* Yellow Submit Button (Image 4) */}
            <TouchableOpacity
              style={styles.submitYellowBtn}
              activeOpacity={0.85}
              onPress={handleConfirmDeleteAccount}
            >
              <Text style={styles.submitYellowBtnText}>Submit</Text>
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
    backgroundColor: '#F8FAFC',
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
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  helpPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
  },
  helpPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },

  /* Section Titles (Image 3) */
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3B82F6',
    letterSpacing: 0.5,
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },

  /* Settings Card (Image 1 & 3) */
  settingsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  iconBox: {
    width: 32,
    alignItems: 'flex-start',
    marginRight: 12,
  },
  textCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  /* ==================================================== */
  /* Logout Bottom Sheet Styles (Image 3)                 */
  /* ==================================================== */
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  sheetHandle: {
    width: 46,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  logoutModalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  logoutModalDesc: {
    fontSize: 15,
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 24,
  },
  logoutRedBtn: {
    backgroundColor: '#B91C1C',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutRedBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goBackOutlineBtn: {
    borderWidth: 1.5,
    borderColor: '#0F172A',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackOutlineBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* ==================================================== */
  /* Delete Account Bottom Sheet Styles (Image 4)         */
  /* ==================================================== */
  floatingCloseWrapper: {
    alignItems: 'flex-end',
    paddingRight: 16,
    marginBottom: 12,
  },
  floatingCloseBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  deleteModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  reasonsListContainer: {
    marginBottom: 14,
  },
  reasonOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  reasonOptionText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    flex: 1,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  radioCircleSelected: {
    borderColor: '#1E3A8A',
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E3A8A',
  },
  otherReasonInputWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 44,
    justifyContent: 'center',
    marginBottom: 20,
  },
  otherReasonInput: {
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 0,
  },
  submitYellowBtn: {
    backgroundColor: '#DC2626',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitYellowBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* ==================================================== */
  /* About Sub-view Styles (Image 2)                      */
  /* ==================================================== */
  aboutLinksContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  aboutRowText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  aboutDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  versionBottomContainer: {
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 40,
  },
  versionBottomText: {
    fontSize: 14,
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
  addFavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 12,
    gap: 8,
  },
  addFavBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16A34A',
  },
  favItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  favItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  favItemAddress: {
    fontSize: 12,
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
  saveFavSubmitBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  saveFavSubmitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
